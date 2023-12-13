import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useAuth } from "../context/AuthProvider";
import PostEdit from "./PostEdit";
import { Link } from "react-router-dom";
import { likePost } from "../db/api";
import { useQuery } from "react-query";

function Post({ author, post_id, title, content }) {
  const { user } = useAuth();
  const handlePostLike = () => {
    const { data, error } = useQuery({
      queryKey: "like",
      queryFn: () => likePost(),
    });
  };

  return (
    <div className="flex flex-col justify-center items-center m-3.5">
      <Link to={"/posts/" + post_id}>
        <Card className="m-4 w-96 h-96 border-black rounded-md shadow-md">
          <CardHeader className="flex justify-center w-50 h-50 items-center">
            <Avatar
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "100%",
                border: "1px solid",
                backgroundColor: "whitesmoke",
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
      </Link>
      {user && user.id === author && (
        <PostEdit title={title} content={content} />
      )}
      {user && user.id !== author && (
        <Button className="text-gray-800" onClick={handlePostLike}>
          Like Post
        </Button>
      )}
    </div>
  );
}

export default Post;
