import { useParams } from "react-router-dom";
import { fetchPost } from "../db/api";
import Post from "./Post";
import { useQuery } from "react-query";

function PostDetail() {
  const { param } = useParams();
  const { data: posts } = useQuery({
    queryKey: `${param}`,
    queryFn: () => fetchPost(param),
  });
  console.log(`posts: ${posts}`);
  return (
    <div>
      <Post
        key={posts[0].id}
        author={posts[0].user_id}
        post_id={posts[0].id}
        title={posts[0].title}
        content={posts[0].content}
      />
    </div>
  );
}

export default PostDetail;
