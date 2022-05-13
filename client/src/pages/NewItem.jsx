import React, { useEffect } from "react";
import Layout from "../components/Layout";
import Button from "../components/Buttons/Button";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewItem() {
  const navigate = useNavigate();
  const [item, setItem] = useState({
    name: "",
    price: null,
    description: "",
    categoryName: "",
  });

  // const getCategoryId = async () => {
  //   await axios
  //     .get(`http://localhost:3001/categories/category/${item.category}`)
  //     .then((res) => {
  //       setItem((prev) => ({ ...prev, categoryId: res.data.category._id }));
  //     });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // getCategoryId();
    axios
      .post(`http://localhost:3001/items/item/new/${item.category}`, item)
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <form className="p-1 w-11/12 sm:w-3/4 md:w-2/4 lg:w-2/4 xl:w-2/6 2xl:w-1/6 flex flex-col gap-4">
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
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Category
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              name="category"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <Button title="Submit Item" onClick={handleSubmit} />
        </form>
      </div>
    </Layout>
  );
}
