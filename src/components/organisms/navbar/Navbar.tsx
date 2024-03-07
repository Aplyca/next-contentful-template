'use client';

import React, { useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Dropdown from '../dropdown/Dropdown';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const pathname = usePathname();

  return (
    <div className="text-black bg-transparent dark:text-white mb-6 z-[100] md:z-auto">
      <div className="flex flex-col max-w-screen-xl mx-auto md:items-center md:justify-between md:flex-row">
        <div className="p-4 flex flex-row items-start justify-between">
          <button
            className="md:hidden rounded-lg focus:outline-none focus:shadow-outline pt-2"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
              {!isOpen && (
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              )}
              {isOpen && (
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              )}
            </svg>
          </button>

          <nav
            className={`${
              isOpen ? 'flex' : 'hidden'
            } flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row md:gap-5`}
          >
            <Link
              className={`px-4 py-2 mt-2 text-sm font-semibold ${pathname === '/' ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-transparent'} rounded-lg dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline`}
              href="/"
            >
              Home
            </Link>
            <a
              className={`px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline`}
              href="//www.aplyca.com/en/contact-us"
              target="_blank"
            >
              Contact us
            </a>
            <Dropdown title="Blog" />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
