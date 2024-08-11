import { Avatar, CardBody, Typography } from "@material-tailwind/react";
import { format } from "date-fns";

function Comment({ content, authorId, created_at }) {
  // -----------------------------
  var imgsrc = `https://robohash.org/${authorId}.png`;
  return (
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
  );
}

export default Comment;
