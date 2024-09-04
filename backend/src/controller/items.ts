//Business logic
import Items from "../models/items";
import { Request, Response } from "express";

//get single item
export async function getSingleItem(req: Request, res: Response) {
  const { id } = req.params;
  const item = await Items.findById({ _id: id });
  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
}

//get all items
export async function getAllItems(req: Request, res: Response) {
  const item = await Items.find({});
  if (!item) {
    return res.status(404).json({ error: "No Items found" });
  }
  res.status(200).json(item);
}

//create item
export async function createItem(req: Request, res: Response) {
  const { title, author, isbn, stock } = req.body;
  try {
    const item = await Items.create({ title, author, isbn, stock });
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: "Error create item" });
  }
}

//update all item
export async function updateAllItem(req: Request, res: Response) {
  const { id } = req.params;
  const updateItems = req.body;
  if (!updateItems) {
    return res.status(404).json({ error: "No data found to update" });
  }
  const item = await Items.findByIdAndUpdate({ _id: id }, updateItems, {
    new: true,
  });
  if (!item) {
    return res.status(400).json({ error: "Item not found" });
  }
  res.status(200).json(item);
}

//update sigle item
export async function updateSingleItem(req: Request, res: Response) {
  const { id } = req.params;
  const item = await Items.findByIdAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );
  if (!item) {
    return res.status(400).json({ error: "Item not found" });
  }
  res.status(200).json(item);
}

//delete item
export async function deleteItem(req: Request, res: Response) {
  const { id } = req.params;
  const item = await Items.findByIdAndDelete({ _id: id });
  if (!item) {
    return res.status(400).json({ error: "Item not found" });
  }
  res.status(200).json(item);
}
