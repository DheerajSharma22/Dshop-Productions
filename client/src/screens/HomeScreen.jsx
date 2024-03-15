import React from "react";
import { useSelector } from "react-redux";
import Loading from "../Components/LoadingComponent/Loading";
import Product from "../Components/Products/Product";



const HomeScreen = () => {
  const { loading } = useSelector((state) => state.productReducer);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Product />
    </>
  );
};

export default HomeScreen;
