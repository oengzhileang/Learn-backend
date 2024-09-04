import { Router } from "express";
import {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateAllProduct,
  updateSingleProduct,
  deleteProduct,
} from "../controller/products";

import { validateProduct } from "../validate/productsValidate";
const router = Router();

//get single item
router.get("/:id", getSingleProduct);

//get all items
router.get("/", getAllProducts);

//create item
router.post("/", validateProduct, createProduct);

//update all item
router.put("/:id" , validateProduct, updateAllProduct);

//update single item
router.patch("/:id", updateSingleProduct);

//delete item
router.delete("/:id", deleteProduct);

export default router;
