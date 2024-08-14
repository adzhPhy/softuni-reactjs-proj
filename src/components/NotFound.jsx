import { Card } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-gray-900 flex flex-col items-center">
      <h1>Oops! You seem to be lost.</h1>
      <Card className="items-center p-4 rounded-md gap-4">
        <p>Head back home so you don't miss out the news!</p>
        <Link to="/" className="hover:underline">
          Home Page
        </Link>
      </Card>
    </div>
  );
}
