'use client';
import React, { useState } from 'react';

import CustomLink from '@/components/atoms/custom-link/CustomLink';
import { type NavigationProps } from '@/types/navigation.types';

const Dropdown: React.FC<NavigationProps> = ({
  title,
  mainNavigationCollection,
  sys,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="relative w-full md:w-fit">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg dark:bg-transparent dark:focus:text-white dark:hover:text-white dark:focus:bg-gray-600 dark:hover:bg-gray-600 md:w-auto md:inline md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
      >
        <span>{title}</span>
        <svg
          fill="currentColor"
          viewBox="0 0 20 20"
          className={`${
            isOpen ? 'rotate-180' : 'rotate-0'
          } inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1`}
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      {isOpen && (
        <div
          className={`transition opacity-0 scale-95 ${
            isOpen ? 'ease-out duration-100 opacity-100 scale-100' : ''
          } absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48`}
        >
          <div className="px-2 py-2 bg-white rounded-md shadow dark:bg-white">
            {mainNavigationCollection?.items?.map((navItem, idx) => (
              <CustomLink
                content={navItem}
                key={`${sys.id}-${navItem.sys.id}-${idx}`}
                linkClassName="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-black md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
