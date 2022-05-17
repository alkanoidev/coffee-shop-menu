import React, { useState, useEffect } from "react";
import "./style.scss";

export default function Dropdown({
  buttonTitle,
  items,
  setIsFocused,
  className,
  selectedCategory,
  setSelectedCategory,
}) {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [selected, setSelected] = useState(selectedCategory);

  return (
    <div className="dropdown">
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsDropdownOpened((prev) => !prev);
          setIsFocused(true);
        }}
        className={`${className == "" ? "button1" : className}`}
      >
        {selectedCategory}
      </button>
      <div className="inline-block">
        {isDropdownOpened && (
          <div id="dropdown">
            <ul>
              {items.map((item, index) => (
                <li key={index}>
                  <button
                    className="button1"
                    onClick={() => {
                      setSelectedCategory(item.title);
                      setIsDropdownOpened(false);
                    }}
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
