import React, { useEffect, useState } from "react";
import Item from "../components/Item";
import Layout from "../components/Layout";
import axios from "axios";
import NewItemFAB from "../components/Buttons/NewItemFAB";
import Loader from "../components/Loader/Loader";

export default function Items() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      <div className="flex justify-center p-0 sm:p-2 sm:justify-start flex-wrap w-full gap-2">
        {isLoading && <Loader />}
        {items.map((item) => (
          <Item
            key={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
          />
        ))}
        <div className="absolute bottom-4 right-4 z-10">
          <NewItemFAB path="/newitem" />
        </div>
      </div>
    </Layout>
  );
}
