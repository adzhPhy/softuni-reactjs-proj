import NotFound from "./NotFound.jsx";
import Post from "./Post";
import Comment from "./Comment";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardFooter,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import { useAuth } from "../context/AuthProvider";
import { useData } from "../context/DataProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment, insertComment } from "../db/api";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import Navdiv from "./Navdiv.jsx";
import DynamicLink from "./DynamicLink.jsx";
import supabase from "../client.js";
import { CiSquareRemove } from "react-icons/ci";

function PostDetail() {
  const { user } = useAuth();
  const { postId } = useParams();
  const queryClient = useQueryClient();
  const { posts, comments, users } = useData();
  const [commentContent, setCommentContent] = useState("");
  const [buttonType, setButtonType] = useState("notEdit");

  const post = posts.filter((el) => el.id === postId)[0];
  const postAuthor = users
    .filter((us) => us.id === post.user_id)[0]
    .email.split("@")[0];
  // ---------------------------------------
  const postComments = comments.filter((comment) => comment.post_id === postId);
  // -----------------------------------------
  const mutate = useMutation({
    mutationFn: () => insertComment(postId, user.id, commentContent),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
  });
  const updateComment = useMutation({
    mutationFn: () =>
      supabase
        .from("comments")
        .update({
          content: commentContent,
        })
        .match({ post_id: postId, user_id: user.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
  });
  //
  const removeComment = useMutation({
    mutationFn: () => deleteComment(postId, user.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      toast.success("Comment is deleted!");
    },
    onError: (error) => console.warn(error),
  });
  //
  const handleCommentPost = () => {
    if (commentContent.trim().split(" ").join("") !== "") {
      mutate.mutate();
      toast.success("Comment is posted!");
    } else {
      toast.error("You cannot submit an empty comment!");
    }
    document.getElementById("Textarea2").value = "";
  };
  const handleCommentEdit = () => {
    if (commentContent.trim().split(" ").join("") !== "") {
      updateComment.mutate();
      toast.success("Comment is edited!");
      setButtonType("notEdit");
    } else {
      toast.error("You cannot submit an empty comment!");
    }
    document.getElementById("Textarea1").value = "";
    document.getElementById("removeCommentButton").setAttribute("style", "");
  };
  const handleCommentDelete = () => {
    removeComment.mutate();
    setButtonType("notEdit");
  };
  //
  var commentButton = "";
  if (buttonType === "notEdit") {
    commentButton = (
      <Button
        className="text-sm text-gray-900 pb-1"
        onClick={handleCommentPost}
      >
        Post Comment
      </Button>
    );
  } else if (buttonType === "edit") {
    commentButton = (
      <Button
        className="text-sm text-gray-900 pb-1"
        onClick={handleCommentEdit}
      >
        Edit Comment
      </Button>
    );
  }
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
      <div className="flex flex-col items-center justify-center">
        {postComments != undefined ? (
          <div className="flex flex-row gap-1 justify-center items-center">
            <Card className="w-96 rounded">
              {postComments?.map((comment) => (
                <DynamicLink
                  key={comment.id}
                  condition1={user.id === comment.user_id}
                  func={() => {
                    setButtonType("edit");
                  }}
                >
                  {buttonType === "notEdit" && (
                    <Comment
                      created_at={comment.created_at}
                      authorId={comment.user_id}
                      content={comment.content}
                    />
                  )}
                </DynamicLink>
              ))}
              {buttonType === "edit" && (
                <div className="w-full relative flex flex-row items-center gap-2 justify-center">
                  <Textarea
                    variant="static"
                    className="border-2 w-full p-2 flex"
                    id="Textarea1"
                    onChange={(e) => {
                      setCommentContent(e.target.value);
                    }}
                  ></Textarea>
                  <Button
                    onClick={handleCommentDelete}
                    id="removeCommentButton"
                    className="absolute flex right-0 top-0 rounded-lg text-gray-900 p-1 m-1 hover:bg-red-400"
                  >
                    <CiSquareRemove size={25} />
                  </Button>
                </div>
              )}
            </Card>
          </div>
        ) : (
          <div>There are no comments for this post yet!</div>
        )}
        {user.id !== post.user_id && (
          <CardFooter className="w-[27rem] pt flex flex-col">
            <div className="relative w-full min-w-[200px]">
              <Textarea
                className="border-2 w-full p-2 flex"
                id="Textarea2"
                variant="outlined"
                label={
                  buttonType === "edit"
                    ? "Click here to exit edit mode"
                    : "Write a comment"
                }
                onClick={() => {
                  if (buttonType === "edit") setButtonType("notEdit");
                }}
                onChange={(e) => {
                  setCommentContent(e.target.value);
                }}
              ></Textarea>
            </div>
            {commentButton}
          </CardFooter>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default PostDetail;
