import { Router } from "express";
import {
  getSingleItem,
  getAllItems,
  createItem,
  updateAllItem,
  updateSingleItem,
  deleteItem,
} from "../controllers/items";
const router = Router();

//get single item
router.get("/:id", getSingleItem);

//get all items
router.get("/", getAllItems);

//create item
router.post("/", createItem);

//update all item
router.put("/:id", updateAllItem);

//update single item
router.patch("/:id", updateSingleItem);

//delete item
router.delete("/:id", deleteItem);

export default router;
