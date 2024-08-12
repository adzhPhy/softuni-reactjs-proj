import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { MdBookmarkAdd } from "react-icons/md";
import { MdBookmarkAdded } from "react-icons/md";
import { useAuth } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertArticle, likePost } from "../db/api";
import { useData } from "../context/DataProvider";
import { useEffect, useState } from "react";
import AvatarComp from "./Avatar";
import { FaEdit } from "react-icons/fa";

function Post({ author, post_id, title, content }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { likes, comments, articles } = useData();
  const navigate = useNavigate();
  //
  const [postLiked, setPostLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [postLikes, setPostLikes] = useState(0);
  const [postComments, setPostComments] = useState(0);
  // --------------------------------------------------
  useEffect(() => {
    // filter likes and comments by post
    if (
      user &&
      likes
        ?.filter((like) => {
          return like.post_id === post_id;
        })
        .some((el) => el.user_id === user.id)
    ) {
      setPostLiked(true);
    }
    // check if article is saved
    if (
      user &&
      articles != undefined &&
      articles
        .filter((art) => art.user_id === user.id)
        .some((art) => art.post_id === post_id)
    ) {
      setIsSaved(true);
    }
    if (likes != undefined && comments != undefined) {
      setPostLikes(likes.filter((like) => like.post_id === post_id).length);
      setPostComments(
        comments.filter((comment) => comment.post_id === post_id).length
      );
    }
  }, [user, likes, comments, post_id, articles]);
  // mutation functions
  const like = useMutation({
    mutationFn: () => likePost(post_id, user.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["likes"],
      });
    },
  });
  //
  const save = useMutation({
    mutationFn: () => insertArticle(post_id, user.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });
    },
  });
  // -------------------------------------------------
  const handlePostLike = () => {
    like.mutate();
    setPostLiked(true);
  };
  // -------------------------------------------------
  const handleArticleSave = () => {
    save.mutate();
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
  //
  var saveButton = <></>;
  if (isSaved) {
    saveButton = <MdBookmarkAdded className="text-xl mr-4" />;
  } else {
    saveButton = (
      <Button
        className="flex gap-1 text-sm mr-4 text-gray-900 p-1"
        onClick={handleArticleSave}
      >
        <MdBookmarkAdd className="text-xl" />
        Save Article
      </Button>
    );
  }
  var editButton = (
    <Button
      onClick={() => navigate(`/posts/${post_id}/edit`)}
      className="flex gap-1 p-2 items-center text-gray-900"
    >
      <FaEdit className="text-lg" />
      Edit Post
    </Button>
  );
  // -------------------------------------------------
  return (
    <div className="flex flex-col rounded-md justify-center items-center m-3.5">
      <Link to={"/posts/" + post_id}>
        <Card className=" m-4 w-96 h-96 border border-gray-600 pt-2 rounded-sm shadow-md">
          <CardHeader className="flex justify-center w-50 h-50 p-2 items-center">
            <AvatarComp author={author} />
            <div className="flex flex-col items-center">
              <Typography variant="h5" color="blue-gray" className="mb-2 ml-2 ">
                {title}
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="flex flex-wrap text-clip overflow-auto">
            <Typography className="text-justify tracking-tight text-md">
              {content}
            </Typography>
          </CardBody>
        </Card>
      </Link>
      <div className="flex justify-between items-center gap-3 mb-4 pl-4">
        <div className="flex">
          <p className="gap-2 text-sm flex">
            {likeButton}
            {likes != undefined ? `${postLikes}` : `fetching likes...`}
          </p>
          <p className="gap-2 text-sm flex">
            <FaRegComment className="text-lg ml-4" />
            {comments != undefined ? `${postComments}` : `fetching comments...`}
          </p>
        </div>
        {user && user.id != author ? saveButton : user && editButton}
      </div>
    </div>
  );
}

export default Post;
