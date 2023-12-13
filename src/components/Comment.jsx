import {
  Avatar,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { useQuery } from "react-query";
import { fetchUsers } from "../db/api";

function Comment({ _id, content, authorId }) {
  const { data } = useQuery({
    queryKey: "user2",
    queryFn: () => fetchUsers(authorId),
  });
  console.log(data);
  var username = data.email.split("@")[0];
  var imgsrc = `https://robohash.org/${username}.png`;
  return (
    <>
      <CardBody key={_id}>
        <Avatar src={imgsrc} alt={imgsrc} />
        <Typography variant="h6" color="blue-gray" className="text-sm">
          {content}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0"></CardFooter>
    </>
  );
}

export default Comment;
