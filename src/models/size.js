import mongoose from "mongoose";
const sizeSchema = new mongoose.Schema({
    name: String,
    productsize:{
        type: mongoose.Types.ObjectId,
        ref: "Product"
    }
  });
  
  export default mongoose.model("size", sizeSchema);