import React, { useState } from "react";
import Layout from "../components/Layout";
import Button from "../components/Buttons/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NewCategory() {
  const [category, setCategory] = useState({
    name: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post("http://localhost:3001/categories/category/new/", category)
      .then(() => {
        navigate("/categories");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ [name]: value });
  };

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <form className="p-1 w-full sm:w-3/4 md:w-2/4 lg:w-2/4 xl:w-2/6 2xl:w-1/6 flex flex-col gap-4">
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
							onChange={handleChange}
            />
          </div>
          <Button title="Submit Category" onClick={handleSubmit} />
        </form>
      </div>
    </Layout>
  );
}
