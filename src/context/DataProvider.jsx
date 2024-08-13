import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchArticles,
  fetchComments,
  fetchOldPosts,
  fetchPostLikes,
  fetchPosts,
  fetchUsers,
} from "../db/api";
const DataContext = createContext({});

export const useData = () => useContext(DataContext);

const DataProvider = ({ children }) => {
  // get posts
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
    refetchOnMount: true,
  });
  //   get likes
  const { data: likes } = useQuery({
    queryKey: ["likes"],
    queryFn: () => fetchPostLikes(),
    refetchOnWindowFocus: true,
  });
  //  get comments
  const { data: comments } = useQuery({
    queryKey: ["comments"],
    queryFn: () => fetchComments(),
    refetchOnWindowFocus: true,
  });
  // get articles
  const { data: articles } = useQuery({
    queryKey: ["articles"],
    queryFn: () => fetchArticles(),
    refetchOnMount: true,
  });
  // get users
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
    refetchOnMount: true,
  });
  // get history of posts
  const { data: oldposts } = useQuery({
    queryKey: ["oldposts"],
    queryFn: () => fetchOldPosts(),
    refetchOnMount: true,
  });
  return (
    <DataContext.Provider
      value={{
        posts,
        likes,
        isLoading,
        comments,
        articles,
        users,
        oldposts,
      }}
    >
      {!isLoading && children}
    </DataContext.Provider>
  );
};

export default DataProvider;
