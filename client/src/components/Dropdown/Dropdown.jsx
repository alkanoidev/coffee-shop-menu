import React, { useState } from "react";
import "./style.scss";

export default function Dropdown({ buttonTitle, items, setIsFocused }) {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  return (
    <div className="dropdown">
      <button
        onClick={(e) => {
          e.preventDefault()
          setIsDropdownOpened((prev) => !prev);
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsDropdownOpened(false);
          setIsFocused(false);
        }}
        className="button1"
      >
        {buttonTitle}
      </button>
      <div className="inline-block">
        {isDropdownOpened && (
          <div id="dropdown">
            <ul>
              {items.map((item, index) => (
                <li key={index}>
                  <button className="button1">{item.title}</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
