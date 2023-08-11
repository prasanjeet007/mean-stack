const express = require("express");
const multer = require("multer");
const router = express.Router();
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "./images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});
const Post = require("../models/post");
router.post(
  "/createpost",
  multer({ storage: storage }).single("image"),
  async (req, res) => {
    const url = req.protocol + "://" + req.get("host");
    const post = new Post({
      ...req.body,
      image: url + "/backend/images/" + req.file.filename,
    });
    const postResult = await post.save();
    res.send(postResult);
  }
);
router.get("/getposts", async (req, res) => {
  const postResult = await Post.find();
  res.send(postResult);
});
router.get("/getpost/:id", async (req, res) => {
  const postResult = await Post.findById({ _id: req.params.id });
  res.send(postResult);
});
router.delete("/deletepost/:id", async (req, res) => {
  const postResult = await Post.findByIdAndDelete({ _id: req.params.id });
  res.send(postResult);
});
router.put("/updatepost/:id", async (req, res) => {
  const updatedPostResult = await Post.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: { title: req.body.title, description: req.body.description },
    },
    { new: true }
  );
  res.send(updatedPostResult);
});
module.exports = router;
