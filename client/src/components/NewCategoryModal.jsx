import React, { useState, useLayoutEffect, useEffect } from "react";
import Button from "./Buttons/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactPortal from "./ReactPortal";
import "./style.css";

export default function NewCategoryModal({ handleClose, isOpen }) {
  const [category, setCategory] = useState({
    name: "",
  });
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/categories/category/new/", category)
      .then(() => {
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
      <div className="modal flex flex-col items-center" id="modal">
        <form className="p-1 w-full sm:w-3/4 md:w-2/4 lg:w-2/4 xl:w-2/6 2xl:w-1/6 flex flex-col gap-4">
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-white"
            >
              Name
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
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
    </ReactPortal>
  );
}
