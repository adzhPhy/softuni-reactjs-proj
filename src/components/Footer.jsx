import { FaArrowUp } from "react-icons/fa";

function Footer() {
  return (
    <footer className="w-full flex justify-center bg-white text-center md:justify-between">
      <ul className="flex text-sm text-gray-700">
        <li>
          <a href="#" className="hover:underline me-4 md:me-6">
            About
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline me-4 md:me-6">
            Privacy Policy
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline me-4 md:me-6">
            Licensing
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </li>
        <li>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex gap-1 items-center"
          >
            <FaArrowUp />
            <p>Scroll to Top</p>
          </button>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
