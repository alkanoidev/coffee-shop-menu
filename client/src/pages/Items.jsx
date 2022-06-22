import React, { useEffect, useRef, useState } from "react";
import Item from "../components/Item/Item";
import axios from "axios";
import NewItemFAB from "../components/Buttons/NewItemFAB";
import Loader from "../components/Loader/Loader";
import SearchAndFilter from "../components/SearchAndFilter/SearchAndFilter";
import NewItem from "../components/NewItemModal/NewItemModal";
import Illustration from "../assets/illustration.png";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router";

export default function Items() {
  const [items, setItems] = useState([]);
  const { current: itemsRef } = useRef(items);
  const [isLoading, setIsLoading] = useState(false);
  const [newItemModal, setNewItemModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const illustrationDiv = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const navigate = useNavigate();

  const getItems = () => {
    setIsLoading(true);
    setItems([]);
    if (selectedCategory === "All Categories") {
      axios // get all items
        .get(`/.server/items/`)
        .then((res) => {
          setItems(res.data.itemList);
          setIsLoading(false);
        });
    } else {
      axios // get Items by category
        .get(`http://localhost:3001/items/category/${selectedCategory}`)
        .then((res) => {
          setItems(res.data.itemList);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getCategories = () => {
    setIsLoading(true);
    axios
      .get("http://localhost:3001/categories/")
      .then((res) => {
        const temp = res.data.categoryList.map((item) => ({
          title: item.name,
        }));
        setCategories([{ title: "All Categories" }, ...temp]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getItems();
    getCategories();
  }, [itemsRef, selectedCategory]);

  return (
    <div className="flex justify-center p-2 sm:p-2 sm:justify-center flex-wrap items-stretch w-full gap-6">
      <div
        className="w-72 relative flex flex-col justify-center items-center"
        ref={illustrationDiv}
      >
        <button
          className="text-3xl absolute right-0 top-0"
          onClick={() => {
            illustrationDiv.current.style.display = "none";
          }}
        >
          <AiOutlineCloseCircle />
        </button>
        <img src={Illustration} alt="" className="w-96" />
        <h1 className="capitalize text-lg p-0 m-0">
          Manage your shops inventory.
        </h1>
      </div>
      <div className="w-full mb-5 flex justify-center items-center">
        <SearchAndFilter
          setItems={setItems}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      {isLoading && <Loader />}
      {items.map((item) => {
        return (
          <Item
            key={item._id}
            _id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            items={items}
            setItems={setItems}
          />
        );
      })}
      <div className="fixed z-10 bottom-4 right-4">
        <NewItemFAB
          onClick={() => {
            setNewItemModal(true);
            navigate("/new-item");
          }}
        />
      </div>
      {newItemModal && (
        <NewItem
          isOpen={newItemModal}
          handleClose={() => {
            setNewItemModal(false);
            navigate("/");
          }}
          items={items}
          setItems={setItems}
        />
      )}
    </div>
  );
}
