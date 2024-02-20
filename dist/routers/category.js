"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const routeAuth_1 = __importDefault(require("../middlewares/routeAuth"));
const category_1 = __importDefault(require("../controller/category"));
// create an categories routes
router.post("/", routeAuth_1.default.deserialToken, category_1.default.createCategories);
router.get('/', category_1.default.getCategories);
router.put("/:id", category_1.default.updateCategories);
router.delete("/:id", routeAuth_1.default.deserialToken, category_1.default.deleteCategry);
exports.default = router;
//# sourceMappingURL=category.js.map