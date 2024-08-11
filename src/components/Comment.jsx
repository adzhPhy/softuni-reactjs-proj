import { Avatar, CardBody, Typography } from "@material-tailwind/react";
import moment from "moment";

function Comment({ created_at, authorId, content }) {
  // -----------------------------
  return (
    <CardBody className="flex items-center flex-col">
      <div className="flex items-center">
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
        <Typography
          variant="h6"
          color="blue-gray"
          className="text-sm ml-2 text-clip overflow-auto"
        >
          {content}
        </Typography>
      </div>
      <Typography className="text-xs">
        {moment(created_at).fromNow()}
      </Typography>
    </CardBody>
  );
}

export default Comment;
