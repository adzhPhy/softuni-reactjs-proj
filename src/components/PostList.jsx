import { useQuery } from "react-query";
import { fetchComments, fetchPosts } from "../db/api";
import Post from "./Post";

function PostList() {
  const { data: posts, isLoading } = useQuery({
    queryKey: "posts",
    queryFn: () => fetchPosts(),
  });
  const { data: comments } = useQuery({
    queryKey: "posts",
    queryFn: () => fetchComments(),
  });
  if (isLoading) {
    return <div>Loading posts...</div>;
  }
  return (
    <div className="container main">
      <div className="container main justify-center items-center bg-white text-gray-900">
        {posts.map((post) => (
          <Post
            key={post.id}
            author={post.user_id}
            title={post.title}
            content={post.content}
          />
        ))}
      </div>
    </div>
  );
}

export default PostList;
