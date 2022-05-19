import React from "react";

export default function Button({ title, onClick, styles }) {
  return (
    <button
      className={`${styles} text-white bg-brown transition hover:ring-4 flex items-center justify-center hover:ring-green-900 font-medium rounded-lg text-sm px-5 py-2.5  w-full`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
