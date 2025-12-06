require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const User = require("./models/User");
const Artwork = require("./models/Artwork");

(async () => {
  try {
    await connectDB();
    // clear
    await User.deleteMany({});
    await Artwork.deleteMany({});

    const salt = await bcrypt.genSalt(10);
    const adminPass = await bcrypt.hash("admin123", salt);
    const admin = await User.create({
      name: "Admin",
      email: "admin@gallery.com",
      passwordHash: adminPass,
      role: "admin",
    });

    // sample artworks (images: we will not have files; add placeholder or copy images to uploads)
    const a1 = await Artwork.create({
      title: "Sunset Over Lake",
      artist: "A. Artist",
      year: "2020",
      description: "A beautiful sunset.",
      theme: "photography",
      tags: ["sunset", "lake"],
      images: [],
    });

    console.log(
      "Seed finished. Admin credentials: admin@gallery.com / admin123"
    );
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
