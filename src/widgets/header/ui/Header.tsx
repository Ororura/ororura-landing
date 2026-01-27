"use client";

import { useCountdown } from "features/countdown";
import { FC } from "react";

const Header: FC = () => {
  const { timeUntil } = useCountdown({
    targetDate: "2026-06-27T00:00:00",
    onComplete: () => {
      console.log("Пора домой!");
    },
  });

  return (
    <header className="bg-primary-dark-purple border-b border-purple-400">
      <div className="max-w-screen-lg mx-auto px-4 py-3 md:py-0 md:h-16">
        {/* Desktop версия */}
        <div className="hidden md:flex items-center h-full justify-between font-medium">
          <div className="flex flex-col">
            <p className="text-lg font-bold hover:text-purple-700 transition-colors cursor-pointer">
              Egor Gladkikh | Shitware Developer
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
            <li>
              <div className="flex items-center gap-2 transition-colors">
                <span>🏠</span>
                <p>{timeUntil.days}д</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Mobile версия */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-3">
            <p className="text-base font-bold">Egor Gladkikh</p>
            <div className="flex items-center gap-2 text-sm">
              <span>🏠</span>
              <p className="font-semibold">{timeUntil.days}д</p>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex gap-3">
              <a
                href="https://t.me/egordkl"
                className="hover:text-purple-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 TG
              </a>
              <a
                href="https://github.com/Ororura"
                className="hover:text-purple-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                💻 GitHub
              </a>
            </div>
            <span className="text-gray-600">🌍 СПб</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };
