import { FC } from "react";

const Header: FC = () => {
  return (
    <header className="bg-primary-light-purple h-14 border-b border-purple-400">
      <div className="max-w-screen-xl items-center mx-auto flex font-medium h-full justify-between">
        <p>Ororura</p>
        <ul className="flex gap-10">
          <li>
            <a href="">Telegram</a>
          </li>
          <li>
            <a href="">GitHub</a>
          </li>
          <li>gladkikhegor01@gmail.com</li>
        </ul>
      </div>
    </header>
  );
};

export { Header };
