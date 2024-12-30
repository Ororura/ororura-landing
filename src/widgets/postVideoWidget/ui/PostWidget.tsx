import { FC } from "react";

const PostVideo: FC<{ videoUrl: string }> = ({ videoUrl }) => (
  <div className="my-4 rounded-lg overflow-hidden">
    <video width="100%" controls className="hover:opacity-90 transition-opacity">
      <source src={videoUrl} type="video/mp4" />
      Ваш браузер не поддерживает видео.
    </video>
  </div>
);

export { PostVideo };
