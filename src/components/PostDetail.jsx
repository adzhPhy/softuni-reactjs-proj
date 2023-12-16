import { useParams } from "react-router-dom";
import { fetchComments, fetchPost } from "../db/api";
import Post from "./Post";
import { useQuery } from "react-query";
import Comment from "./Comment";
import { Card, CardFooter, Input } from "@material-tailwind/react";
import { useState } from "react";

function PostDetail() {
  const [postData, setPostData] = useState(null);
  const { param } = useParams();
  const { data: posts } = useQuery({
    queryFn: () => fetchPost(param),
    queryKey: `${param}`,
  });
  setPostData(posts);

  const { data: comments } = useQuery({
    queryFn: () => fetchComments(param),
    queryKey: "comments",
  });
  console.log(comments);
  return (
    <div>
      <Post
        author={postData.user_id}
        post_id={postData.id}
        title={postData.title}
        content={postData.content}
      />
      <Card className="mt-6 w-96">
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
      </Card>
    </div>
  );
}

export default PostDetail;
