import { Store } from "@tanstack/react-store";

type PostType = {
  id: number;
  title: string;
  text: string;
  date: string;
};

type InitialStateType = {
  posts: PostType[];
};

const postStore = new Store<InitialStateType>({} as InitialStateType);

export { postStore };
