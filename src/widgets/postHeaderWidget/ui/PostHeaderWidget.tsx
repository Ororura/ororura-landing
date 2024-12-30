import { FC } from "react";

const PostHeader: FC<{ title: string; date: string }> = ({ title, date }) => (
  <div className="flex items-center gap-3 mb-4">
    <div className="w-10 h-10 rounded-full bg-primary-light-purple flex items-center justify-center text-lg">📝</div>
    <div>
      <h2 className="font-bold text-[20px] text-purple-800 hover:text-purple-600 transition-colors">{title}</h2>
      <p className="text-gray-500 text-[12px]">{date}</p>
    </div>
  </div>
);

export { PostHeader };
