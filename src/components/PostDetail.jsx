import { useParams } from "react-router-dom";
import { fetchComments, fetchPost } from "../db/api";
import Post from "./Post";
import { useQuery } from "@tanstack/react-query";
import Comment from "./Comment";
import { Button, Card, CardFooter, Input } from "@material-tailwind/react";

function PostDetail() {
  const { postId } = useParams();

  const { data: posts } = useQuery({
    queryFn: () => fetchPost(postId),
    queryKey: [`${postId}`],
  });
  console.log(posts);
  var post = posts;

  const { data: comments } = useQuery({
    queryFn: () => fetchComments(postId),
    queryKey: ["comments"],
  });

  return (
    <div className="flex flex-col justify-center items-center ">
      <Post
        author={post.user_id}
        post_id={post.id}
        title={post.title}
        content={post.content}
      />
      <Card className="mt-6 w-96">
        {comments?.map((comment) => (
          <Comment
            key={comment.id}
            content={comment.content}
            author_id={comment.user_id}
            created_at={comment.created_at}
          />
        ))}
        <CardFooter className="pt-0">
          <Input className="rounded-lg" placeholder="Comment on this post..." />
          <Button className="text-sm text-gray-900 ">Post Comment</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default PostDetail;
