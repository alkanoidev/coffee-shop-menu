import Category from "../../components/Category";
import Layout from "../../components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import NewItemFAB from "../../components/Buttons/NewItemFAB";
import Loader from "../../components/Loader/Loader";
import NewCategoryModal from "../../components/NewCategory/NewCategoryModal";

export default function Categories() {
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      await axios
        .get("http://localhost:3001/categories/")
        .then((res) => {
          setCategoryList(res.data.categoryList);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    getCategories();
  }, []);

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="sm:w-2/3 w-full flex flex-wrap justify-center items-start gap-4 sm:gap-5 pt-3">
          {isLoading && <Loader />}
          {categoryList.map((category) => (
            <Category
              key={category._id}
              categoryName={category.name}
              icon={`${category.name}.png`}
            />
          ))}
          <div className="absolute bottom-4 right-4 z-10">
            <NewItemFAB
              onClick={() => {
                setIsOpen(true);
              }}
            />
          </div>
        </div>
      </div>
      {isOpen && (
        <NewCategoryModal
          isOpen={isOpen}
          handleClose={() => {
            setIsOpen(false);
          }}
        />
      )}
    </Layout>
  );
}
