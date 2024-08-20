import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOldPost, insertPost } from "../../../db/api";

function HistoryArticle({ _id, author, post_id, title, content }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  //
  const restorePost = useMutation({
    mutationFn: () => insertPost(author, title, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => console.warn(error),
  });
  const removePostFromHistory = useMutation({
    mutationFn: () => deleteOldPost(_id, author),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["oldposts"] });
    },
    onError: (error) => console.warn(error),
  });
  const handlePostRestore = () => {
    restorePost.mutate();
    removePostFromHistory.mutate();
    navigate("/");
  };
  // -------------------------------------------------
  return (
    <div className="flex flex-col rounded-md justify-center items-center m-3.5 static">
      <Card className=" m-4 w-96 h-96 border border-gray-600 pt-2 rounded-sm shadow-md">
        <Link to={`#`}>
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
        </Link>
        <CardBody className="flex flex-wrap text-clip overflow-auto">
          <Typography className="text-justify tracking-tight text-md">
            {content}
          </Typography>
        </CardBody>
      </Card>
      <Button
        onClick={handlePostRestore}
        className="text-gray-900 text-md p-2 border-2"
      >
        Restore Post
      </Button>
    </div>
  );
}

export default HistoryArticle;
