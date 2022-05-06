import React from "react";

export default function Search() {
  return (
    <form>
      <label
        for="default-search"
        className="mb-2 text-sm font-medium text-black sr-only"
      >
        Search
      </label>
      <div className="relative">
        <div className="flex inset-0 items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-zinc-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 "
          placeholder="Search Mockups, Logos..."
          required=""
        />
        <button
          type="submit"
          className="text-white bg-brown hover:ring-3 hover:ring-brown1 font-medium rounded-lg text-sm px-4 py-2"
        >
          Search
        </button>
      </div>
    </form>
  );
}
