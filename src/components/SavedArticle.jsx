import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost } from "../db/api";
import { useData } from "../context/DataProvider";
import { useEffect, useState } from "react";

function SavedArticle({ author, post_id, title, content }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { likes, comments } = useData();
  //
  const [postLiked, setPostLiked] = useState(false);
  const [postLikes, setPostLikes] = useState(0);
  const [postComments, setPostComments] = useState(0);
  // --------------------------------------------------
  // filter likes and comments by post
  useEffect(() => {
    if (
      user &&
      likes
        .filter((like) => {
          return like.post_id === post_id;
        })
        .some((el) => el.user_id === user.id)
    ) {
      setPostLiked(true);
    }
    if (likes != undefined && comments != undefined) {
      setPostLikes(likes.filter((like) => like.post_id === post_id).length);
      setPostComments(
        comments.filter((comment) => comment.post_id === post_id).length
      );
    }
  }, [user, likes, comments, post_id]);
  //
  const like = useMutation({
    mutationFn: () => likePost(post_id, user.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["likes"],
      });
    },
  });
  //
  // -------------------------------------------------
  const handlePostLike = () => {
    like.mutate();
    setPostLiked(true);
  };
  // -------------------------------------------------
  var likeButton = <></>;
  if (postLiked) {
    likeButton = <AiFillLike className="text-lg" />;
  } else if (user && user.id != author) {
    likeButton = (
      <Button
        className="text-gray-800 bg-white flex p-1"
        onClick={handlePostLike}
      >
        <AiOutlineLike className="text-lg" />
      </Button>
    );
  } else {
    likeButton = <AiOutlineLike className="text-lg" />;
  }
  // -------------------------------------------------
  return (
    <div className="flex flex-col rounded-md justify-center items-center m-3.5">
      <Link to={"/posts/" + post_id}>
        <Card className=" m-4 w-96 h-96 border border-gray-600 pt-2 rounded-sm shadow-md">
          <CardHeader className="flex justify-center w-50 h-50 p-2 items-center">
            <Avatar
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "100%",
                border: "1.5px solid",
                backgroundColor: "whitesmoke",
                marginLeft: "1rem",
              }}
              src={`https://robohash.org/${author}.png`}
              alt="author-image"
            />
            <Typography variant="h5" color="blue-gray" className="mb-2 ml-2 ">
              {title}
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-wrap text-clip overflow-auto">
            <Typography className="text-justify tracking-tight text-md">
              {content}
            </Typography>
          </CardBody>
        </Card>
        <div className="flex justify-between items-center gap-3 mb-4 pl-4">
          <div className="flex">
            <p className="gap-2 text-sm flex">
              {likeButton}
              {likes != undefined ? `${postLikes}` : `fetching likes...`}
            </p>
            <p className="gap-2 text-sm flex">
              <FaRegComment className="text-lg ml-4" />
              {comments != undefined
                ? `${postComments}`
                : `fetching comments...`}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default SavedArticle;
