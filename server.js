const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");
const cors = require("cors");
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/images", express.static(path.join(__dirname, "images")));

const host = process.env.HOST;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },

  filename: (req, file, cb) => {
    cb(null, Math.random() * 10 + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(multer({ storage: storage, fileFilter: fileFilter }).single("image"));

app.post("/upload-image", (req, res, next) => {
  const image = req.file.path;
  res.json({
    imagePath: req.protocol + "://" + host + image,
  });
});

app.listen(4000, () => {
  console.log("Server running in Port 4000");
});
