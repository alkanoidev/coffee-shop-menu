import React, { useEffect, useState } from "react";
import Item from "../components/Item";
import Layout from "../components/Layout";
import axios from "axios";
import NewItemFAB from "../components/Buttons/NewItemFAB";
import Loader from "../components/Loader/Loader";
import SearchAndFilter from "../components/SearchAndFilter/SearchAndFilter";
import NewItem from "../components/NewItem";

export default function Items() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newItemModal, setNewItemModal] = useState(false);

  const getItems = async () => {
    await axios.get("http://localhost:3001/items").then((res) => {
      setItems(res.data.itemList);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <Layout>
      <div className="flex justify-center p-2 sm:p-2 sm:justify-center flex-wrap w-full gap-2">
        <div className="w-full my-5 flex justify-center items-center">
          <SearchAndFilter />
        </div>
        {isLoading && <Loader />}
        {items.map((item) => (
          <Item
            key={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
          />
        ))}
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
          />
        )}
      </div>
    </Layout>
  );
}
