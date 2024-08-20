import { useEffect, useState } from "react";
import { useData } from "../../../context/DataProvider";
import { useAuth } from "../../../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@material-tailwind/react";
import { GiArchiveResearch } from "react-icons/gi";
import { fetchArticles } from "../../../db/api";
import SavedArticle from "./SavedArticle";
import Post from "../posts/Post";

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
      const postFilterFunc = (objId) => {
        return posts.filter((post) => post.id === objId)[0];
      };
      var arr = filtPostIds.map((_id) => postFilterFunc(_id));
      setSavedArticles(arr);
    }
  }, [articles, posts]);
  //
  if (isLoading) {
    return <div>Loading posts...</div>;
  }
  // ------------------ loaders
  const postsLoader =
    (myArticles.length === 0 && (
      <div className="text-gray-900 p-2 rounded-md">You have no posts!</div>
    )) ||
    (myArticles === undefined && (
      <div className="text-gray-900 p-2 rounded-md">
        There was an error fetching your posts...
      </div>
    ));
  const articleLoader =
    (savedArticles.length === 0 && (
      <div className="text-gray-900 p-2 rounded-md">
        You have no saved articles!
      </div>
    )) ||
    (savedArticles === undefined && (
      <div className="text-gray-900 p-2 rounded-md">
        There was an error fetching your saved articles...
      </div>
    ));
  //
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div className=" text-gray-900 bg-white border rounded-lg w-50 p-6 flex gap-2 items-center">
        <GiArchiveResearch size={30} />
        Saved Articles Archive
      </div>
      <Card className="flex justify-center items-center">
        {postsLoader || (
          <div className="flex border bg-slate-50 rounded-md flex-wrap gap-8 m-7 justify-center items-center text-gray-900">
            {myArticles?.map((post) => (
              <div key={post.id} className="flex">
                <Post
                  author={post.user_id}
                  post_id={post.id}
                  title={post.title}
                  content={post.content}
                />
              </div>
            ))}
          </div>
        )}
      </Card>
      <Card>
        {articleLoader ||
          (savedArticles?.length !== 0 && (
            <div className="flex border bg-slate-50 rounded-md flex-wrap gap-8 m-7 justify-center items-center text-gray-900">
              {savedArticles?.map((post) => (
                <div key={post.id}>
                  <SavedArticle
                    author={post.user_id}
                    post_id={post.id}
                    title={post.title}
                    content={post.content}
                  />
                </div>
              ))}
            </div>
          ))}
      </Card>
    </div>
  );
}

export default Articles;
