import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  link: { type: String, required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Item", itemSchema);
