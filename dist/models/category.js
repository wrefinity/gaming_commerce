"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategory = exports.deleteCategory = exports.getCategory = exports.createCategory = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const Category = new Schema({
    name: { type: String },
    desc: { type: String },
    isDeleted: { type: Boolean, default: false },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });
const CategoryModel = mongoose_1.default.model("Category", Category);
exports.default = CategoryModel;
const createCategory = (values) => new CategoryModel(values).save().then(cat => cat.toObject());
exports.createCategory = createCategory;
const getCategory = async () => await CategoryModel.find({});
exports.getCategory = getCategory;
const deleteCategory = async (id) => await CategoryModel.findByIdAndDelete(id);
exports.deleteCategory = deleteCategory;
const updateCategory = async (id, values) => await CategoryModel.findByIdAndUpdate(id, values, { new: true });
exports.updateCategory = updateCategory;
//# sourceMappingURL=category.js.map