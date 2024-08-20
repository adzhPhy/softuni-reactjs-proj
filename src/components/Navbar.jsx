import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { Avatar, Button } from "@material-tailwind/react";
import supabase from "../client";
import { MdPostAdd } from "react-icons/md";

const Navbar = () => {
  const { user } = useAuth();
  const isAuthenticated = user?.role === "authenticated" ? true : false;

  const handleSignout = async (event) => {
    event.preventDefault();
    const { error } = await supabase.auth.signOut();
  };

  if (isAuthenticated) {
    var imgsrc = `https://robohash.org/${user.id}.png`;
  }

  return (
    <div className="rounded-lg p-2 border shadow">
      <ul className="bg-white shadow flex flex-row justify-between items-center">
        <ul className="flex justify-center items-center">
          {isAuthenticated && (
            <li>
              {" "}
              <Link to="/myprofile">
                <Avatar
                  className="border rounded-lg"
                  style={{ backgroundColor: "whitesmoke" }}
                  width={75}
                  height={75}
                  src={imgsrc}
                />
              </Link>
            </li>
          )}
          <li>
            <Link
              to="/"
              className="text-gray-900 hover:underline flex items-center"
            >
              Home
            </Link>
          </li>
        </ul>
        {isAuthenticated && (
          <ul className="flex items-center">
            <li className="text-gray-900 text-sm">
              Welcome {user.email.split("@")[0]} !
            </li>
            <li>
              <Link to="/create-post">
                <Button className="text-gray-900 hover:text-gray-600 p-0.5">
                  <MdPostAdd size={30} />
                </Button>
              </Link>
            </li>
            <li>
              <Link
                to="/my-articles"
                className="text-sm text-gray-900 hover:underline"
              >
                My Articles
              </Link>
            </li>
            <li>
              <Link
                to="/post-history"
                className="text-sm text-gray-900 hover:underline"
              >
                History of Posts
              </Link>
            </li>
            <li>
              <Link
                href="#"
                onClick={handleSignout}
                className="text-sm text-gray-900 hover:underline"
              >
                Sign Out
              </Link>
            </li>
          </ul>
        )}
        {!isAuthenticated && (
          <div>
            <li>
              <Link
                to="/login"
                className="text-sm text-gray-900 hover:underline"
              >
                Login
              </Link>
            </li>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
