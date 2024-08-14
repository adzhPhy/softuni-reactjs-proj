import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { GiArchiveResearch } from "react-icons/gi";
import { IoLibrary } from "react-icons/io5";

const Navdiv = () => {
  return (
    <div className="absolute left-0 m-2 flex flex-col gap-2">
      <Link to="/" className="bg-white hover:shadow-xl rounded-xl p-2 border-2">
        <FaHome size={30} />
      </Link>
      <Link
        to="/my-articles"
        className="bg-white hover:shadow-lg rounded-xl p-2 border-2"
      >
        <GiArchiveResearch size={30} />
      </Link>
      <Link
        to="/post-history"
        className="bg-white hover:shadow-lg rounded-xl p-2 border-2"
      >
        <IoLibrary size={30} />
      </Link>
    </div>
  );
};

export default Navdiv;
