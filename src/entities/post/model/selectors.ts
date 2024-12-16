import { useStore } from "@tanstack/react-store";
import { postStore, PostType } from "./store";

const useGetPosts = (): PostType[] => {
  const posts = useStore(postStore, (state) => state.posts);
  return posts;
};

export { useGetPosts };
