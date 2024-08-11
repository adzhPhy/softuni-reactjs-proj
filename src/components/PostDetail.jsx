import { useParams } from "react-router-dom";
import { fetchComments, fetchPosts, fetchUsers } from "../db/api";
import Post from "./Post";
import { useQuery } from "@tanstack/react-query";
import Comment from "./Comment";
import { Button, Card, CardFooter, Input } from "@material-tailwind/react";
import { useAuth } from "../context/AuthProvider";

function PostDetail() {
  const { user } = useAuth();
  const { postId } = useParams();

  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
    refetchOnWindowFocus: false,
  });
  const post = data.filter((el) => el.id === postId);
  // ---------------------------------------
  const { data: comments } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
  });
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
