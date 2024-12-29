import { useStore } from "@tanstack/react-store";
import { postStore, PostType } from "./store";

const useGetPosts = (): PostType[] => {
  return useStore(postStore, (state) => state.posts);
};

export { useGetPosts };
