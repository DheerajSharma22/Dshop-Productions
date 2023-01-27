const { createSlice } = require("@reduxjs/toolkit");

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: true,
    productId: undefined,
    products: [],
    productDetails: undefined,
    productDetailsLoading: true,
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setProductDetailsLoading(state, action) {
      state.productDetailsLoading = action.payload;
    },
    setProductDetails(state, action) {
      state.productDetails = action.payload;
    },
    setProductId(state, action) {
      state.productId = action.payload;
    },
  },
});

export const {
  setProducts,
  setLoading,
  setProductDetails,
  setProductId,
  setProductDetailsLoading
} = productSlice.actions;
export default productSlice.reducer;

export function setProduct() {
  return async function setProductThunk(dispatch, getState) {
    dispatch(setLoading(true));
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      dispatch(setProducts(data));
      dispatch(setLoading(false));
      localStorage.setItem("products", JSON.stringify(data));
    } catch (error) {
      dispatch(setLoading(false));
    }
  };
}


export function getProductDetails() {
  return async function getProductDetailsThunk(dispatch, getState) {
    dispatch(setProductDetailsLoading(true));
    const productId = getState().productReducer.productId.split(":")[1];
    try {
      const res = await fetch(`/api/products/${productId}`);
      const data = await res.json();
      dispatch(setProductDetails(data));
      dispatch(setProductDetailsLoading(false));
    } catch (error) {
      console.log(error);
    }
  };
}
