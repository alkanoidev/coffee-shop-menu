import React, { useEffect, useState } from "react";
import Button from "./Buttons/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactPortal from "./ReactPortal";
import Dropdown from "./Dropdown/Dropdown";

export default function NewItem({ isOpen, handleClose }) {
  const navigate = useNavigate();
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
      .post(`http://localhost:3001/items/item/new/${item.category}`, item)
      .then((response) => {
        navigate("/");
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({ ...prev, [name]: value }));
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

  useEffect(() => {
    const getCategories = async () => {
      await axios
        .get("http://localhost:3001/categories/")
        .then((res) => {
          const temp = res.data.categoryList.map((item) => ({
            title: item.name,
          }));
          setCategories(temp);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getCategories();
  }, []);

  return (
    <ReactPortal>
      <div className="modal flex flex-col items-center" id="modal">
        <form className="item max-w-sm bg-brown1 rounded-lg border shadow-md p-3 w-11/12 sm:w-3/4 md:w-2/4 lg:w-2/4 xl:w-2/6 2xl:w-1/6 flex flex-col gap-4">
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Name
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              name="name"
              required
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div>
            
            <Dropdown
              buttonTitle="Category"
              items={categories}
              setIsFocused={() => {}}
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Description
            </label>
            <textarea
              id="message"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              name="description"
              onChange={(e) => {
                handleChange(e);
              }}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Price
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
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
