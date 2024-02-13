import express from "express"
const router = express.Router()
import AuthenticateUser from "../middlewares/routeAuth"
import ProductController from "../controller/product"

router.post('/', AuthenticateUser.deserialToken, ProductController.createProduct);
router.get('/', ProductController.getAllProducts);
router.get('/:product_id', ProductController.getProductId);
router.patch('/:id', ProductController.updateProduct);


export default router