import React from "react";

export default function Button({ title, onClick }) {
  return (
    <button
      className="text-white bg-brown transition hover:ring-4 hover:ring-green-900 font-medium rounded-lg text-sm px-5 py-2.5  w-full"
      onClick={onClick}
    >
      {title}
    </button>
  );
}
