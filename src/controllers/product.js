import Joi from "joi";
import Product from "../models/product.js";
import { v2 as cloudinary } from "cloudinary";

const productSchema = Joi.object({
  name: Joi.string().required().min(6),
  price: Joi.number().required(),
  description: Joi.string(),
  categoryId: Joi.string().required(),
  imgs: Joi.array().required(),
  type: Joi.string().required(),
  sex: Joi.string().required(),
});

// const upload = multer({
//   storage: storage,
// }).single('product')

// export const upimg = async function (req, res ){
//     const pathing = 'src/img';
// }

export const getAll = async (req, res) => {
  try {
    // const { data: products } = await axios.get(`${API_URI}/products`);
    const products = await Product.find().populate("categoryId");
    if (products.length === 0) {
      return res.json({
        message: "Không có sản phẩm nào",
      });
    }
    return res.json(products);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const get = async function (req, res) {
  try {
    // const { data: product } = await axios.get(`${API_URI}/products/${req.params.id}`);
    const product = await Product.findById(req.params.id).populate("categoryId");
    // const product = await Product.findOne({ _id: req.params.id });

    if (!product) {
      return res.json({
        message: "Không có sản phẩm nào",
      });
    }
    return res.json(product);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const create = async (req, res) => {
  // const { name, price, description, image, categoryId } = req.body;
  // console.log(req.body);
  // console.log(req.files);
  const data = req.body
  const files = req.files;
  const imgs = files.map((item) => item.path);
  // console.log(files);
  const fileData = { ...req.body, imgs: imgs };
  console.log(fileData);
  try {
    let { error } = productSchema.validate(fileData);
    if (error) {
      if (files) {
        const names = files.map((item) => item.filename);
        cloudinary.api.delete_resources(names);
      }
      return res.status(400).send({ message: error.message });
    }
    const { name} = data;

    const product = await Product.findOne({ name });
    if (product) {
      return res.status(400).send({ message: "Product is exists" });
    }
    const dataUpload = {
      ...fileData,
      img: imgs[0],
      imgs: imgs,
    };

    const item = await Product.create(dataUpload);
    console.log(item.name);
    // await Categories.findByIdAndUpdate(item.categoryId, {
    //   $addToSet: {
    //     products: item._id,
    //   },
    // });
   
    if (!item) {
      return res.json({
        message: "Thêm sản phẩm không thành công!",
      });
    }
    return res.json({
      message: "Thêm sản phẩm thành công",
      data: dataUpload,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const updatePatch = async function (req, res) {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    // const { data: product } = await axios.post(`${API_URI}/products`, req.body);
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.json({
        message: "Cập nhật sản phẩm không thành công",
      });
    }
    return res.json({
      message: "Cập nhật sản phẩm thành công",
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
// export const updatePatch = async function (req, res) {
//   try {
//     const { error } = productSchema.validate(req.body);
//     if (error) {
//       return res.status(400).json({
//         message: error.details[0].message,
//         datas: [],
//       });
//     }
//     const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!product) {
//       return res.status(400).json({
//         message: "Cập nhật sản phẩm không thành công",
//         datas: [],
//       });
//     }
//     return res.status(200).json({
//       message: "Cập nhật sản phẩm thành công",
//       datas: [product],
//     });
//   } catch (error) {
//     return res.status(400).json({
//       message: error,
//       datas: [],
//     });
//   }
// };
export const remove = async function (req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    return res.json({
      message: "Xóa sản phẩm thành công",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
