import NotFound from "./NotFound.jsx";
import Post from "./Post";
import Comment from "./Comment";
import { Link, useParams } from "react-router-dom";
import { Button, Card, CardFooter, Typography } from "@material-tailwind/react";
import { useAuth } from "../context/AuthProvider";
import { useData } from "../context/DataProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertComment } from "../db/api";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import Navdiv from "./Navdiv.jsx";

function PostDetail() {
  const { user } = useAuth();
  const { postId } = useParams();
  const { posts, comments, users } = useData();
  const [commentContent, setCommentContent] = useState("");
  const queryClient = useQueryClient();

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
  const handleCommentPost = () => {
    if (commentContent.trim().split(" ").join("") !== "") {
      mutate.mutate();
      toast.success("Comment is posted!");
    } else {
      toast.error("You cannot submit an empty comment!");
    }
  };
  //
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
      <div className="flex flex-col items-center">
        {postComments != undefined ? (
          <div className="flex flex-row gap-1 overflow-y-auto">
            <Card className="w-96 rounded">
              {postComments?.map((comment) => (
                <Comment
                  key={comment.id}
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
        {user.id !== post.user_id && (
          <CardFooter className="w-[27rem] pt flex flex-col">
            <div className="relative w-full min-w-[200px]">
              <textarea
                className="peer h-full min-h-[10px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 pt-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                onChange={(e) => {
                  setCommentContent(e.target.value);
                }}
              ></textarea>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Write a Comment
              </label>
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
