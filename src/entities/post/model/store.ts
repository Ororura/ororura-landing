import { Store } from "@tanstack/react-store";

type PostType = {
  id: number;
  title: string;
  text: string;
  date: string;
  video?: string;
};

type InitialStateType = {
  posts: PostType[];
};

const initialState: InitialStateType = {
  posts: [
    {
      id: 1,
      title: "Hello world!",
      text: "Автор: https://www.youtube.com/watch?v=ikiI3MPfSZc&list=RDMMhZ-6_iqhLlU&index=8",
      date: "16.12.2024",
      video: "Kyspal.mp4",
    },
    { id: 2, title: "Проверяем работу", text: "Это второй пост для проверки работоспособности!", date: "16.12.2024" },
  ],
};

const postStore = new Store<InitialStateType>(initialState);

export { postStore };
export type { PostType };
