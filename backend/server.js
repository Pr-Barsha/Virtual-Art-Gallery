const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const artworkRoutes = require("./routes/artworks");

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" })); // for json bodies

// connect db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
mongoose.connection.on("error", (err) =>
  console.error("Mongo connection error:", err)
);

mongoose.connection.on("error", (err) =>
  console.error("Mongo connection error:", err)
);

app.use("/api/auth", authRoutes);
app.use("/api/artworks", artworkRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error", error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
