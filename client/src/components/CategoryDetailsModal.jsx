import React, { useEffect, useState } from "react";
import ReactPortal from "./ReactPortal";
import "./NewCategory/style.css";
import Button from "./Buttons/Button";
import Category from "./Category";
import axios from "axios";

export default function CategoryDetailsModal({ name, isOpen, handleClose }) {
  const handleDelete = async () => {
    await axios
      .delete(`http://localhost:3001/categories/category/delete/${name}`)
      .then(() => {
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === "Escape" ? handleClose() : null);
    const closeOnClickOutside = (e) => {
      if (e.target.id == "modal") {
        handleClose();
      }
    };
    document.body.addEventListener("keydown", closeOnEscapeKey);
    if (isOpen) {
      document.body.addEventListener("click", closeOnClickOutside);
    }

    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
      document.body.removeEventListener("click", closeOnClickOutside);
    };
  }, [handleClose]);

  if (!isOpen) return null;
  return (
    <ReactPortal>
      <div className="modal flex flex-col items-center" id="modal">
        <div className="item max-w-sm bg-brown1 rounded-lg border shadow-md">
          <div className="p-5 flex flex-col items-center gap-6 justify-between h-full">
            <Category categoryName={name} />
            <div className="flex">
              <Button title="Edit" />
              <Button title="Delete" onClick={handleDelete} />
            </div>
          </div>
        </div>
      </div>
    </ReactPortal>
  );
}
