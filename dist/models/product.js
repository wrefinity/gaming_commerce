"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProducts = exports.getProductById = exports.getProductLimit = exports.getProduct = exports.createProduct = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const category_1 = __importDefault(require("./category"));
// Create ProductSchema
const ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    brand: {
        type: String,
        required: true
    },
    created_by: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    },
    catId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Category'
    },
    price: Number,
    state: { type: String, default: "active", enum: ["active", "suspended", "out of stock"] },
    quantity: {
        type: Number,
        default: 0
    },
    images: {
        type: String,
    },
}, { timestamps: true });
const ProductModel = mongoose_1.default.model('Product', ProductSchema);
exports.default = ProductModel;
const createProduct = (values) => new ProductModel(values).save().then(cat => cat.toObject());
exports.createProduct = createProduct;
const getProduct = async () => await ProductModel.find({});
exports.getProduct = getProduct;
const getProductLimit = async (limit, page) => {
    try {
        const products = await ProductModel.find({})
            .populate({
            path: 'catId',
            model: category_1.default,
            select: 'name desc',
        })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit * 1);
        return products;
    }
    catch (error) {
        throw error;
    }
};
exports.getProductLimit = getProductLimit;
const getProductById = async (id) => await ProductModel.findById(id);
exports.getProductById = getProductById;
const updateProducts = async (id, values) => await ProductModel.findByIdAndUpdate(id, values, { new: true });
exports.updateProducts = updateProducts;
//# sourceMappingURL=product.js.map