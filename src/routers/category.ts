import express from "express";
const router = express.Router();
import AuthenticateUser from "../middlewares/routeAuth"
import  CategoryController from "../controller/category";


// create an categories routes
router.post("/", AuthenticateUser.deserialToken, CategoryController.createCategories);
router.get('/', CategoryController.getCategories);
router.put("/:id", CategoryController.updateCategories);
router.delete("/:id", AuthenticateUser.deserialToken, CategoryController.deleteCategry);

export default router;