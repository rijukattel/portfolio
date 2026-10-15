import { getGalleryPhotos } from '@/lib/datocms/gallery';
import { getAllPosts, getPost } from '@/lib/datocms/journal';
import { getSiteConfig } from '@/lib/datocms/site';

// Phase 0 placeholder: proves the DatoCMS data layer works in a static build.
// Replaced by the five-chapter homepage in Phase 3.
export default async function Home() {
  const [site, posts, photos] = await Promise.all([
    getSiteConfig(),
    getAllPosts(),
    getGalleryPhotos(),
  ]);
  const latest = posts[0] ? await getPost(posts[0].slug) : null;

  return (
    <main>
      <h1>{site.name}</h1>
      <p>
        {posts.length} journal posts and {photos.length} gallery photos loaded
        from DatoCMS. Latest post body has{' '}
        {latest?.structuredBody.blocks?.length ?? 0} image blocks.
      </p>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </main>
  );
}
