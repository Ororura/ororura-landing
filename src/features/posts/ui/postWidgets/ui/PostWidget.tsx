"use client";
import { useGetPosts } from "entities/post/model";
import { Post } from "entities/post/ui";
import { FC } from "react";

const PostWidget: FC = () => {
  const posts = useGetPosts();
  return (
    <div className="max-w-screen-lg mx-auto mt-10 px-2">
      {posts.map((value, idx) => (
        <Post data={value} key={idx} />
      ))}
    </div>
  );
};

export { PostWidget };
