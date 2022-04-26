import React from "react";

export default function Item({ name, description, price }) {
  return (
    <div className="max-w-sm bg-brown1 rounded-lg border shadow-md">
      <div className="p-5 flex flex-col justify-between h-full">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-white">
          {price}
        </h2>
      <div>
        <button type="button" class="text-white bg-brown focus:ring-4 focus:ring-amber-900 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Edit</button>
        <button type="button" class="text-white bg-brown focus:ring-4 focus:ring-amber-900 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Delete</button>
      </div>
      </div>
    </div>
  );
}
