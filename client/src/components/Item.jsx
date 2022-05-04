import React from "react";
import axios from "axios";
import Button from "./Buttons/Button";

export default function Item({ name, description, price }) {
  const handleDelete = () => {
    axios.delete(`http://localhost:3001/items/item/delete/${name}`);
  };
  return (
    <div className="max-w-sm bg-brown1 rounded-lg border shadow-md">
      <div className="p-5 flex flex-col justify-between h-full">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-800">
            {name}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700">
          {description}
        </p>
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-800">
          {price}
        </h2>
        <div className="flex">
          <Button title="Edit" />
          <Button title="Delete" onClick={handleDelete} />
        </div>
      </div>
    </div>
  );
}
