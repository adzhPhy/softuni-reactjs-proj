import { useQuery } from "react-query";
import { fetchComments, fetchPosts } from "../db/api";
import Post from "./Post";
import { Card } from "@material-tailwind/react";
import Comment from "./Comment";

function PostList() {
  const { data: posts, isLoading } = useQuery({
    queryKey: "posts",
    queryFn: () => fetchPosts(),
  });
  if (isLoading) {
    return <div>Loading posts...</div>;
  }
  return (
    <div className="flex border-1 border-black justify-center pt-2">
      <div className="flex justify-center items-center bg-white text-gray-900">
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
    </div>
  );
}

export default PostList;
