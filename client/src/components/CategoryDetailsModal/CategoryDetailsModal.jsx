import React, { useEffect, useState } from "react";
import ReactPortal from "../ReactPortal";
import Button from "../Buttons/Button";
import Category from "../Category/Category";
import axios from "axios";
import "./style.scss";

export default function CategoryDetailsModal({
  currentCategory,
  isOpen,
  handleClose,
  categoryList,
  setCategoryList,
}) {
  const [editMode, setEditMode] = useState(false);
  const [category, setCategory] = useState(currentCategory);

  const handleDelete = () => {
    axios
      .delete(
        `http://localhost:3001/categories/category/delete/${category.name}`
      )
      .then(() => {
        const newCategories = categoryList.filter(
          (cat) => cat._id !== category._id
        );
        setCategoryList(newCategories);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleUpdate = () => {
    if (editMode) {
      axios
        .post(
          `http://localhost:3001/categories/category/update/${category.name}`,
          {
            name: category.name,
          }
        )
        .then((res) => {
          setEditMode(false);
          setCategoryList((prev) => {
            prev[prev.findIndex((cat) => cat._id === category._id)] = category;
            return prev;
          });
          handleClose();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setEditMode(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({ ...prev, [name]: value }));
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
              categoryName={category.name}
              edit={editMode}
              onChange={(e) => {
                handleChange(e);
              }}
              newName={category.name}
            />
            <div>
              <Button title="Edit" onClick={handleUpdate} />
              <Button title="Delete" onClick={handleDelete} />
            </div>
          </div>
        </div>
      </div>
    </ReactPortal>
  );
}
