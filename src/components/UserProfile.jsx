import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useAuth } from "../context/AuthProvider";

const UserProfile = () => {
  const { user } = useAuth();
  var username = user.email.split("@")[0];
  var imgsrc = `https://robohash.org/${username}.png`;
  return (
    <div className="text-gray-900">
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
                Welcome, {user.email}!
              </Typography>
              <Typography className="text-center mt-5">
                Here you can view all the information regarding your profile.
              </Typography>
            </CardBody>
          </div>
        </div>
      </Card>

      <Card className="mt-6 w-96 rounded-lg">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Email: {user.email}
          </Typography>
          <Typography>Change Email:</Typography>
          <input
            type="email"
            label="email"
            placeholder="Type email here..."
            className="w-full"
          />
          <Button
            type="button"
            className="text-gray-900 border-2 border-black mt-2 p-1"
            onClick={handleEmailChange}
          >
            Change Email
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserProfile;
