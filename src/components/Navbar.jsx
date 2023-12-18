import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { Avatar } from "@material-tailwind/react";
import supabase from "../client";

const Navbar = () => {
  const { user, auth } = useAuth();

  const handleSignout = async (event) => {
    event.preventDefault();
    const { error } = await supabase.auth.signOut();
  };

  if (user) {
    var imgsrc = `https://robohash.org/${user.id}.png`;
  }
  return (
    <div className="rounded-lg p-2 border shadow">
      <ul className="bg-white shadow flex flex-row justify-between items-center">
        <ul className="flex justify-center items-center">
          {auth && (
            <li>
              {" "}
              <Link to="/myprofile" aria-current="page">
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
              className="text-gray-900 hover:underline"
              aria-current="page"
            >
              Home
            </Link>
          </li>
        </ul>
        {auth && (
          <ul className="flex">
            <li>
              <Link href="#" className="text-sm text-gray-900 hover:underline">
                My Articles
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-gray-900 hover:underline">
                My Groups
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
        {!auth && (
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
