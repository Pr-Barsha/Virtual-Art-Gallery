const express = require("express");
const router = express.Router();
const multer = require("multer");
const memoryStorage = multer.memoryStorage();
const upload = multer({ storage: memoryStorage });
const auth = require("../middleware/auth");
const {
  createArtwork,
  listArtworks,
} = require("../controllers/artworkController");

const Artwork = require("../models/Artwork");

// ⭐ NEW — supports filtering by theme
router.get("/", async (req, res) => {
  try {
    const { theme } = req.query;

    let filter = {};
    if (theme && theme.trim()) {
      filter.theme = theme;
    }

    const artworks = await Artwork.find(filter);
    res.json(artworks);
  } catch (err) {
    console.error("Fetch artworks error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Old route (optional but keep it)
router.get("/all", listArtworks);

// Protected upload
router.post("/upload", auth, upload.array("images", 6), createArtwork);

module.exports = router;
