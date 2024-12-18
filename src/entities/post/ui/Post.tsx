import { FC } from "react";
import { PostType } from "../model";

type Props = {
  data: PostType;
};

const Post: FC<Props> = ({ data }) => {
  return (
    <div className="mb-7">
      <h2 className="font-bold text-[20px]">{data.title}</h2>
      {data.video && (
        <video width="600" controls>
          <source src={data.video} type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
      )}
      <p className='mt-2'>{data.text}</p>
      <p className='text-gray-500 text-[12px] mt-2'>{data.date}</p>
    </div>
  );
};

export { Post };
