import { FC } from "react";
import { PostType } from "../model";

type Props = {
  data: PostType;
};

const Post: FC<Props> = ({ data }) => {
  return (
    <div>
      <p>Заголовок: {data.title}</p>
      <p>Текст: {data.text}</p>
      <p>Дата публикации: {data.date}</p>
    </div>
  );
};

export { Post };
