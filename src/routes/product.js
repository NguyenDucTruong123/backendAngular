import express from "express";
import multer from "multer";
import uploadCloud from '../middlewares/upload';
import {
  create,
  get,
  getAll,
  remove,
  updatePatch,
} from "../controllers/product.js";

const router = express.Router();

const upload = multer({dest:'src/img'});

router.get("/products", getAll);
router.get("/products/:id", get);
router.post("/products",uploadCloud.array('imgs'), create);
router.patch("/products/:id", updatePatch);
router.delete("/products/:id",  remove);

export default router;
