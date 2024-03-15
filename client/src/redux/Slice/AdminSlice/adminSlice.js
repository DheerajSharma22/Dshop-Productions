import { removeFromCartHandler } from "../cartSlice";

const { createSlice } = require("@reduxjs/toolkit");
const axios = require("axios");
const { setProduct, setProducts } = require("../productSlice");

const adminSlice = createSlice({
  name: "adminUsers",
  initialState: {
    users: [],
    orders: [],
    categories: [],
    // products: [],
  },
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    setOrders(state, action) {
      state.orders = action.payload;
    },
    setCategory(state, action) {
      state.categories = action.payload;
    },
  },
});

export const {
  setUsers,
  setOrders,
  setCategory,
} = adminSlice.actions;
export default adminSlice.reducer;

// User Functions
export function fetchUsers() {
  return async function fetchUsersThunk(dispatch, getState) {
    try {
      const res = await axios.get("/api/admin/users");
      const data = res.data.users;
      dispatch(setUsers(data));
    } catch (error) {
      setUsers([]);
    }
  };
}

// Order Functions
export function fetchOrders() {
  return async function fetchOrdersThunk(dispatch, getState) {
    try {
      const res = await axios.get("/api/admin/orders");
      const data = res.data.orders;
      dispatch(setOrders(data));
    } catch (error) {
      setUsers([]);
    }
  };
}

// Category Functions
export function fetchCategories() {
  return async function fetchOrdersThunk(dispatch, getState) {
    try {
      const res = await axios.get("/api/admin/categories");
      const data = res.data.categories;
      dispatch(setCategory(data));
    } catch (error) {
      setUsers([]);
    }
  };
}

export function addCategory(name, slug) {
  return async function addCategoryThunk(dispatch, getState) {
    try {
      const res = await axios.post("/api/admin/add_category", { name, slug });
      const data = res.data;
      dispatch(setCategory([...getState().adminReducer.categories, data]));
    } catch (error) {
      setUsers([]);
    }
  };
}

export function updateCategory(_id, name) {
  return async function updateCategoryThunk(dispatch, getState) {
    try {
      await fetch("/api/admin/update_category", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: _id,
          name: name,
        }),
      });
      dispatch(fetchCategories());
    } catch (error) {
      setUsers([]);
    }
  };
}

export function removeCategory(_id) {
  return async function removeCategoryThunk(dispatch, getState) {
    try {
      await fetch("/api/admin/remove_category", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: _id,
        }),
      });
      dispatch(fetchCategories());
    } catch (error) {
      setUsers([]);
    }
  };
}

// Product Function
export function addProducts(product) {
  return async function addProductsThunk(dispatch, getState) {
    try {
      const res = await axios.post("/api/admin/add_product", {
        name: product.name,
        brand: product.brand,
        category: product.category,
        price: product.price,
        description: product.description,
        image: product.image,
        countInStock: product.countInStock,
      });
      const data = res.data;
      dispatch(setProducts([...getState().productReducer.products, data]));
    } catch (error) {
      setUsers([]);
    }
  };
}

export function updateProducts(id, product) {
  return async function updateProductThunk(dispatch, getState) {
    try {
      await fetch("/api/admin/update_product", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          _id: id,
          name: product.name,
          brand: product.brand,
          category: product.category,
          price: product.price,
          description: product.description,
          image: product.image,
          countInStock: product.countInStock,
        }),
      });
      dispatch(setProduct());
    } catch (error) {
      setUsers([]);
    }
  };
}


export function removeProduct(_id) {
  return async function removeProductThunk(dispatch, getState) {
    try {
      await fetch("/api/admin/remove_product", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: _id,
        }),
      });
      dispatch(removeFromCartHandler(_id));
      dispatch(setProduct());
    } catch (error) {
      setUsers([]);
    }
  };
}