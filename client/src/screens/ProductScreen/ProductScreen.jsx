import React from 'react'
import { useSelector } from 'react-redux';
import './ProductScreen.css';
import ProductComponent from './ProductComponent';
import Loading from '../../Components/LoadingComponent/Loading';

const ProductScreen = () => {
  const { loading } = useSelector((state) => state.productReducer);

  if (loading ) {
    return <Loading />;
  }
  return (
    <div>
      <ProductComponent />
    </div>
  )
}

export default ProductScreen
