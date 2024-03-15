import React, { useEffect, useState } from "react";
import Footer from "../Components/common/Footer";
import { useParams } from "react-router-dom";
import {
  getAllCategories,
  getCatalogPageData,
} from "../Services/operations/categoryApi";
import COURSE_CARD from "../Components/core/Catalog/Course_Card";
import CourseSlider from "../Components/core/Catalog/CourseSlider";

const Catalog = () => {
  const { catalogName } = useParams();
  const [categoryId, setCategoryId] = useState("");
  const [catalogData, setCatalogData] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getAllCategories();

      const category_id = res.filter(
        (cat) =>
          cat.name.split(" ").join("-").toLowerCase() === catalogName
      )[0]?._id;
      setCategoryId(category_id);
    };

    fetchCategories();
  }, [catalogName]);

  useEffect(() => {
    const fetchCategoryPageDetails = async () => {
      const res = await getCatalogPageData(categoryId);
      setCatalogData(res);
    };

    if (categoryId) {
      fetchCategoryPageDetails();
    }
  }, [categoryId]);

  return (
    <>
      <div className="text-white">
        <div className="bg-richblack-800 w-full py-16">
          <div className="flex flex-col gap-y-3 w-11/12 max-w-maxContent mx-auto">
            <p className="text-richblack-300 text-sm">
              {`Home/Catalog/`}
              <span className="text-yellow-50">
                {catalogData?.selectedCategory?.name}
              </span>
            </p>
            <p className="text-3xl">{catalogData?.selectedCategory?.name}</p>
            <p className="text-md text-richblack-300">
              {catalogData?.selectedCategory?.description}
            </p>
          </div>
        </div>

        <div className="max-w-maxContent w-11/12 mx-auto my-10 flex flex-col gap-[7rem]">
          {/* Section 1 */}
          <div>
            <h3 className="text-3xl font-bold mb-5">
              Courses to get you started
            </h3>
            <div className="flex gap-x-4 border-b border-richblack-300 pb-3">
              <p>Most Popular</p>
              <p>New</p>
            </div>
            <div className="mt-5">
              <CourseSlider courses={catalogData?.selectedCategory?.courses} />
            </div>
          </div>

          {/* Section 2 */}
          <div>
            <h3 className="text-3xl font-bold mb-5">
              Top Courses in {catalogData?.differentCategory?.name}
            </h3>
            <div>
              <CourseSlider courses={catalogData?.differentCategory?.courses} />
            </div>
          </div>

          {/* Section 3 */}
          <div>
            <p className="text-3xl font-bold mb-5">Frenquently Bought</p>
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {catalogData?.mostSellingCourses?.slice(0, 4)?.map((course) => (
                  <COURSE_CARD
                    course={course}
                    key={course?._id}
                    height={"400px"}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Catalog;
