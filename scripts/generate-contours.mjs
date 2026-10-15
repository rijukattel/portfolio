#!/usr/bin/env node
/**
 * Generates the topographic contour lines used across the site (PLAN §6.5).
 *
 * Marching squares over seeded, domain-warped Perlin noise, simplified and
 * smoothed into cubic Béziers. The output is committed, so the site ships
 * plain SVG paths with no runtime dependency. Re-run with `npm run contours`
 * after changing a field below.
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const OUT = fileURLToPath(
  new URL('../src/components/media/contour-fields.ts', import.meta.url)
);

const FIELDS = {
  // Hero and closing scene: broad terrain filling a 16:10 frame.
  landscape: {
    width: 1600,
    height: 1000,
    cols: 96,
    rows: 60,
    levels: 13,
    scale: 2.4,
    seed: 2024,
  },
  // Footer and chapter dividers: a shallow strip.
  band: {
    width: 1600,
    height: 320,
    cols: 96,
    rows: 20,
    levels: 7,
    scale: 3.4,
    seed: 1987,
  },
};

const INDEX_EVERY = 4; // every 4th line is an "index contour", drawn heavier
const MIN_LENGTH = 60; // drop fragments shorter than this (viewBox units)
const SIMPLIFY = 1.8; // Ramer–Douglas–Peucker tolerance

function mulberry32(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function perlin(seed) {
  const rand = mulberry32(seed);
  const p = Array.from({ length: 256 }, (_, i) => i);
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  const perm = [...p, ...p];
  const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (a, b, t) => a + t * (b - a);
  // Eight gradient directions (axis-aligned and diagonal).
  const grads = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [0.7071, 0.7071],
    [-0.7071, 0.7071],
    [0.7071, -0.7071],
    [-0.7071, -0.7071],
  ];
  const dot = (h, x, y) => grads[h & 7][0] * x + grads[h & 7][1] * y;
  return (x, y) => {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const u = fade(xf);
    const v = fade(yf);
    const aa = perm[perm[X] + Y];
    const ab = perm[perm[X] + Y + 1];
    const ba = perm[perm[X + 1] + Y];
    const bb = perm[perm[X + 1] + Y + 1];
    return lerp(
      lerp(dot(aa, xf, yf), dot(ba, xf - 1, yf), u),
      lerp(dot(ab, xf, yf - 1), dot(bb, xf - 1, yf - 1), u),
      v
    );
  };
}

function terrain({ cols, rows, scale, seed, width, height }) {
  const noise = perlin(seed);
  const warp = perlin(seed + 101);
  const fbm = (x, y) => {
    let sum = 0;
    let amp = 0.55;
    let freq = 1;
    let norm = 0;
    for (let o = 0; o < 4; o++) {
      sum += amp * noise(x * freq, y * freq);
      norm += amp;
      amp *= 0.5;
      freq *= 2.02;
    }
    return sum / norm;
  };
  const aspect = height / width;
  const grid = [];
  for (let r = 0; r <= rows; r++) {
    const row = [];
    for (let c = 0; c <= cols; c++) {
      const x = (c / cols) * scale;
      const y = (r / rows) * scale * aspect;
      // Domain warp makes ridges meander like real terrain.
      const wx = x + 0.55 * warp(x * 0.8 + 3.1, y * 0.8);
      const wy = y + 0.55 * warp(x * 0.8, y * 0.8 + 7.7);
      row.push(fbm(wx, wy));
    }
    grid.push(row);
  }
  return grid;
}

// Marching-squares segments for one level; endpoints are keyed by grid edge
// so neighbouring cells share them exactly and can be chained.
function segmentsAt(grid, level, dx, dy) {
  const rows = grid.length - 1;
  const cols = grid[0].length - 1;
  const segments = [];
  const point = (key, x0, y0, v0, x1, y1, v1) => {
    const t = (level - v0) / (v1 - v0);
    return { key, x: x0 + t * (x1 - x0), y: y0 + t * (y1 - y0) };
  };
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const tl = grid[r][c];
      const tr = grid[r][c + 1];
      const br = grid[r + 1][c + 1];
      const bl = grid[r + 1][c];
      const idx =
        (tl > level ? 8 : 0) |
        (tr > level ? 4 : 0) |
        (br > level ? 2 : 0) |
        (bl > level ? 1 : 0);
      if (idx === 0 || idx === 15) continue;
      const x0 = c * dx;
      const y0 = r * dy;
      const x1 = x0 + dx;
      const y1 = y0 + dy;
      const T = () => point(`h${r}:${c}`, x0, y0, tl, x1, y0, tr);
      const R = () => point(`v${r}:${c + 1}`, x1, y0, tr, x1, y1, br);
      const B = () => point(`h${r + 1}:${c}`, x0, y1, bl, x1, y1, br);
      const L = () => point(`v${r}:${c}`, x0, y0, tl, x0, y1, bl);
      const centreHigh = (tl + tr + br + bl) / 4 > level;
      const table = {
        1: [[L, B]],
        2: [[B, R]],
        3: [[L, R]],
        4: [[T, R]],
        5: centreHigh
          ? [
              [T, L],
              [B, R],
            ]
          : [
              [T, R],
              [L, B],
            ],
        6: [[T, B]],
        7: [[T, L]],
        8: [[T, L]],
        9: [[T, B]],
        10: centreHigh
          ? [
              [T, R],
              [L, B],
            ]
          : [
              [T, L],
              [B, R],
            ],
        11: [[T, R]],
        12: [[L, R]],
        13: [[B, R]],
        14: [[L, B]],
      };
      for (const [a, b] of table[idx]) segments.push([a(), b()]);
    }
  }
  return segments;
}

function chain(segments) {
  const byKey = new Map();
  segments.forEach((seg, i) => {
    for (const p of seg) {
      if (!byKey.has(p.key)) byKey.set(p.key, []);
      byKey.get(p.key).push(i);
    }
  });
  const used = new Uint8Array(segments.length);
  const lines = [];
  const extend = (line) => {
    for (;;) {
      const last = line[line.length - 1];
      const next = (byKey.get(last.key) || []).find((i) => !used[i]);
      if (next === undefined) return;
      used[next] = 1;
      const [a, b] = segments[next];
      const p = a.key === last.key ? b : a;
      line.push(p);
      if (p.key === line[0].key) return; // closed loop
    }
  };
  segments.forEach((seg, i) => {
    if (used[i]) return;
    used[i] = 1;
    const line = [seg[0], seg[1]];
    extend(line);
    if (line[line.length - 1].key !== line[0].key) {
      line.reverse();
      extend(line);
    }
    lines.push(line);
  });
  return lines;
}

function simplify(points, epsilon) {
  if (points.length < 3) return points;
  const [a, b] = [points[0], points[points.length - 1]];
  let maxDist = 0;
  let index = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const p = points[i];
    const dist =
      Math.abs((b.y - a.y) * p.x - (b.x - a.x) * p.y + b.x * a.y - b.y * a.x) /
      (Math.hypot(b.y - a.y, b.x - a.x) || 1);
    if (dist > maxDist) {
      maxDist = dist;
      index = i;
    }
  }
  if (maxDist <= epsilon) return [a, b];
  return [
    ...simplify(points.slice(0, index + 1), epsilon).slice(0, -1),
    ...simplify(points.slice(index), epsilon),
  ];
}

const length = (pts) =>
  pts.reduce(
    (sum, p, i) =>
      i ? sum + Math.hypot(p.x - pts[i - 1].x, p.y - pts[i - 1].y) : 0,
    0
  );

// Catmull–Rom through the simplified points, written as cubic Béziers.
function toPath(points, closed) {
  const n = Math.round; // whole units are sub-pixel at any rendered size
  const pts = closed ? points.slice(0, -1) : points;
  const at = (i) =>
    closed
      ? pts[(i + pts.length) % pts.length]
      : pts[Math.max(0, Math.min(pts.length - 1, i))];
  const count = closed ? pts.length : pts.length - 1;
  let d = `M${n(pts[0].x)} ${n(pts[0].y)}`;
  for (let i = 0; i < count; i++) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
    d +=
      `C${n(p1.x + (p2.x - p0.x) / 6)} ${n(p1.y + (p2.y - p0.y) / 6)} ` +
      `${n(p2.x - (p3.x - p1.x) / 6)} ${n(p2.y - (p3.y - p1.y) / 6)} ` +
      `${n(p2.x)} ${n(p2.y)}`;
  }
  return closed ? `${d}Z` : d;
}

function buildField(spec) {
  const grid = terrain(spec);
  const values = grid.flat();
  const min = Math.min(...values);
  const max = Math.max(...values);
  const dx = spec.width / spec.cols;
  const dy = spec.height / spec.rows;
  const lines = [];
  for (let l = 1; l <= spec.levels; l++) {
    const level = min + ((max - min) * l) / (spec.levels + 1);
    for (const raw of chain(segmentsAt(grid, level, dx, dy))) {
      const closed = raw.length > 3 && raw[0].key === raw[raw.length - 1].key;
      const pts = simplify(raw, SIMPLIFY);
      if (pts.length < 3 || length(pts) < MIN_LENGTH) continue;
      lines.push({
        d: toPath(pts, closed),
        level: l,
        index: l % INDEX_EVERY === 0,
      });
    }
  }
  return { viewBox: `0 0 ${spec.width} ${spec.height}`, lines };
}

const fields = Object.fromEntries(
  Object.entries(FIELDS).map(([name, spec]) => [name, buildField(spec)])
);

writeFileSync(
  OUT,
  `// Generated by scripts/generate-contours.mjs — do not edit by hand.\n` +
    `export const contourFields = ${JSON.stringify(fields)} as const;\n\n` +
    `export type ContourField = keyof typeof contourFields;\n`
);

for (const [name, field] of Object.entries(fields)) {
  const bytes = field.lines.reduce((s, l) => s + l.d.length, 0);
  console.log(
    `${name}: ${field.lines.length} lines, ${(bytes / 1024).toFixed(1)} KB of path data`
  );
}
