import React, { useState, useLayoutEffect, useEffect } from "react";
import Button from "../Buttons/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactPortal from "../ReactPortal";
import "./style.scss";

export default function NewCategoryModal({
  handleClose,
  isOpen,
  categoryList,
  setCategoryList,
}) {
  const [category, setCategory] = useState({
    name: "",
  });
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/categories/category/new/", category)
      .then(() => {
        const categories = [...categoryList];
        categories.push(category);
        setCategoryList(categories);
        handleClose();
        navigate("/categories");
      })
      .catch((err) => {
        console.error(err);
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
          <form>
            <div>
              <label htmlFor="first_name">Name</label>
              <input
                type="text"
                name="name"
                required
                onChange={(e) => {
                  const { name, value } = e.target;
                  setCategory({ [name]: value });
                }}
              />
            </div>
            <Button title="Submit Category" onClick={handleSubmit} />
          </form>
        </div>
      </div>
    </ReactPortal>
  );
}
