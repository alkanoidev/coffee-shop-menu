import React, { useEffect, useState } from "react";
import ReactPortal from "../ReactPortal";
import Button from "../Buttons/Button";
import Category from "../Category/Category";
import axios from "axios";
import "./style.scss";

export default function CategoryDetailsModal({ name, isOpen, handleClose }) {
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(name);

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
      <div className="modal" id="modal">
        <div className="card item">
          <div className="content">
            <Category
              categoryName={name}
              edit={editMode}
              onChange={(e) => {
                setNewName(e.target.value);
              }}
              newName={newName}
            />
            <div>
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
