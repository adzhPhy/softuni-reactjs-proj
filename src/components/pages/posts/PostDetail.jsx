import NotFound from "../NotFound.jsx";
import Post from "./Post";
import Comment from "../comments/Comment.jsx";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardFooter,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import { useState } from "react";
import { useAuth } from "../../../context/AuthProvider.jsx";
import { useData } from "../../../context/DataProvider.jsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertComment } from "../../../db/api.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import Navdiv from "../../utils/Navdiv.jsx";

function PostDetail() {
  const { user } = useAuth();
  const { postId } = useParams();
  const queryClient = useQueryClient();
  const { posts, comments, users } = useData();
  const [commentContent, setCommentContent] = useState("");

  const post = posts.filter((el) => el.id === postId)[0];
  const postAuthor = users
    .filter((us) => us.id === post.user_id)[0]
    .email.split("@")[0];
  // ---------------------------------------
  const postComments = comments.filter((comment) => comment.post_id === postId);

  // -----------------------------------------
  const insertCommentFunc = useMutation({
    mutationFn: (commentText) => insertComment(postId, user.id, commentText),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
  });
  //
  const handleCommentPost = () => {
    if (commentContent.trim().split(" ").join("") !== "") {
      insertCommentFunc.mutate(commentContent);
      toast.success("Comment is posted!");
    } else {
      toast.error("You cannot submit an empty comment!");
    }
  };
  //
  <Button className="text-sm text-gray-900 pb-1" onClick={handleCommentPost}>
    Post Comment
  </Button>; //
  var profileLink = "";
  if (post.user_id === user.id) {
    profileLink = "/myprofile";
  } else {
    profileLink = `/${post.user_id}/details`;
  }
  if (post === undefined) {
    return <NotFound />;
  }
  // -----------------------------------------
  return (
    <div className="w-full flex flex-row justify-center items-center text-gray-900">
      <Navdiv />
      <div className="flex flex-col justify-start">
        <Typography variant="h4" className="text-xs absolute ml-8 mt-2">
          Posted by{" "}
          <Link
            to={profileLink}
            className="underline hover:no-underline hover:text-red-700"
          >
            {postAuthor}
          </Link>{" "}
          {moment(post.created_at).fromNow()}
        </Typography>
        <Post
          author={post.user_id}
          post_id={post.id}
          title={post.title}
          content={post.content}
        />
      </div>
      <div className="flex flex-col  justify-center">
        <div className="h-[15rem] flex  justify-center flex-wrap text-clip overflow-auto">
          {postComments != undefined ? (
            <div className="flex flex-row justify-center items-center">
              <Card className="w-96 rounded gap-1 bg-transparent shadow-md">
                {postComments?.map((comment) => (
                  <Comment
                    key={comment.id}
                    _id={comment.id}
                    created_at={comment.created_at}
                    authorId={comment.user_id}
                    content={comment.content}
                  />
                ))}
              </Card>
            </div>
          ) : (
            <div>There are no comments for this post yet!</div>
          )}
        </div>
        {user.id !== post.user_id && (
          <CardFooter className="w-[27rem] pt flex flex-col">
            <div className="relative w-full min-w-[200px]">
              <Textarea
                className="border-2 w-full p-2 flex"
                variant="outlined"
                label="Write a comment"
                onChange={(e) => {
                  setCommentContent(e.target.value);
                }}
              ></Textarea>
            </div>
            <Button
              className="text-sm text-gray-900 pb-1"
              onClick={handleCommentPost}
            >
              Post Comment
            </Button>
          </CardFooter>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default PostDetail;
