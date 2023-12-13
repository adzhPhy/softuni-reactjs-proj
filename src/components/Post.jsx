import { useQuery } from "react-query";
import { fetchComments, fetchUsers } from "../db/api";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import Comment from "./Comment";

function Post({ post_id, authorId, title, content }) {
  const { data: users } = useQuery({
    queryKey: "user",
    queryFn: () => fetchUsers(authorId),
  });
  console.log(users);
  // fetch comments for a post
  const { data: comments } = useQuery({
    queryKey: "comments",
    queryFn: () => fetchComments(post_id),
  });

  return (
    <div className="flex flex-col">
      <Card className="mt-2 w-96 h-96 border-black rounded-md shadow-md">
        <CardHeader className="flex justify-center w-50 h-50 items-center">
          <Avatar
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "100%",
              border: "1px solid",
              backgroundColor: "whitesmoke",
            }}
            src={`https://robohash.org/${users}.png`}
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
      {/* Comment Section */}
      <Card className="mt-6 w-96">
        {comments?.map((comment) => (
          <Comment
            key={comment.id}
            _id={comment.id}
            content={comment.content}
            author_id={comment.user_id}
          />
        ))}
        <CardFooter className="pt-0">
          <Input
            className="rounded-lg"
            label="text"
            placeholder="Comment on this post..."
          />
        </CardFooter>
      </Card>
    </div>
  );
}

export default Post;
