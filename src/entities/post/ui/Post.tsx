import { FC } from "react";
import { PostType } from "../model";

type Props = {
  data: PostType;
};

const Post: FC<Props> = ({ data }) => {
  return (
    <div className='mb-7'>
      <p className='font-bold'>{data.title}</p>
      {data.video && (
        <video width="600" controls>
          <source src={data.video} type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
      )}
      <p>{data.text}</p>
      <p>{data.date}</p>
    </div>
  );
};

export { Post };
