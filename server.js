import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Item from "./models/Item.js"; // Import model (note the .js extension)

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("QR Server Running ✅");
});

// Add new item
app.post("/api/add", async (req, res) => {
  try {
    const { name, link, image } = req.body;
    const newItem = new Item({ name, link, image });
    await newItem.save();
    res.json({ success: true, message: "Item added successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all items
app.get("/api/all", async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
