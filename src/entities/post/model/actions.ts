import { postStore, PostType } from "./store";

const updateState = (posts: PostType[]) => {
  postStore.setState(() => {
    return {
      posts,
    };
  });
};

export { updateState };
