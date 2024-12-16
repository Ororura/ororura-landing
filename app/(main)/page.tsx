import { FC } from "react";
import { Header } from "shared/header/ui";
import { PostWidget } from "widgets/postWidgets/ui";

const Home: FC = () => {
  return (
    <>
      <Header />
      <PostWidget />
    </>
  );
};

export default Home;
