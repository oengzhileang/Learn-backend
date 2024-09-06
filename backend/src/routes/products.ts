import { Router } from "express";
import {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateAllProduct,
  updateSingleProduct,
  deleteProduct,
} from "../controllers/products";

import { validateSchema } from "../validates/Validate";
import { productsSchemaJoi } from "../schemas/productSchema";
const router = Router();

//get single item
router.get("/:id", getSingleProduct);

//get all items
router.get("/", getAllProducts);

//create item
router.post("/", validateSchema(productsSchemaJoi), createProduct);

//update all item
router.put("/:id", validateSchema, updateAllProduct);

//update single item
router.patch("/:id", updateSingleProduct);

//delete item
router.delete("/:id", deleteProduct);

export default router;
