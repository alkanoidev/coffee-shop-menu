import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../Buttons/Button";
import "./style.scss";
import ItemEditMode from "./ItemEditMode";

export default function Item({
  _id,
  name,
  description,
  price,
  items,
  setItems,
}) {
  const [editMode, setEditMode] = useState(false);
  const [item, setItem] = useState({
    _id: _id,
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
    const newItems = items.filter((item) => item._id !== _id);
    setItems(newItems);
  };
  const handleUpdate = async () => {
    await axios
      .post(`http://localhost:3001/items/item/update/${name}`, item)
      .catch((err) => {
        console.log(err);
      });
    setEditMode(false);
    const index = items.findIndex((item) => item._id === _id);
    items[index] = item;
    setItems(items);
  };
  return (
    <div className="item">
      {editMode ? (
        <ItemEditMode
          handleChange={handleChange}
          setEditMode={setEditMode}
          handleUpdate={handleUpdate}
          item={item}
        />
      ) : (
        <>
          <div className="content">
            <div>
              <a href="#">
                <h5>{name}</h5>
              </a>
              <p>{description}</p>
              <h2>{price} €</h2>
            </div>
            <div className="buttons">
              <Button
                title="Edit"
                onClick={() => {
                  setEditMode(true);
                }}
              />
              <Button title="Delete" onClick={handleDelete} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
