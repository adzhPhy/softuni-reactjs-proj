import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../db/api";
import Post from "./Post";

function PostList() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
  });

  if (isLoading) {
    return <div>Loading posts...</div>;
  }
  return (
    <div className="flex flex-wrap gap-10 justify-center items-center bg-white text-gray-900">
      {posts?.map((post) => (
        <Post
          key={post.id}
          author={post.user_id}
          post_id={post.id}
          title={post.title}
          content={post.content}
        />
      ))}
    </div>
  );
}

export default PostList;
