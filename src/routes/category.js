import express from "express";
// import { checkPermission } from "../middlewares/checkPermission";
import {
  getAll,
  getDetail,
  create,
  updatePatch,
  remove,
} from "../controllers/category";
const router = express.Router();

router.get("/category", getAll);
router.get("/category/:id", getDetail);
router.post("/category/add", create);
router.put("/category/:id", updatePatch);
router.delete("/category/:id", remove);

export default router;