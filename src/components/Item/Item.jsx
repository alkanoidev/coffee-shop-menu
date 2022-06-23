import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../Buttons/Button";
import "./style.scss";
import ItemEditMode from "./ItemEditMode";
import { motion } from "framer-motion";
import ItemDeleteDialogue from "../ItemDeleteDialogue/ItemDeleteDialogue";

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
  const [dialogue, setDialogue] = useState({
    isOpened: false,
    isConfirmed: false,
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
  const handleUpdate = () => {
    axios
      .post(`http://localhost:3001/items/item/update/${name}`, item)
      .catch((err) => {
        console.log(err);
      });
    setEditMode(false);
    setItems((prev) => {
      prev[prev.findIndex((item) => item._id === _id)] = item;
      return prev;
    });
  };

  return (
    <motion.div
      className="item"
      variants={itemVariants}
      initial="hidden"
      animate="show"
    >
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
            <div className="text">
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
              <Button
                title="Delete"
                onClick={() => {
                  setDialogue((prev) => ({ ...prev, isOpened: true }));
                }}
              />
            </div>
          </div>
        </>
      )}
      {dialogue.isOpened && (
        <ItemDeleteDialogue
          isOpen={dialogue.isOpened}
          handleClose={() => {
            setDialogue((prev) => ({ ...prev, isOpened: false }));
          }}
          setDialogue={setDialogue}
          handleDelete={handleDelete}
        />
      )}
    </motion.div>
  );
}

const itemVariants = {
  hidden: { scale: 0, top: 100 },
  show: { scale: 1, top: 30 },
};
