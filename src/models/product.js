import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minLength: 3,
  },
  price: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  categoryId: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
  },
  img: {type:String},
  imgs: {type:Array},
  type: {type:String},
  sex: {type:String},
},{
  timestamps: true,
  versionKey: false,
});

// const productSchema = new Schema({ name: String, price: Number });
export default mongoose.model("Product", productSchema);
