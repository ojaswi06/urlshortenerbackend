import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { nanoid } from "nanoid";
import Url from "./models/url.js";
import Click from "./models/click.js";
import geoip from "geoip-lite";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

// Shorten URL
app.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  if (!longUrl) return res.status(400).json({ error: "URL required" });

  const shortId = nanoid(6);
  const newUrl = new Url({ longUrl, shortId, clicks: 0 });
  await newUrl.save();

  res.json({ shortUrl: `${process.env.BASE_URL}/${shortId}`, shortId });
});

// Redirect & Track
app.get("/:shortId", async (req, res) => {
  const url = await Url.findOne({ shortId: req.params.shortId });
  if (!url) return res.status(404).send("Not Found");

  url.clicks++;
  await url.save();

  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const geo = geoip.lookup(ip) || {};
  
  const click = new Click({
    shortId: url.shortId,
    ip,
    userAgent: req.headers["user-agent"],
    country: geo.country || "Unknown",
    region: geo.region || "Unknown",
    city: geo.city || "Unknown",
  });
  await click.save();

  res.redirect(url.longUrl);
});

// Analytics
app.get("/analytics/:shortId", async (req, res) => {
  const url = await Url.findOne({ shortId: req.params.shortId });
  if (!url) return res.status(404).json({ error: "Not found" });

  const clicks = await Click.find({ shortId: url.shortId }).sort({ createdAt: 1 });
  res.json({ longUrl: url.longUrl, totalClicks: url.clicks, clicks });
});

// Serve static files last
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
