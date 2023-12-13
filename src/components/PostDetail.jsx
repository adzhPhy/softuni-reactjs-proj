import { useParams } from "react-router-dom";
import { fetchComments, fetchPost } from "../db/api";
import Post from "./Post";
import { useQuery } from "react-query";
import Comment from "./Comment";
import { Card, CardFooter, Input } from "@material-tailwind/react";

function PostDetail() {
  const { param } = useParams();
  const { data: posts } = useQuery({
    queryKey: `${param}`,
    queryFn: () => fetchPost(param),
  });
  // const { data: comments } = useQuery({
  //   queryKey: "comments",
  //   queryFn: () => fetchComments(param),
  // });

  return (
    <div>
      <Post
        author={posts[0].user_id}
        post_id={posts[0].id}
        title={posts[0].title}
        content={posts[0].content}
      />
      {/* <Card className="mt-6 w-96">
        {comments?.map((comment) => (
          <Comment
            key={comment.id}
            _id={comment.id}
            content={comment.content}
            author_id={comment.user_id}
          />
        ))}
        <CardFooter className="pt-0">
          <Input
            className="rounded-lg"
            label="text"
            placeholder="Comment on this post..."
          />
        </CardFooter>
      </Card> */}
    </div>
  );
}

export default PostDetail;
