const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");
const cors = require("cors");
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

let imageUrlPath;
const host = process.env.HOST;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Images");
  },

  filename: (req, file, cb) => {
    console.log(file);
    imageUrlPath = `${Date.now().toString().slice(0, 6)}_${file.originalname}`;
    cb(null, `${Date.now().toString().slice(0, 6)}_${file.originalname}`);
  },
});

const upload = multer({ storage });

app.get("/*", (req, res, next) => {
  res.sendFile(path.join(__dirname, req.originalUrl));
});

app.post("/upload-image", upload.single("file"), (req, res, next) => {
  res.json({
    imagePath: req.protocol + "://" + host + "/" + req.file.path,
  });
});

app.listen(4000, () => {
  console.log("Server running in Port 4000");
});
