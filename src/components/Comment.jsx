import { Avatar, CardBody, Typography } from "@material-tailwind/react";
import { useQuery } from "react-query";
import { fetchUsers } from "../db/api";

function Comment({ _id, content, authorId }) {
  const { data: profiles } = useQuery({
    queryKey: "user2",
    queryFn: () => fetchUsers(authorId),
  });
  var username =
    profiles == undefined ? "test" : profiles[0].email.split("@")[0];
  var imgsrc = `https://robohash.org/${username}.png`;
  return (
    <>
      <CardBody className="flex items-center" key={_id}>
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
      </CardBody>
    </>
  );
}

export default Comment;
