const mongoose = require("mongoose");
const auth = require("../middleware/auth");

const artworkSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: { type: String },
    year: { type: String },
    description: { type: String },
    theme: { type: String },
    tags: { type: [String], default: [] },
    images: { type: [{ url: String, public_id: String }], default: [] },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Artwork", artworkSchema);
