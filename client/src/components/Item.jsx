import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "./Buttons/Button";
import "./style.css";

export default function Item({ name, description, price }) {
  const [editMode, setEditMode] = useState(false);
  const [item, setItem] = useState({
    name: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    if (editMode) {
      setItem({ name: name, description: description, price: price });
    }
  }, [editMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:3001/items/item/delete/${name}`);
  };
  const handleEdit = async () => {
    await axios
      .post(`http://localhost:3001/items/item/update/${name}`, item)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setEditMode(false);
  };
  return (
    <div className="item max-w-sm bg-brown1 rounded-lg border shadow-md">
      <div className="p-5 flex flex-col justify-between gap-5 h-full">
        {editMode ? (
          <form className="flex flex-col gap-10">
            <div className="flex gap-2 flex-col">
              <input
                className="rounded font-bold text-2xl p-2.5 bg-gray-50"
                type="text"
                name="name"
                placeholder="name"
                value={item.name}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <textarea
                rows="5"
                name="description"
                value={item.description}
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder="description"
                className="w-full block h-auto p-2.5 text-sm font-normal text-gray-700 bg-gray-50 rounded-lg border"
              ></textarea>
              <input
                value={item.price}
                onChange={(e) => {
                  handleChange(e);
                }}
                className="rounded font-bold text-2xl p-2.5 bg-gray-50"
                type="text"
                placeholder="price"
                name="price"
              />
            </div>
            <Button
              title="Edit"
              onClick={(e) => {
                e.preventDefault();
                handleEdit();
              }}
            />
          </form>
        ) : (
          <>
            <div>
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-800">
                  {name}
                </h5>
              </a>
              <p className="mb-3 max-h-64 overflow-y-auto font-normal text-gray-700">
                {description}
              </p>
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-800">
                {price} €
              </h2>
            </div>
            <div className="flex gap-2">
              <Button
                title="Edit"
                onClick={() => {
                  setEditMode(true);
                }}
              />
              <Button title="Delete" onClick={handleDelete} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
