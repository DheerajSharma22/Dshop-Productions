import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./AdminCategories.module.css";
import {
  addCategory,
  removeCategory,
  updateCategory,
} from "../../../redux/Slice/AdminSlice/adminSlice";

const AdminCategories = () => {
  const { categories } = useSelector((state) => state.adminReducer);
  const [toggle, setToggle] = useState(false);
  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState();
  const [slug, setSlug] = useState("");
  const [updateCategoryName, setUpdateCategoryName] = useState();
  const dispatch = useDispatch();

  const addNewCategory = () => {
    dispatch(addCategory(category, slug));
    setCategory("");
    setSlug("");
  };

  const removeCategoryHandler = (id) => {
    dispatch(removeCategory(id));
  };

  const updateCategoryHandler = () => {
    dispatch(updateCategory(categoryId, category));
    setToggle(false);
    setCategory("");
  };

  return (
    <>
      <div className={styles.adminProductsWrapper}>
        <div className={styles.adminHeadWrapper}>
          <h3>Categories</h3>
          <div>
            <button onClick={() => setToggle(false)}>Create New</button>
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.innerProductWrapper}>
            {toggle ? (
              <>
                <h4 style={{fontSize: "1.8rem"}}>Update Categories</h4>
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    placeholder={updateCategoryName}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <button onClick={updateCategoryHandler}>Update</button>
                </div>
              </>
            ) : (
              <>
                <h4>Add Categories</h4>
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    placeholder="Category Name"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <label htmlFor="name">Slug</label>
                  <input
                    type="text"
                    placeholder="Slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                  />
                  <button onClick={addNewCategory}>Add</button>
                </div>
              </>
            )}
          </div>
          <div className={styles.innerProductWrapper}>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Delete</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((curElem, index) => {
                  return (
                    <tr key={index}>
                      <td>{curElem.name}</td>
                      <td>{curElem.createdAt}</td>
                      <td>
                        <i
                          className={`fa fa-trash ${styles.trash}`}
                          onClick={() => removeCategoryHandler(curElem._id)}
                        ></i>
                      </td>
                      <td>
                        <i
                          className={`fa fa-edit ${styles.edit}`}
                          onClick={() => {
                            setToggle(true);
                            setCategoryId(curElem._id);
                            setUpdateCategoryName(curElem.name);
                          }}
                        ></i>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCategories;
