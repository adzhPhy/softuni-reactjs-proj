import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function HistoryArticle({ author, post_id, title, content }) {
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
    </div>
  );
}

export default HistoryArticle;
