// export default function Post({ post }) {
//   return (
//     <ul>
//       {posts.map((post) => (
//         <li>{post.name}</li>
//       ))}
//     </ul>
//   );
// }

export async function getStaticProps({ params }) {
  const res = await fetch(`https://.../posts/${params.name}`);
  const post = await res.json();

  // Pass post data to the page via props
  return { props: { post } };
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch("https://.../posts");
  const posts = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { name: post.name },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}
