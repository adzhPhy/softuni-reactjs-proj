import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
  Textarea,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost, insertOldPost } from "../db/api";
import { useData } from "../context/DataProvider";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AvatarComp from "./Avatar";
import supabase from "../client";
import moment from "moment";

function PostEdit() {
  const { postId } = useParams();
  const { posts } = useData();
  const queryClient = useQueryClient();

  const currentPost = posts?.filter((post) => post.id === postId)[0];
  const [open, setOpen] = useState(false);
  const [postData, setPostData] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  //
  useEffect(() => {
    setPostData(currentPost);
  }, [posts, postId, currentPost]);
  // dialog func
  const handleOpen = () => setOpen(!open);
  // edit function
  const updatePostFunc = useMutation({
    mutationFn: () =>
      supabase
        .from("posts")
        .update({
          title: title,
          content: content,
        })
        .eq("id", postId),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      toast.success("Changes have been made!");
    },
    onError: (error) => console.log(error.message),
  });
  const insertOldPostFunc = useMutation({
    mutationFn: () =>
      insertOldPost(
        postId,
        postData?.user_id,
        postData?.title,
        postData?.content
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["oldposts"]);
    },
    onError: (error) => console.log(error.message),
  });
  const handlePostEdit = () => {
    if (title === postData?.title || content === postData?.content) {
      toast.error("Please make changes to your post before submitting!");
    } else if (postData.title === undefined || postData.content === undefined) {
      console.log(postData.title, postData.content);
    } else if (
      title.trim().split(" ").join("") === "" ||
      content.trim().split(" ").join("") === ""
    ) {
      toast.error("You cannot submit an empty field!");
    } else {
      updatePostFunc.mutate();
      insertOldPostFunc.mutate();
      handleOpen();
    }
  };

  // -------------------------------------------------
  return (
    <div className="flex h-full flex-row rounded-md justify-center items-center">
      <Card className=" m-4 w-96 h-112 border border-gray-600 pt-2 rounded-sm shadow-md">
        <CardHeader className="flex justify-center w-50 h-50 p-2 items-center">
          <AvatarComp author={postData?.user_id} />
          <div className="flex flex-col items-center">
            <Typography color="blue-gray" className="mb-2 ml-2 text-lg">
              {postData.title}
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="flex flex-wrap text-clip overflow-auto">
          <Typography className="text-justify tracking-tight text-md">
            {postData.content}
          </Typography>
        </CardBody>
      </Card>
      <Card className="flex w-[40rem] justify-between items-center pl-4 rounded-sm">
        <CardFooter className="w-full pt gap-1 flex flex-col text-gray-900">
          <div className="relative w-full min-w-[200px]">
            <Textarea
              variant="outlined"
              placeholder={postData.title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Edit Title
            </label>
          </div>
          <div className="relative w-full">
            <Textarea
              variant="outlined"
              placeholder={postData.content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[16rem]"
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Edit Content
            </label>
          </div>
          <Button
            onClick={handleOpen}
            variant="gradient"
            className="text-gray-900 text-md bg-slate-50"
          >
            Edit Post
          </Button>
          <Dialog
            size={"xs"}
            open={open}
            handler={handleOpen}
            variant="gradient"
            className="max-w-[30rem] text-gray-900 flex flex-col border-2 mt-2 w-124 bg-slate-100 gap-1"
          >
            <DialogBody className="flex justify-center text-md">
              <b>Are you sure you want to commit the changes to your post?</b>
            </DialogBody>
            <DialogFooter className="justify-center mb-1">
              <Button
                variant="gradient"
                onClick={handleOpen}
                className="mr-1 p-2 text-gray-900 bg-red-400"
              >
                Cancel
              </Button>
              <Button
                variant="gradient"
                color="green"
                className="text-gray-900 p-2 bg-green-400"
                onClick={handlePostEdit}
              >
                Confirm
              </Button>
            </DialogFooter>
          </Dialog>
        </CardFooter>
      </Card>
      <ToastContainer />
    </div>
  );
}

export default PostEdit;
