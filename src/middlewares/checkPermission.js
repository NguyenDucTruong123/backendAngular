import jwt from "jsonwebtoken";
import User from "../models/user";


export const checkPermission = async (req, res, next) => {
  try {
   
    if (!req.headers.authorization) {
      throw new Error("Bạn phải đăng nhập để thực hiện hành động này");
    }

    
    const token = req.headers.authorization.split(" ")[1];

    
    const { _id } = jwt.verify(token, "123456");
    const user = await User.findById(_id);
    
    if (user.role != "admin") {
      throw new Error("Bạn không có quyền để thực hiện hành động này");
    }
  
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: error });
  }
};
