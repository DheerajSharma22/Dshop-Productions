const Category = require("../Models/Category");
const Course = require("../Models/Course");

const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Validate
        if (!name || !description) return res.status(400).json({
            success: false,
            message: "Please fill all the fields...",
        })

        // Check if tag is already exists with this tag name.
        const categoryExists = await Category.findOne({ name });
        if (categoryExists) return res.status(400).json({
            success: false,
            message: "Category with this name is already exists",
        });

        // Create a new tag entry in db.
        const createdCategory = await Category.create({
            name,
            description,
        });

        return res.status(200).json({
            success: true,
            message: "Category is created successfully",
            createdCategory
        })
    } catch (error) {
        return res.status(500).json({
            success: true,
            message: "Something went wrong while creating a category.",
            error
        })
    }
};

const getAllCategories = async (req, res) => {
    try {
        const allCategories = await Category.find({}, { name: 1, description: 1 });

        return res.status(200).json({
            success: true,
            allCategories,
            message: "Categories received successfully.",
        })
    } catch (error) {
        return res.status(500).json({
            success: true,
            message: "Something went wrong while fetching categories.",
            error
        })
    }
}

const getCategoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body;

        if (!categoryId) return res.status(400).json({
            success: false,
            message: "Category Id Not Recieved...",
        })

        // Get courses for the specified category
        const selectedCategory = await Category.findOne({ _id: categoryId })
            .populate({
                path: "courses",
                match: { status: "PUBLISHED" },
                populate: [
                    {
                        path: "ratingAndReviews",
                    },
                    {
                        path: "instructor"
                    }
                ]
            });


        // Handle the case when the category is not found
        if (!selectedCategory) {
            return res
                .status(404)
                .json({ success: false, message: "Category not found" })
        }

        // Handle the case when there are no courses
        if (selectedCategory.courses && selectedCategory.courses.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No courses found for the selected category.",
            })
        }

        // console.log("SelectedCategory :- ", selectedCategory);

        // Get courses for other categories
        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId },
        });


        const randomCategoryIndex = Math.floor(Math.random() * categoriesExceptSelected?.length);
        // console.log("Random Index", randomCategoryIndex);
        let differentCategory = await Category.findOne(
            categoriesExceptSelected[randomCategoryIndex]._id
        ).populate({
            path: "courses",
            populate: [
                {
                    path: "ratingAndReviews",
                },
                {
                    path: "instructor"
                }
            ],
            match: { status: "PUBLISHED" },
        }).exec();

        // console.log("Different COURSE", differentCategory)

        // Get top-selling courses across all categories
        const allCategories = await Category.find()
            .populate({
                path: "courses",
                match: { status: "PUBLISHED" },
                populate: [
                    {
                        path: "ratingAndReviews",
                    },
                    {
                        path: "instructor"
                    }
                ]
            }).exec();

        // console.log("allCategories", allCategories);

        const allCourses = allCategories.flatMap((category) => category.courses);
        const mostSellingCourses = allCourses
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10);


        // console.log("mostSellingCourses COURSE", mostSellingCourses)
        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategory,
                mostSellingCourses,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error?.message
        });
    }
}

module.exports = { createCategory, getAllCategories, getCategoryPageDetails };