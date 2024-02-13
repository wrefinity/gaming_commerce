import mongoose, { Document, Schema, Model } from 'mongoose';
import CategoryModel from './category';

export interface IProduct extends Document {
  name: string;
  desc: string;
  status: boolean;
  brand: string;
  created_by: mongoose.Types.ObjectId;
  catId: mongoose.Types.ObjectId;
  price: number;
  state: 'active' | 'suspended' | 'out of stock';
  quantity: number;
  // images: any[];
  images: string;
}


// Create ProductSchema
const ProductSchema = new Schema<IProduct>({
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  catId: {
    type: mongoose.Schema.Types.ObjectId,
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
},
  { timestamps: true }
);

const ProductModel: Model<IProduct> = mongoose.model<IProduct>('Product', ProductSchema);
export default ProductModel;


export const createProduct = (values: Record<string, any>) =>
  new ProductModel(values).save().then(cat => cat.toObject());
export const getProduct = async () => await ProductModel.find({});
export const getProductLimit = async (limit: number, page: number) => {
  try {

    const products = await ProductModel.find({})
      .populate({
        path: 'catId',
        model: CategoryModel,
        select: 'name desc',
      })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit * 1);

    return products;
  } catch (error) {
    throw error;
  }
}
export const getProductById = async (id: string) => await ProductModel.findById(id);
export const updateProducts = async (id: string, values: Record<string, any>) => await ProductModel.findByIdAndUpdate(id, values, { new: true })
