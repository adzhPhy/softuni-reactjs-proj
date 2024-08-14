import { Avatar, CardBody, Typography } from "@material-tailwind/react";
import moment from "moment";
import { Link } from "react-router-dom";
import { useData } from "../context/DataProvider";
import { useAuth } from "../context/AuthProvider";

function Comment({ created_at, authorId, content }) {
  const { user } = useAuth();
  const { users } = useData();
  const postAuthor = users.filter((us) => us.id === authorId)[0].email;
  //
  var profileLink = "";
  if (authorId === user.id) {
    profileLink = "/myprofile";
  } else {
    profileLink = `/${authorId}/details`;
  }
  // -----------------------------
  return (
    <CardBody className="flex items-center flex-col border rounded-md m-1 shadow-sm overflow-auto max-h-48">
      <div className="flex flex-row items-center">
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
        <div className="flex flex-col">
          <Typography
            variant="h6"
            color="blue-gray"
            className="text-sm ml-2 text-clip overflow-auto"
          >
            {content}
          </Typography>
          <Typography className="text-xs">
            <Typography className="text-xs ml-2">
              <Link
                to={profileLink}
                className="underline hover:no-underline hover:text-red-700"
              >
                {postAuthor.split("@")[0]}
              </Link>{" "}
              {moment(created_at).fromNow()}
            </Typography>
          </Typography>
        </div>
      </div>
    </CardBody>
  );
}

export default Comment;
