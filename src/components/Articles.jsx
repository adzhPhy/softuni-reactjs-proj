import { Card } from "@material-tailwind/react";
import Post from "./Post";
import { useData } from "../context/DataProvider";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { GiArchiveResearch } from "react-icons/gi";
import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "../db/api";
import SavedArticle from "./SavedArticle";

function Articles() {
  const [myArticles, setMyArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const { posts, isLoading } = useData();
  const { user } = useAuth();
  //
  const { data: articles } = useQuery({
    queryKey: ["articles"],
    queryFn: () => fetchArticles(),
    refetchOnMount: true,
  });
  // filter articles by user
  const filteredArticles = articles?.filter((art) => {
    return art.user_id === user.id;
  });
  //
  useEffect(() => {
    setMyArticles(
      posts.filter((post) => {
        return post.user_id.includes(user.id);
      })
    );
    if (articles != undefined) {
      const filtPostIds = filteredArticles.map((art) => {
        return art.post_id;
      });
      const filtFunc = (objId) => {
        return posts.filter((post) => post.id === objId);
      };
      var arr = filtPostIds.map((_id) => filtFunc(_id));
      setSavedArticles(arr[0]);
    }
  }, []);
  //
  if (isLoading) {
    return <div>Loading posts...</div>;
  }
  //
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div className=" text-gray-800 bg-white border rounded-lg w-50 p-6 flex gap-2 items-center">
        <GiArchiveResearch size={30} />
        Saved Articles Archive
      </div>
      <Card>
        <div className="flex border bg-slate-50 rounded-md flex-wrap gap-8 m-7 justify-center items-center text-gray-900">
          {myArticles?.map((post) => (
            <Post
              key={post.id}
              author={post.user_id}
              post_id={post.id}
              title={post.title}
              content={post.content}
            />
          ))}
        </div>
      </Card>
      {savedArticles?.length != 0 && (
        <Card>
          <div className="flex border bg-slate-50 rounded-md flex-wrap gap-8 m-7 justify-center items-center text-gray-900">
            {savedArticles?.map((post) => (
              <SavedArticle
                key={post.id}
                author={post.user_id}
                post_id={post.id}
                title={post.title}
                content={post.content}
              />
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

export default Articles;
