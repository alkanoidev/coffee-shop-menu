import React, { useState, useEffect } from "react";
import "./style.scss";

export default function SearchAndFilter() {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className="SearchAndFilter"
      style={{ borderColor: isFocused ? "#00704a" : "#d4e9e2" }}
    >
      <button
        onClick={() => {
          setIsDropdownOpened((prev) => !prev);
          setIsFocused(true);
        }}
      >
        All Categories
      </button>
      <div className="inline-block">
        <div
          id="dropdown"
          style={{ display: isDropdownOpened ? "block" : "none" }}
        >
          <ul>
            <li>
              <button className="category" type="button">
                Mockups
              </button>
            </li>
            <li>
              <button className="category" type="button">
                Templates
              </button>
            </li>
            <li>
              <button className="category" type="button">
                Design
              </button>
            </li>
            <li>
              <button className="category" type="button">
                Logos
              </button>
            </li>
          </ul>
        </div>
        <div>
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
          <input
            type="text"
            placeholder="Search"
            id="input"
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}
