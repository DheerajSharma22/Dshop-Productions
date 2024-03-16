import React from "react";
import "./ProductScreen.css";
import FilterPanel from "./FilterPanel/FilterPanel";
import ListPanel from "./ListPanel/ListPanel";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const ProductComponent = () => {
  const {products}  = useSelector((state) => state.productReducer);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRating, setSelectedRating] = useState(5);
  const [selectedPrice, setSelectedPrice] = useState(5000);
  const [dataList, setDataList] = useState();


    const applyFilters = () => {
    let updatedItems = products;
    let updatedItems2 = null;

    if (selectedCategory) {
      updatedItems = updatedItems.filter((item) => {
        console.log(item);
        return item.category === selectedCategory;
      });
    }

    if (selectedPrice) {
      updatedItems2 = updatedItems.filter((item) => {
        return item.price <= selectedPrice;
      });
    }

    if (selectedRating) {
      updatedItems2 = updatedItems2.filter((item) => {
        return item.rating <= selectedRating;
      });
    }

    updatedItems = updatedItems2;

    // console.log(updatedItems);
    if (updatedItems.length === 0) {
      setDataList(null);
      return;
    }

    setDataList(updatedItems);
  };

  

  useEffect(() => {
    if (products.length > 0) {
      applyFilters();
    }
  }, [selectedPrice, selectedCategory, selectedRating]);

   return (
    <>
      <div className="FilterAndListPanelWrapper">
        <FilterPanel
          price={selectedPrice}
          ratings={selectedRating}
          category={selectedCategory}
          setCategory={setSelectedCategory}
          setPrice={setSelectedPrice}
          setRatings={setSelectedRating}
        />
        <ListPanel products={dataList} />
      </div>
    </>
  );
};

export default ProductComponent;
