import mongoose, { Document } from "mongoose"
const Schema = mongoose.Schema

export interface ICategory extends Document{
    name: string,
    desc: string,
    createdBy: object,
    updatedBy: object,
    isDeleted:boolean
}

const Category = new Schema<ICategory>({
    name: {type: String},
    desc: {type: String},
    isDeleted:{type:Boolean, default:false},
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
{timestamps: true}
)

const CategoryModel = mongoose.model<ICategory>("Category", Category);
export default CategoryModel;
export const createCategory =(values: Record<string, any>) =>
  new CategoryModel(values).save().then(cat => cat.toObject());
export const getCategory = async () => await CategoryModel.find({ });
export const deleteCategory =async (id:string) => await CategoryModel.findByIdAndDelete(id);
export const updateCategory = async(id:string, values: Record<string, any>) => await CategoryModel.findByIdAndUpdate(id, values, { new: true })
