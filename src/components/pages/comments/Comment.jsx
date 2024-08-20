import { useState } from "react";
import supabase from "../../../client";
import { useData } from "../../../context/DataProvider";
import { useAuth } from "../../../context/AuthProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { deleteComment } from "../../../db/api";
import moment from "moment";
import {
  Avatar,
  Button,
  Card,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { MdRemoveCircle, MdModeEdit, MdEditNote } from "react-icons/md";
import { IoMdExit } from "react-icons/io";
import { toast } from "react-toastify";

function Comment({ _id, created_at, authorId, content }) {
  const { user } = useAuth();
  const { users } = useData();
  const queryClient = useQueryClient();
  const postAuthor = users.filter((us) => us.id === authorId)[0].email;
  const [editMode, setEditMode] = useState(false);
  const [commentContent, setCommentContent] = useState(content);
  //
  const updateComment = useMutation({
    mutationFn: (commentText) =>
      supabase
        .from("comments")
        .update({
          content: commentText,
        })
        .match({ id: _id, user_id: user.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
  });
  //
  const removeComment = useMutation({
    mutationFn: () => deleteComment(_id, user.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
  //
  const handleCommentEdit = () => {
    if (commentContent.trim().split(" ").join("") !== "") {
      updateComment.mutate(commentContent);
      setEditMode(!editMode);
    } else {
      toast.error("You cannot submit an empty comment!");
    }
  };
  const handleCommentDelete = () => {
    removeComment.mutate();
  };
  //
  var profileLink = "";
  if (authorId === user.id) {
    profileLink = "/myprofile";
  } else {
    profileLink = `/${authorId}/details`;
  }
  // -----------------------------
  return (
    <Card className="flex items-center flex-col rounded-md m-1 p-1 shadow-sm overflow-auto max-h-48">
      <div className="flex p-0.5 justify-between w-full items-center">
        <div className="flex">
          <Avatar
            style={{
              width: "40px",
              height: "40px",
              border: "1px solid",
              borderRadius: "100%",
              backgroundColor: "whitesmoke",
            }}
            src={`https://robohash.org/${authorId}.png`}
            alt={`https://robohash.org/${authorId}.png`}
          />
          <div className="flex flex-col">
            {editMode ? (
              <Textarea
                placeholder={content}
                onChange={(e) => setCommentContent(e.target.value)}
              ></Textarea>
            ) : (
              <Typography
                variant="h6"
                color="blue-gray"
                className="flex text-sm ml-2 text-clip overflow-auto"
              >
                {content}
              </Typography>
            )}
            <Typography className="text-xs">
              <Typography className="text-xs ml-2">
                <Link
                  to={profileLink}
                  className="underline hover:no-underline hover:text-red-700"
                >
                  {postAuthor.split("@")[0]}
                </Link>{" "}
                {moment(created_at).fromNow()}
              </Typography>
            </Typography>
          </div>
        </div>
        <div className="flex gap-1 p-1">
          {!editMode ? (
            <>
              <Button
                onClick={() => setEditMode(!editMode)}
                className="text-gray-900 hover:bg-slate-200 p-0.5"
              >
                <MdEditNote size={25} />
              </Button>
              <Button
                onClick={handleCommentDelete}
                className="text-gray-900 hover:bg-red-400"
              >
                <MdRemoveCircle size={25} />
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={handleCommentEdit}
                className="text-gray-900 hover:bg-slate-200 p-0.5"
              >
                <MdModeEdit size={25} />
              </Button>
              <Button
                onClick={() => setEditMode(!editMode)}
                className="text-gray-900 hover:bg-slate-200 p-0.5"
              >
                <IoMdExit size={25} />
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}

export default Comment;
