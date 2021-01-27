import { fetchAPI } from '../../lib/api';

const BlogPost = ({ blogPost }) => {
  return (
    <div style={{ padding: 20 }}>
      <h1>{blogPost.title}</h1>
      <p>Content:</p>
      <pre style={{ background: '#eee' }}>
        {JSON.stringify(blogPost.content, null, 2)}
      </pre>
    </div>
  );
};

export async function getStaticPaths() {
  const blogPosts = await fetchAPI('/blog-posts');

  return {
    paths: blogPosts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const blogPosts = await fetchAPI(`/blog-posts?slug=${params.slug}`);

  console.log(blogPosts);

  return {
    props: { blogPost: blogPosts[0] },
    revalidate: 1,
  };
}

export default BlogPost;
