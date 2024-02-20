"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//importing field validations
const categoryValidation_1 = require("../validations/categoryValidation");
const category_1 = require("../models/category");
class CategoryController {
    createCategories = async (req, res) => {
        try {
            // data validations
            const createdBy = req.user;
            const { error } = (0, categoryValidation_1.categoryValidation)(req.body);
            console.log(error);
            if (error)
                return res.status(400).json({
                    error: true,
                    message: error.details[0].message,
                });
            const category = await (0, category_1.createCategory)({ ...req.body, createdBy });
            if (!category)
                return res.status(500).json({
                    status: false,
                    message: 'Something went wrong while creating user',
                });
            return res.status(200).json({
                error: false,
                message: "category created",
                data: category
            });
        }
        catch (err) {
            return res.status(500).json({
                error: true,
                message: err
            });
        }
    };
    updateCategories = async (req, res) => {
        try {
            // data validations
            const updatedBy = req.user;
            const { id } = req.params;
            // checking id and updateBy
            if (!(id && updatedBy))
                return res.status(400).json({ error: true, message: "please supply category id" });
            // error checks for the input fields
            const { error } = (0, categoryValidation_1.categoryValidation)(req.body);
            if (error)
                return res.status(400).json({
                    error: true,
                    message: error.details[0].message,
                });
            // calling the update category function
            const updatedCategory = await (0, category_1.updateCategory)(id.toString(), { ...req.body, updatedBy });
            if (!updatedCategory)
                return res.status(500).json({
                    status: false,
                    message: 'Something went wrong while updating category',
                });
            return res.status(200).json({
                error: false,
                message: "category updated",
                data: updatedCategory
            });
        }
        catch (err) {
            return res.status(500).json({
                error: true,
                message: err
            });
        }
    };
    // delete category 
    deleteCategry = async (req, res) => {
        const { id } = req.params;
        try {
            if (!id)
                return res.status(400).json({ error: true, message: "please supply category id" });
            const deleted = (0, category_1.deleteCategory)(id);
            if (!deleted)
                return res.status(400).json({
                    error: true,
                    message: "category not deleted"
                });
            // return the user information 
            return res.status(200).json({
                error: false,
                message: "user's profile deleted",
                data: id
            });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({
                error: true,
                message: err
            });
        }
    };
    // getting all categories
    getCategories = async (req, res) => {
        const data = await (0, category_1.getCategory)();
        return res.status(200).json(data);
    };
}
exports.default = new CategoryController();
//# sourceMappingURL=category.js.map