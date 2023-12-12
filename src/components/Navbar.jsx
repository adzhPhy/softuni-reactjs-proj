import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Navbar = () => {
  const { user, auth, signOut } = useAuth();
  var username = user.email.split("@")[0];
  console.log(username)
  const handleSignout = async (event) => {
    event.preventDefault();
    const { error } = await signOut();
  };
  return (
    <ul className="bg-white flex flex-row justify-between items-center">
      <ul className="flex justify-center items-center">
        <li>
          {auth && <Link
            to="/"
            
            aria-current="page"
          >
            <img className="border" width={75} height={75} src="https://robohash.org/`{username}`.png"/>
          </Link>}
        </li>
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
            <Link to="/login" className="text-sm text-gray-900 hover:underline">
              Login
            </Link>
          </li>
        </div>
      )}
    </ul>
  );
};

export default Navbar;
