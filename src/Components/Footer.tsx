import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="text-center fixed bottom-0 left-0 z-50 w-full p-4 bg-white border-gray-200 shadow dark:bg-gray-800 dark:border-gray-600">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2024 <Link to={'/'} className="hover:underline">Movie World™</Link>. All Rights Reserved.
      </span>
    </footer>
  );
};

export default Footer;
