import React, { useEffect, useState } from "react";
import Button from "../Buttons/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactPortal from "../ReactPortal";
import Dropdown from "../Dropdown/Dropdown";
import "./style.scss";

export default function NewItemModal({ isOpen, handleClose, items, setItems }) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [item, setItem] = useState({
    name: "",
    price: null,
    description: "",
    categoryName: "",
  });
  const [categories, setCategories] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3001/items/item/new/${item.categoryName}`, item)
      .then((response) => {
        navigate("/");
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
    items.push(item);
    setItems(items);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === "Escape" ? handleClose() : null);
    document.body.addEventListener("keydown", closeOnEscapeKey);

    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  useEffect(() => {
    setItem((prev) => ({ ...prev, categoryName: selectedCategory }));
  }, [selectedCategory]);

  useEffect(() => {
    const getCategories = async () => {
      await axios
        .get("http://localhost:3001/categories/")
        .then((res) => {
          const temp = res.data.categoryList.map((item) => ({
            title: item.name,
          }));
          setCategories([...temp]);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getCategories();
  }, []);

  return (
    <ReactPortal>
      <div
        className="modal"
        onClick={() => {
          handleClose();
        }}
      >
        <form id="modal" className="item" onClick={(e) => e.stopPropagation()}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div>
            <label htmlFor="first_name">Select a Category</label>
            <Dropdown
              buttonTitle="Select >"
              items={categories}
              setIsFocused={() => {}}
              className="buttonBg"
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              id="message"
              rows="4"
              name="description"
              onChange={(e) => {
                handleChange(e);
              }}
            ></textarea>
          </div>
          <div>
            <label>Price</label>
            <input
              type="text"
              required
              name="price"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>

          <Button title="Submit Item" styles="mt-6" onClick={handleSubmit} />
        </form>
      </div>
    </ReactPortal>
  );
}
