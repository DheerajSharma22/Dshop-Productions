import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Loading from "../Components/LoadingComponent/Loading";
import Product from "../Components/Products/Product";



const HomeScreen = () => {
  const location = useLocation();
  const { loading } = useSelector((state) => state.productReducer);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {location.state ? alert(location.state) : ""}
      <Product />
    </>
  );
};

export default HomeScreen;
