import { MongoError } from "mongodb";
import Products from "../models/products";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { AppError } from "../middlewares/error-handler";
//controller is function for write business logic

//get all product
export async function getAllProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //pagination
  const page = parseInt(req.query.page as any) || 1; //if user not query it will take 1 as default
  const limit = parseInt(req.query.limit as any) || 5; //set limit how 1 page can render data

  //page=1&limit=5
  //limit = 5
  //skip = 0
  const startIndex = (page - 1) * limit;

  //filter
  const Pcategory = req.query.Pcategory as string | undefined;

  const minStock = parseInt(req.query.minStock as any) || 0; //default 0 if not provided
  const maxStock =
    parseInt(req.query.maxStock as any) || Number.MAX_SAFE_INTEGER; //default to max integer if not provided

  //filter method
  const query: any = {};
  if (Pcategory) {
    query.Pcategory = { $regex: `^${Pcategory}`, $options: `i` }; //$regex Provides regular expression capabilities for pattern matching strings in queries.
    // and i convert to lowercase
    // query.Pcategory = Pcategory;
  }
  //filter by stock range
  query.Pstock = { $gte: minStock, $lte: maxStock }; //$gte = greater than or equal Value , $lte = less than or equal Value

  //sort by price and stock
  const sortBy = (req.query.sortBy as string) || undefined;
  const sortOrder = (req.query.sortOrder as string) === "desc" ? -1 : 1; //ascending by default
  //sort by stock and price method
  const sort: any = {};
  if (sortBy && (sortBy === "Pprice" || sortBy === "Pstock")) {
    sort[sortBy] = sortOrder;
  }

  try {
    //get total product
    const total = await Products.countDocuments(query);

    //find product in database
    //static query , {Pprice : {$gte: 50}}
    const product = await Products.find(query)
      .sort(sort)
      .skip(startIndex)
      .limit(limit);

    //show data to client
    res.status(200).json({
      page, //show current page
      pages: Math.ceil(total / limit), //show how many page
      total, //show total page
      limit, //set limit
      data: {
        products: product,
      },
    });
  } catch (error) {
    // res.status(500).json({ message: (error as any).message });
    next(error);
  }
}

//get single product
export async function getSingleProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      const error = new Error("Product not found") as AppError;
      error.statusCode = 404;
      throw error;
    }
    const id = req.params.id;
    const product = await Products.findById(id);
    // if (!product) {
    //   return res.status(404).json({ error: "Product not found" });
    // }
    res.status(200).json(product);
  } catch (error) {
    // res.status(500).json({ message: (error as any).message });
    // res.status(500).json({ message: "Server error" });
    next(error);
  }
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

//create product
export async function createProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { Pname, Pprice, Pcategory, Pstock } = req.body;
    const product = await Products.create({ Pname, Pprice, Pcategory, Pstock });
    res.status(200).json(product);
  } catch (error) {
    if (error instanceof MongoError && error.code === 11000) {
      return res.status(400).json({ message: "Error this name already exist" });
    }
    // res.status(500).json({ error: "Server error" });
    next(error);
  }
  // try {
  //   const newProduct = new Products(req.body);
  //   const savedProduct = await newProduct.save();
  //   res.status(201).json(savedProduct);
  // } catch (error) {
  //   res.status(400).json({ message: (error as any).message });
  // }
}

//update all product
export async function updateAllProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const UpdateProduct = req.body;
    const product = await Products.findByIdAndUpdate(
      { _id: id },
      UpdateProduct,
      {
        new: true,
      }
    );
    if (!product) {
      return res.status(400).json({ error: "Item not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

//update single product
export async function updateSingleProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
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
  } catch (error) {
    next(error);
  }
}

//delete product
export async function deleteProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const product = await Products.findByIdAndDelete({ _id: id });
    if (!product) {
      return res.status(400).json({ error: "Item not found" });
    }
    res.status(200).json({ message: "Product delete success" });
  } catch (error) {
    next(error);
  }
}
