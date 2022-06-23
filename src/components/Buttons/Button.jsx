import React from "react";
import "./style.scss"
export default function Button({ title, onClick, styles }) {
  return (
    <button
      className={`${styles} Button`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
