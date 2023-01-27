const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    productId: undefined,
    products: JSON.parse(localStorage.getItem("cartItems"))
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existItem = state.products.find(
        (x) => x.product_id === item.product_id
      );

      if (existItem) {
        return {
          ...state,
          products: state.products.map((x) =>
            x.product_id === existItem.product_id ? item : x
          ),
        };
      } else {
        state.products.push(action.payload);
      }
    },
    removeFromCart(state, action) {
      const newProduct = state.products.filter(
        (curElem) => curElem.product_id !== action.payload
      );
      console.log(newProduct);
      return {
        ...state,
        products: newProduct,
      };
    },
    clearCart (state, action) {
      state.products = [];
    }
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export function removeFromCartHandler(productId) {
  return function removeFromCartHandlerThunk(dispatch, getState) {
    // console.log(productId);
    dispatch(removeFromCart(productId));
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cartReducer.products)
    );
  };
}

export function addToCartHandler(productId, qty) {
  return async function addToCartHandlerThunk(dispatch, getState) {
    try {
      const res = await fetch(`/api/products/${productId}`);
      const data = await res.json();
      const product = {
        product_id: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        description: data.description,
        qty,
      };
      dispatch(addToCart(product));
      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cartReducer.products)
      );
    } catch (error) {
      console.log(error);
    }
  };
}
