import { Card } from "@material-tailwind/react";
import { useData } from "../context/DataProvider";
import { useAuth } from "../context/AuthProvider";
import { IoLibrary } from "react-icons/io5";
import HistoryArticle from "./HistoryArticle";

function History() {
  const { posts, oldposts, isLoading } = useData();
  const { user } = useAuth();
  // filter articles by user
  var filteredOldPostsByUser = oldposts.filter(
    (post) => post.post_data.user_id === user.id
  );
  var filteredOldPostsIds = filteredOldPostsByUser.map(
    (obj) => obj.post_data.post_id
  );
  const filteredPosts = filteredOldPostsIds.map((_id) => {
    return posts.filter((post) => post.id === _id);
  });
  console.log(filteredPosts);
  //
  if (isLoading) {
    return <div>Loading posts...</div>;
  }
  //
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div className=" text-gray-800 bg-white border rounded-lg w-50 p-6 flex gap-2 items-center">
        <IoLibrary size={30} />
        Old Posts
      </div>
      <Card>
        <div className="flex border bg-slate-50 rounded-md flex-wrap gap-8 m-7 justify-center items-center text-gray-900">
          {filteredPosts?.map((post) => (
            <div key={post.id} className="flex">
              <HistoryArticle
                author={post[0].user_id}
                post_id={post[0].id}
                title={post[0].title}
                content={post[0].content}
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default History;
