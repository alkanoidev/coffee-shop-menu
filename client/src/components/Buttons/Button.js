import React from "react";

export default function Button({title, onClick}) {
  return (
    <button
      type="button"
      className="text-white bg-brown focus:ring-4 focus:ring-amber-900 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
      onClick={onClick}
    >
      {title}
    </button>
  );
}
