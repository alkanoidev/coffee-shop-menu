import React, { useEffect, useState } from "react";
import Item from "../components/Item";
import Layout from "../components/Layout";
import axios from "axios";

export default function Items() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      await axios.get("http://localhost:3001/items").then((res) => {
        setItems(res.data.item_list);
      });
    };
    getItems();
  }, []);

  return (
    <Layout>
      <div className="flex justify-center p-0 sm:p-2 sm:justify-start flex-wrap w-full gap-2">
        {items.map((item) => (
          <Item
            key={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
          />
        ))}
      </div>
    </Layout>
  );
}
