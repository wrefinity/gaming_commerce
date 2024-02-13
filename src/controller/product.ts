import { Request, Response } from "express";
import { createProduct, getProduct, getProductLimit, getProductById, IProduct, updateProducts } from "../models/product";
import AuthenticatedRequest from "../utils/extended"
import { ProductValidation } from "../validations/productValidations";



class ProductController {
    createProduct = async (req: AuthenticatedRequest, res: Response) => {
        const { error } = ProductValidation(req.body);
        console.log(error)
        const created_by = req.user;
        if (error) {
            return res.status(400).json({
                status: false,
                message: error.details[0].message.toUpperCase(),
            });
        }
        try {
            const newProduct = await createProduct({
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
        } catch (e) {
            return res.status(500).json({
                status: false,
                message: "An error occurred while creating the product: ",
            });
        }
    }


    updateProduct = async (req: AuthenticatedRequest, res: Response) => {
        //  get product by id
        const productId = req.params.productId;
        const updateData = req.body;
        const product: IProduct | null = await getProductById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        if (updateData) {
            return res.status(400).json({
                status: false,
                message: "supply the product information to be updated",
            });
        }
        const updatedProduct: IProduct | null = await updateProducts(product._id, updateData);

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


    getProductId = async (req: AuthenticatedRequest, res: Response) => {
        const product = await getProductById(
            req.params.product_id
        );

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

    getAllProducts = async (req: AuthenticatedRequest, res: Response) => {

        const limit = parseInt(req.query.limit as string) || 10;
        const page = parseInt(req.query.page as string) || 1;
        
        try {
            
            const products = await getProductLimit(limit, page);
            if (!products || products.length === 0) {
                return res.status(404).json({ message: 'No products found' });
            }
            return res.status(200).json({ data: products, message: 'Successfully fetched products' });
        } catch (error) {
            return res.status(500).json({ message: 'An error occurred', error });
        }
    };

}

export default new ProductController();