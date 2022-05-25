import React, { useCallback, useEffect, useRef, useState } from "react";
import Item from "../components/Item/Item";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import NewItemFAB from "../components/Buttons/NewItemFAB";
import Loader from "../components/Loader/Loader";
import SearchAndFilter from "../components/SearchAndFilter/SearchAndFilter";
import NewItem from "../components/NewItemModal/NewItemModal";
import Illustration from "./illustration.png";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function Items() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newItemModal, setNewItemModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const illustrationDiv = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  let delay = 0;

  const getItems = async () => {
    if (selectedCategory === "All Categories") {
      await axios.get(`http://localhost:3001/items/`).then((res) => {  // get all items
        setItems(res.data.itemList);
        setIsLoading(false);
      });
    } else {
      await axios // get Items by category
        .get(`http://localhost:3001/items/category/${selectedCategory}`)
        .then((res) => {
          setItems(res.data.itemList);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getItemsMemoized = useCallback(getItems, [selectedCategory, items]);

  const getCategories = async () => {
    await axios
      .get("http://localhost:3001/categories/")
      .then((res) => {
        const temp = res.data.categoryList.map((item) => ({
          title: item.name,
        }));
        setCategories([{ title: "All Categories" }, ...temp]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getItems();
    getCategories();
  }, []);

  useEffect(() => {
    getItemsMemoized();
  }, [selectedCategory, items]);

  return (
    <Layout>
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
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        {isLoading && <Loader />}
        {items.map((item) => {
          delay += 0.1;
          return (
            <Item
              key={item._id}
              _id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              items={items}
              setItems={setItems}
              delay={delay}
            />
          );
        })}
        <div className="fixed z-10 bottom-4 right-4">
          <NewItemFAB
            path="/"
            onClick={() => {
              setNewItemModal(true);
            }}
          />
        </div>
        {newItemModal && (
          <NewItem
            isOpen={newItemModal}
            handleClose={() => {
              setNewItemModal(false);
            }}
            items={items}
            setItems={setItems}
          />
        )}
      </div>
    </Layout>
  );
}
