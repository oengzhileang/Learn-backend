import mongoose, { model } from "mongoose";
const Schema = mongoose.Schema;
interface ItemProps {
  title: string;
  author: string;
  isbn: number;
  stock: number;
}

const itemsSchema = new Schema<ItemProps>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    isbn: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Items = model<ItemProps>("Items", itemsSchema);

export default Items;

// export default mongoose.model("Items" , itemsSchema)
