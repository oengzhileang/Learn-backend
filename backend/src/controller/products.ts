import { MongoError } from "mongodb";
import Products from "../models/products";
import { Request, Response } from "express";

//get all product
export async function getAllProducts(req: Request, res: Response) {
  try {
    const product = await Products.find({});
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
}

//get single product
export async function getSingleProduct(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const product = await Products.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
  // try {
  //   const product = await Products.findById(req.params.id);
  //   if (!product) {
  //     return res.status(404).json({ message: "Product not found" });
  //   }
  //   res.status(200).json(product);
  // } catch (error) {
  //   res.status(500).json({ message: (error as any).message });
  // }
}

//create product
export async function createProduct(req: Request, res: Response) {
  // const { Pname, Pprice, Pcategory, Pstock } = req.body;
  // try {
  //   const product = await Products.create({ Pname, Pprice, Pcategory, Pstock });
  //   res.status(200).json(product);
  // } catch (error) {
  //   if (error instanceof MongoError && error.code === 11000) {
  //     return res.status(400).json({ message: "Error this name already exist" });
  //   }
  //   res.status(500).json({ error: "Server error" });
  // }
  try {
    const newProduct = new Products(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: (error as any).message });
  }
}

//update all product
export async function updateAllProduct(req: Request, res: Response) {
  const { id } = req.params;
  const UpdateProduct = req.body;
  const product = await Products.findByIdAndUpdate({ _id: id }, UpdateProduct, {
    new: true,
  });
  if (!product) {
    return res.status(400).json({ error: "Item not found" });
  }
  res.status(200).json(product);
}

//update single product
export async function updateSingleProduct(req: Request, res: Response) {
  const { id } = req.params;
  const product = await Products.findByIdAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );
  if (!product) {
    return res.status(400).json({ error: "Item not found" });
  }
  res.status(200).json(product);
}

//delete product
export async function deleteProduct(req: Request, res: Response) {
  const { id } = req.params;
  const product = await Products.findByIdAndDelete({ _id: id });
  if (!product) {
    return res.status(400).json({ error: "Item not found" });
  }
  res.status(200).json({ message: "Product delete success" });
}
