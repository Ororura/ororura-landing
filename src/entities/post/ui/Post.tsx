import { FC } from "react";
import { PostType } from "../model";
import { PostHeader } from "features/posts/ui/postHeaderWidget/ui";
import { PostVideo } from "features/posts/ui/postVideoWidget/ui";
import { PostActions } from "features/posts/ui/postActionsWidget/ui";

type Props = {
  data: PostType;
};

const Post: FC<Props> = ({ data }) => {
  return (
    <div className="mb-7 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <PostHeader title={data.title} date={data.date} />
      {data.video && <PostVideo videoUrl={data.video} />}
      <p className="mt-2 text-gray-700 leading-relaxed">{data.text}</p>
      <PostActions />
    </div>
  );
};

export { Post };
