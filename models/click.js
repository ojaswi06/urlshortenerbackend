import mongoose from "mongoose";

const clickSchema = new mongoose.Schema({
  shortId: String,
  ip: String,
  userAgent: String,
  country: String,
  region: String,
  city: String
}, { timestamps: true });

export default mongoose.model("Click", clickSchema);
