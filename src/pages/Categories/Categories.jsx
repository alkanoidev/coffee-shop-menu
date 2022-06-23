import Category from "../../components/Category/Category";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import NewItemFAB from "../../components/Buttons/NewItemFAB";
import Loader from "../../components/Loader/Loader";
import NewCategoryModal from "../../components/NewCategory/NewCategoryModal";
import CategoryDetailsModal from "../../components/CategoryDetailsModal/CategoryDetailsModal";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const [categoryList, setCategoryList] = useState([]);
  const { current: categoriesRef } = useRef(categoryList);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCategoryDetails, setIsOpenCategoryDetails] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:3001/categories/")
      .then((res) => {
        setCategoryList(res.data.categoryList);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [categoriesRef]);

  return (
    <>
      <div className="flex justify-center">
        <div className="sm:w-2/3 w-full flex flex-wrap justify-center items-start gap-4 sm:gap-5 pt-3">
          {isLoading && <Loader />}
          {categoryList.map((category) => (
            <Category
              key={category._id}
              categoryName={category.name}
              onClick={() => {
                setIsOpenCategoryDetails(true);
                navigate(`/categories/${category.name}`);
                setCurrentCategory(category);
              }}
            />
          ))}
          <div className="absolute bottom-4 right-4 z-10">
            <NewItemFAB
              onClick={() => {
                setIsOpen(true);
                navigate("/categories/new");
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
            navigate("/categories");
          }}
          categoryList={categoryList}
          setCategoryList={setCategoryList}
        />
      )}

      {isOpenCategoryDetails && (
        <CategoryDetailsModal
          isOpen={isOpenCategoryDetails}
          currentCategory={currentCategory}
          handleClose={() => {
            setIsOpenCategoryDetails(false);
            navigate("/categories");
          }}
          categoryList={categoryList}
          setCategoryList={setCategoryList}
        />
      )}
    </>
  );
}
