import { Avatar, CardBody, Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../db/api";
import { format } from "date-fns";

function Comment({ content, authorId, created_at }) {
  const { data: profiles } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(authorId),
  });
  console.log(profiles);
  var username =
    profiles === undefined ? "test" : profiles[0].email.split("@")[0];
  var imgsrc = `https://robohash.org/${username}.png`;
  return (
    <>
      <CardBody className="flex items-center">
        <Avatar
          style={{
            width: "40px",
            height: "40px",
            border: "1px solid",
            borderRadius: "100%",
            backgroundColor: "whitesmoke",
          }}
          src={imgsrc}
          alt={imgsrc}
        />
        <Typography
          variant="h6"
          color="blue-gray"
          className="text-sm ml-2 text-clip overflow-auto"
        >
          {content}
        </Typography>
        <Typography className="text-xs">{format(created_at)}</Typography>
      </CardBody>
    </>
  );
}

export default Comment;
