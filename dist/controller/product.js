"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const productValidations_1 = require("../validations/productValidations");
class ProductController {
    createProduct = async (req, res) => {
        const { error } = (0, productValidations_1.ProductValidation)(req.body);
        console.log(error);
        const created_by = req.user;
        if (error) {
            return res.status(400).json({
                status: false,
                message: error.details[0].message.toUpperCase(),
            });
        }
        try {
            const newProduct = await (0, product_1.createProduct)({
                ...req.body,
                created_by
            });
            if (!newProduct) {
                return res.status(500).json({
                    status: false,
                    message: "Something went wrong while creating the product",
                });
            }
            return res.status(200).json({
                status: true,
                message: "Product created successfully",
                data: newProduct,
            });
        }
        catch (e) {
            return res.status(500).json({
                status: false,
                message: "An error occurred while creating the product: ",
            });
        }
    };
    updateProduct = async (req, res) => {
        //  get product by id
        const productId = req.params.productId;
        const updateData = req.body;
        const product = await (0, product_1.getProductById)(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        if (updateData) {
            return res.status(400).json({
                status: false,
                message: "supply the product information to be updated",
            });
        }
        const updatedProduct = await (0, product_1.updateProducts)(product._id, updateData);
        if (!updatedProduct) {
            return res.status(500).json({
                status: false,
                message: "Something went wrong while updating the product",
            });
        }
        return res.status(200).json({
            status: true,
            message: "Product updated successfully",
            data: updatedProduct,
        });
    };
    getProductId = async (req, res) => {
        const product = await (0, product_1.getProductById)(req.params.product_id);
        if (!product) {
            return res.status(404).json({
                status: false,
                message: "Product not found",
            });
        }
        return res.status(200).json({
            status: true,
            message: "Product retrieved successfully",
            data: product,
        });
    };
    getAllProducts = async (req, res) => {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        try {
            const products = await (0, product_1.getProductLimit)(limit, page);
            if (!products || products.length === 0) {
                return res.status(404).json({ message: 'No products found' });
            }
            return res.status(200).json({ data: products, message: 'Successfully fetched products' });
        }
        catch (error) {
            return res.status(500).json({ message: 'An error occurred', error });
        }
    };
}
exports.default = new ProductController();
//# sourceMappingURL=product.js.map