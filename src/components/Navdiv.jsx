import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { GiArchiveResearch } from "react-icons/gi";
import { IoLibrary } from "react-icons/io5";

const Navdiv = () => {
  return (
    <div className="absolute top-0 left-0 m-2 flex flex-row gap-2">
      <Link to="/" className="bg-white hover:shadow-xl rounded-xl p-2 border-2">
        <FaHome size={25} />
      </Link>
      <Link
        to="/my-articles"
        className="bg-white hover:shadow-lg rounded-xl p-2 border-2"
      >
        <GiArchiveResearch size={25} />
      </Link>
      <Link
        to="/post-history"
        className="bg-white hover:shadow-lg rounded-xl p-2 border-2"
      >
        <IoLibrary size={25} />
      </Link>
    </div>
  );
};

export default Navdiv;
