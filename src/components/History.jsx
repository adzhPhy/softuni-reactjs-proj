import { Card, Spinner } from "@material-tailwind/react";
import { useData } from "../context/DataProvider";
import { useAuth } from "../context/AuthProvider";
import { IoLibrary } from "react-icons/io5";
import HistoryArticle from "./HistoryArticle";

function History() {
  const { user } = useAuth();
  const { oldposts, isLoading } = useData();
  // filter articles by user
  var filteredOldPostsByUser = oldposts?.filter(
    (post) => post.user_id === user.id
  );
  //
  if (isLoading) {
    //
    return (
      <div>
        <Spinner />
        Loading posts...
      </div>
    );
  }
  //
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className=" text-gray-800 bg-white border rounded-lg w-50 p-6 flex gap-2 items-center">
        <IoLibrary size={30} />
        Old Posts Archive
      </div>
      {filteredOldPostsByUser?.length !== 0 ? (
        <Card>
          <div className="flex border bg-slate-50 rounded-md flex-wrap gap-8 m-7 justify-center items-center text-gray-900">
            {filteredOldPostsByUser?.map((post) => (
              <div key={post.id} className="flex">
                <HistoryArticle
                  _id={post.id}
                  author={post.user_id}
                  post_id={post.post_data.id}
                  title={post.post_data.post_title}
                  content={post.post_data.post_content}
                />
              </div>
            ))}
          </div>
        </Card>
      ) : (
        <div className="text-gray-900 text-lg p-2">
          You have no history of posts!
        </div>
      )}
    </div>
  );
}

export default History;
