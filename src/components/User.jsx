import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { useData } from "../context/DataProvider";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Post from "./Post";

const User = () => {
  const { userId } = useParams();
  const { users, posts } = useData();
  var imgsrc = `https://robohash.org/${userId}.png`;
  //
  const [userPosts, setUserPosts] = useState([]);
  const [profileData, setProfileData] = useState([]);
  useEffect(() => {
    if (posts != undefined && users != undefined) {
      setUserPosts(posts.filter((post) => post.user_id === userId));
      setProfileData(users.filter((usr) => usr.id === userId)[0]);
      console.log(userPosts);
      console.log(profileData);
    }
  }, [posts, userId, users]);
  var username = profileData.email?.split("@")[0];
  //
  return (
    <div className="text-gray-900 flex flex-col items-center">
      <Card className="w-96 shadow rounded-lg">
        <div className="flex justify-center items-center">
          <div className="">
            <CardHeader className="relative h-56">
              <img
                src={imgsrc}
                alt="card-image"
                className="w-50 h-50 bg-whitesmoke"
              />
            </CardHeader>
          </div>
          <div>
            <CardBody className="">
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-2 text-center"
              >
                {profileData.email}
              </Typography>
              <Typography className="text-center mt-5">
                Here you can view all articles associated to{" "}
                <p className="text-lg pt-2">{username}</p>
              </Typography>
            </CardBody>
          </div>
        </div>
      </Card>
      <div className="flex flex-row overflow-auto">
        {userPosts?.map((post) => (
          <Post
            key={post.id}
            post_id={post.id}
            author={post.user_id}
            title={post.title}
            content={post.content}
          />
        ))}
      </div>
    </div>
  );
};

export default User;
