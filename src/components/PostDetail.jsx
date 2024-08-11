import Post from "./Post";
import Comment from "./Comment";
import { useParams } from "react-router-dom";
import { Button, Card, CardFooter, Input } from "@material-tailwind/react";
import { useAuth } from "../context/AuthProvider";
import { useData } from "../context/DataProvider";

function PostDetail() {
  const { user } = useAuth();
  const { postId } = useParams();
  const { posts, comments } = useData();

  const post = posts.filter((el) => el.id === postId);
  // ---------------------------------------
  const postComments = comments.filter((comment) => comment.post_id === postId);
  // -----------------------------------------
  return (
    <div className="flex flex-col justify-center items-center">
      <Post
        author={post.user_id}
        post_id={post.id}
        title={post.title}
        content={post.content}
      />
      {postComments != undefined ? (
        <Card className="mt-6 w-96">
          {postComments?.map((comment) => (
            <Comment
              key={comment.id}
              content={comment.content}
              author_id={comment.user_id}
              created_at={comment.created_at}
            />
          ))}
          {user.id !== post.user_id && (
            <CardFooter className="pt-0">
              <Input
                className="rounded-lg"
                placeholder="Comment on this post..."
              />
              <Button className="text-sm text-gray-900 ">Post Comment</Button>
            </CardFooter>
          )}
        </Card>
      ) : (
        <div>There are no comments for this post yet!</div>
      )}
    </div>
  );
}

export default PostDetail;
