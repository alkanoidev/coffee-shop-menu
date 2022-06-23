import React, { useState, useEffect } from "react";
import Dropdown from "../Dropdown/Dropdown";
import axios from "axios";
import "./style.scss";

export default function SearchAndFilter({
  categories,
  setSelectedCategory,
  selectedCategory,
  setItems,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [searchString, setSearchString] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:3001/items/search/${searchString}`)
      .then((res) => {
        setItems(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="SearchAndFilter"
      style={{ borderColor: isFocused ? "#00704a" : "#d4e9e2" }}
    >
      <Dropdown
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
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search"
            id="input"
            onChange={(e) => {
              setSearchString(e.target.value);
            }}
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
          />
        </form>
      </div>
    </div>
  );
}
