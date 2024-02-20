"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const routeAuth_1 = __importDefault(require("../middlewares/routeAuth"));
const product_1 = __importDefault(require("../controller/product"));
router.post('/', routeAuth_1.default.deserialToken, product_1.default.createProduct);
router.get('/', product_1.default.getAllProducts);
router.get('/:product_id', product_1.default.getProductId);
router.patch('/:id', product_1.default.updateProduct);
exports.default = router;
//# sourceMappingURL=product.js.map