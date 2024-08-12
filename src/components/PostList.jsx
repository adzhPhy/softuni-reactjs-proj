import Post from "./Post";
import { useData } from "../context/DataProvider";

function PostList() {
  const { posts, isLoading } = useData();
  if (isLoading) {
    return <div>Loading posts...</div>;
  }

  return (
    <div className="flex border bg-slate-50 rounded-md flex-wrap gap-8 m-7 justify-center items-center text-gray-900">
      {posts?.map((post) => (
        <Post
          key={post.id}
          post_id={post.id}
          author={post.user_id}
          title={post.title}
          content={post.content}
        />
      ))}
    </div>
  );
}

export default PostList;
