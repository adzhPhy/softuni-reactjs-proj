import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { AiOutlineLike } from "react-icons/ai";
import { useAuth } from "../context/AuthProvider";
import PostEdit from "./PostEdit";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updatePost, likePost, fetchPostLikes } from "../db/api";

function Post({ author, post_id, title, content }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  console.log(`${post_id}`);
  const { data: likes } = useQuery({
    queryKey: ["likes"],
    queryFn: () => fetchPostLikes(post_id),
  });
  console.log(likes);

  const { mutateAsync: handlePostUpdate } = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const { mutateAsync: handlePostLike } = useMutation({
    mutationFn: likePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likes"] });
    },
  });

  return (
    <div className="flex flex-col rounded-md justify-center items-center m-3.5">
      <Link to={"/posts/" + post_id}>
        <Card className=" m-4 w-96 h-96 border border-gray-600 pt-2 rounded-sm shadow-md">
          <CardHeader className="flex justify-center w-50 h-50 items-center">
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
        <p className="justify-start gap-2 text-sm flex">
          <AiOutlineLike className="text-lg ml-4" />
          {`${likes?.length} likes`}
        </p>
      </Link>
      {user && user.id === author && (
        <PostEdit title={title} content={content} onClick={handlePostUpdate} />
      )}
      {user && user.id !== author && (
        <div className="flex items-center">
          <AiOutlineLike className="text-lg" />
          <Button
            className="text-gray-800 bg-white flex p-1"
            onClick={handlePostLike}
          >
            Like Post
          </Button>
        </div>
      )}
    </div>
  );
}

export default Post;
