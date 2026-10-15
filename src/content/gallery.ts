/**
 * Gallery copy. The photos come from the DatoCMS gallery page; their alt
 * text and captions live here, keyed by upload ID, and describe only what
 * each photo shows. Photos added in DatoCMS later fall back to their
 * DatoCMS caption and alt text.
 */
export const galleryCopy = {
  label: 'Gallery',
  title: 'Photographs',
  lede: 'Photographs by Riju Kattel: farms, fields and the places in between.',
  description:
    'Photographs by Riju Kattel of farms, fields and rural Nepal: cattle, dragon fruit, sunflowers, a farmers’ day and more.',
};

export const galleryCaptions: Record<string, { alt: string; caption: string }> =
  {
    cN4F8iweQjKdbGNUvbFvyw: {
      alt: 'Cattle grazing on a bare field below a line of trees',
      caption: 'Cattle at the field’s edge',
    },
    RnxGK5HgSaKT8LJHSTIL5w: {
      alt: 'Rows of young dragon fruit plants growing under green shade netting',
      caption: 'Dragon fruit under shade netting',
    },
    LruSXdDzSQOWKREbIA8EPg: {
      alt: 'A signboard in Nepali beside a fenced field of grass',
      caption: 'A signboard at a field site',
    },
    eSF4xiuoSzWcSIL3KmiiAg: {
      alt: 'A white rabbit held against dark fabric',
      caption: 'A white rabbit',
    },
    cFNVw_ghTEyDyppcXQo1Zg: {
      alt: 'People seated outdoors among maize plants for a farmers’ day gathering',
      caption: 'A farmers’ day gathering',
    },
    ZqWPbpWET5ylrcIRtRDDNg: {
      alt: 'A path between tall trees in morning mist',
      caption: 'Trees in the mist',
    },
    VNPoui7ARYO5z3XDywHUgQ: {
      alt: 'A dog sitting on a farm track between haystacks and bare trees at dusk',
      caption: 'Dusk on the farm track',
    },
    N9S2agjNQzqKHYn3scxFqw: {
      alt: 'A person standing in a field of tall sunflowers',
      caption: 'A sunflower field',
    },
  };
