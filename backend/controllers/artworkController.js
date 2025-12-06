const cloudinary = require("../config/cloudinary");
const Artwork = require("../models/Artwork");

exports.createArtwork = async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    let uploadedImages = [];

    for (const file of files) {
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "virtual-art-gallery" }, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          })
          .end(file.buffer);
      });

      uploadedImages.push({
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      });
    }

    const artwork = await Artwork.create({
      title: req.body.title,
      artist: req.body.artist,
      year: req.body.year,
      description: req.body.description,
      theme: req.body.theme,
      tags: req.body.tags ? req.body.tags.split(",") : [],
      images: uploadedImages,
      createdBy: req.user._id, // if route is protected
    });

    res.json({ success: true, artwork });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.listArtworks = async (req, res) => {
  try {
    const artworks = await Artwork.find()
      .sort({ createdAt: -1 }) // newest first
      .populate("createdBy", "name email"); // optional: include creator info
    res.json({ success: true, artworks });
  } catch (err) {
    console.error("List Artworks Error:", err);
    res.status(500).json({ error: err.message });
  }
};
