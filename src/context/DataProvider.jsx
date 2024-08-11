import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchComments, fetchPostLikes, fetchPosts } from "../db/api";
const DataContext = createContext({});

export const useData = () => useContext(DataContext);

const DataProvider = ({ children }) => {
  // get posts
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
    refetchOnWindowFocus: false,
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
  return (
    <DataContext.Provider value={{ posts, likes, isLoading, comments }}>
      {!isLoading && children}
    </DataContext.Provider>
  );
};

export default DataProvider;
