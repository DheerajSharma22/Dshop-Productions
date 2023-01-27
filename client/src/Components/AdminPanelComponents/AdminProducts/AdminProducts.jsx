import React from "react";
import OrderCard from "../OrderCard/OrderCard";
import UserCard from "../UserCard/UserCard";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./AdminProducts.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Loading from '../../LoadingComponent/Loading';

const AdminProducts = ({ components }) => {
  const { products } = useSelector((state) => state.productReducer);
  const { users } = useSelector((state) => state.adminReducer);
  const [search, setSearch] = useState("");
  const [dataList, setDataList] = useState();
  const [userDataList, setUserDataList] = useState();

  useEffect(() => {
    // if (products) {
    setDataList(products);
    // }else {
    setUserDataList(users);
    // }
  }, [products, users]);

  const searchHandler = (e, type) => {
    setSearch(e.target.value.toLowerCase());
    let updatedItems;
    if (type === "products") {
      updatedItems = products;
    } else {
      updatedItems = users;
    }
    updatedItems = updatedItems.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    console.log(updatedItems);
    if (type === "products") {
      setDataList(updatedItems);
    } else {
      setUserDataList(updatedItems);
    }
  };

  if (!products || !users) {
    return <Loading />;
  }

  return (
    <div className={styles.adminProductsWrapper}>
      <div className={styles.adminHeadWrapper}>
        <h3>
          {components === "user"
            ? "Users"
            : components === "product"
            ? "Products"
            : "Orders"}
        </h3>
        <div>
          {components === "product" ? (
            <Link to="/admin/addproduct">
              <button>Create New</button>
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={styles.innerProductWrapper}>
        <div className={styles.innerHeadWrapper}>
          <input
            type="text"
            placeholder="search"
            value={search}
            onChange={(e) =>
              components === "product"
                ? searchHandler(e, "products")
                : components === "user"
                ? searchHandler(e, "user")
                : ""
            }
          />
          <select name="category" id="category">
            <option>All Category</option>
          </select>
        </div>
        {components === "order" ? (
          <OrderCard />
        ) : (
          <div className={styles.innerContentWrapper}>
            {components === "user" ? (
              <>
                {userDataList
                  ? userDataList.map((curElem, index) => {
                      return <UserCard user={curElem} key={index} />;
                    })
                  : ""}
              </>
            ) : components === "product" ? (
              <>
                {dataList
                  ? dataList.map((curElem, index) => {
                      return <ProductCard product={curElem} key={index} />;
                    })
                  : ""}
              </>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
