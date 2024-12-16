import { FC } from "react";

const Header: FC = () => {
  return (
    <header className="bg-primary-light-purple h-14 border-b border-purple-400">
      <div className="max-w-screen-lg items-center mx-auto flex font-medium h-full justify-between">
        <div>
          <p>👾 Сайт Егорки2005Rus 👽</p>
          <span className="text-[12px] text-gray-600">💌 Для связи gladkikhegor01@gmail.com</span>
        </div>
        <ul className="flex gap-10">
          <li>
            <a href="https://t.me/egordkl">Telegram</a>
          </li>
          <li>
            <a href="https://github.com/Ororura">GitHub</a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export { Header };
