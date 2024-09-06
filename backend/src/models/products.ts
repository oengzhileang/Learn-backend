import mongoose, { model } from "mongoose";
//model use to create collection
const Schema = mongoose.Schema;

interface ProductsProps {
  Pname: String;
  Pprice: Number;
  Pcategory: String;
  Pstock: Number;
}

const productsSchema = new Schema<ProductsProps>(
  {
    Pname: {
      type: String,
      required: true,
      trim: true,
    },
    Pprice: {
      type: Number,
      required: true,
    },
    Pcategory: {
      type: String,
      required: true,
    },
    Pstock: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Products = model<ProductsProps>("Products", productsSchema);

export default Products;
