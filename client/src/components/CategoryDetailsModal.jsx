import React, { useEffect, useState } from "react";
import ReactPortal from "./ReactPortal";
import "./NewCategory/style.scss";
import Button from "./Buttons/Button";
import Category from "./Category/Category";
import axios from "axios";

export default function CategoryDetailsModal({ name, isOpen, handleClose }) {
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(name);

  const handleChange = (e) => {
    setNewName(e.target.value);
  };

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
            <Category
              categoryName={name}
              edit={editMode}
              onChange={(e) => {
                handleChange(e);
              }}
              newName={newName}
            />
            <div className="flex gap-2">
              <Button
                title="Edit"
                onClick={async () => {
                  if (editMode) {
                    await axios
                      .post(
                        `http://localhost:3001/categories/category/update/${name}`,
                        { name: newName }
                      )
                      .then((res) => {
                        console.log(res.data);
                        setEditMode(false);
                        handleClose();
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  } else {
                    setEditMode(true);
                  }
                }}
              />
              <Button title="Delete" onClick={handleDelete} />
            </div>
          </div>
        </div>
      </div>
    </ReactPortal>
  );
}
