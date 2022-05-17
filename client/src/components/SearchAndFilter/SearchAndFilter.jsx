import React, { useState, useEffect } from "react";
import Dropdown from "../Dropdown/Dropdown";
import "./style.scss";

export default function SearchAndFilter({
  categories,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  return (
    <div
      className="SearchAndFilter"
      style={{ borderColor: isFocused ? "#00704a" : "#d4e9e2" }}
    >
      <Dropdown
        buttonTitle="All Categories"
        items={categories}
        setIsFocused={setIsFocused}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
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
  );
}
