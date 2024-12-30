import { FC } from 'react';

const PostActions: FC = () => (
  <div className="mt-4 pt-4 border-t border-gray-100 flex gap-4">
    <button className="text-gray-500 hover:text-purple-600 transition-colors flex items-center gap-2">
      <span>👍</span> Нравится
    </button>
    <button className="text-gray-500 hover:text-purple-600 transition-colors flex items-center gap-2">
      <span>💬</span> Комментировать
    </button>
  </div>
);

export { PostActions };
