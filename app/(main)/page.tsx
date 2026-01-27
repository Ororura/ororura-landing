import { FC } from "react";
import { Header } from "widgets/header/ui";
import { PostWidget } from "features/posts/ui/postWidgets/ui";

const Home: FC = () => {
  return (
    <>
      <Header />
      <PostWidget />
    </>
  );
};

export default Home;
