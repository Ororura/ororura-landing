import { FC } from "react";

const Header: FC = () => {
  return (
    <header className="bg-primary-light-purple h-16 border-b border-purple-400">
      <div className="max-w-screen-lg items-center mx-auto flex font-medium h-full justify-between px-4">
        <div className="flex flex-col">
          <p className="text-lg font-bold hover:text-purple-700 transition-colors cursor-pointer">
            🚀 Егор Гладких | Web Developer 🌟
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-gray-600 hover:text-purple-600 transition-colors">
              📧 gladkikhegor01@gmail.com
            </span>
            <span className="text-[12px] text-gray-600">•</span>
            <span className="text-[12px] text-gray-600">🌍 Россия, Санкт-Петербург</span>
          </div>
        </div>
        <ul className="flex gap-6">
          <li>
            <a
              href="https://t.me/egordkl"
              className="flex items-center gap-2 hover:text-purple-700 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>💬</span>
              Telegram
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Ororura"
              className="flex items-center gap-2 hover:text-purple-700 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>💻</span>
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export { Header };
