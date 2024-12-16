import { FC } from "react";

const Header: FC = () => {
  return (
    <header className="bg-primary-purple border-b-2 border-purple-500 h-12">
      <div className="max-w-screen-xl items-center mx-auto flex font-medium h-full justify-between">
        <p>Блог Егора</p>
        <ul className="flex gap-10">
          <li>
            <a href="">Telegram</a>
          </li>
          <li>
            <a href="">YouTube</a>
          </li>
          <li>gladkikhegor01@gmail.com</li>
        </ul>
      </div>
    </header>
  );
};

export { Header };
