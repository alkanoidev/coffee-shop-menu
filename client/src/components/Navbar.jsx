import React from "react";
import { useState } from "react";

export default function Navbar() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <nav className="rounded rounded-t-none rounded-r-none bg-brown border-gray-200 px-2 sm:px-5 py-2.5 w-full">
      <div className="flex flex-wrap justify-between items-center w-full">
        <a href="/" className="flex items-center">
          <img
            src="icons/logo.png"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center text-white font-semibold whitespace-nowrap">
            Coffee Shop Inventory
          </span>
        </a>
        <div className="flex md:order-2">
          <button
            onClick={() => {
              setCollapsed((prev) => !prev);
            }}
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className={`${
            !collapsed ? "flex" : "hidden"
          } justify-between items-center w-full md:flex md:w-auto md:order-1`}
          id="mobile-menu-3"
        >
          <ul className="flex flex-col mt-4 md:flex-row w-full md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              <a
                href="/"
                className="rounded text-lg transition block py-2 pr-4 pl-3 md:px-2 focus:text-white text-gray-200 border-b focus:bg-brown1  border-gray-500 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 "
                aria-current="page"
              >
                Items
              </a>
            </li>
            <li>
              <a
                href="/categories"
                className="rounded transition text-lg block py-2 pr-4 pl-3 md:px-2 focus:text-white text-gray-200 border-b focus:bg-brown1  border-gray-500 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0"
              >
                Categories
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
