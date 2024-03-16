import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../redux/Slice/AdminSlice/adminSlice";
import styles from "./FilterPanel.module.css";
import Loading from '../../../Components/LoadingComponent/Loading';

const FilterPanel = ({
  ratings,
  setRatings,
  price,
  setPrice,
  category,
  setCategory,
}) => {
  const { categories } = useSelector((state) => state.adminReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const clearAllHandler = () => {
    setPrice(5000);
    setCategory("");
    setRatings(5);
  };

  if (categories.legth <= 0) {
    return <Loading />;
  }

  return (
    <div className={styles.filterWrapper}>
      <div className={styles.priceFilterWrapper}>
        <h3 className={styles.label}>Price</h3>
        <span>₹{price}</span>
        <input
          type="range"
          min="100"
          max="5000"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className={styles.categoryWrapper}>
        <h3 className={styles.label}>Category</h3>
        <ul>
          {categories.map((curElem, index) => {
            return (
              <>
                <li
                  key={index}
                  className={category === curElem.slug ? "activeCategory" : ""}
                  onClick={() => setCategory(curElem.slug)}
                >
                  {curElem.name}
                </li>
              </>
            );
          })}
        </ul>
      </div>
      <div className={styles.ratingWrapper}>
        <h3 className={styles.label}>Ratings</h3>
        <span>{ratings}</span>
        <input
          type="range"
          min="1"
          max="5"
          value={ratings}
          onChange={(e) => setRatings(e.target.value)}
        />
      </div>
      <div>
        <button className={styles.clearAllButton} onClick={clearAllHandler}>
          Clear All
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
