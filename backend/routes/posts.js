const express = require("express");
const router = express.Router();
const Post = require("../models/post");
router.post("/createpost", async (req, res) => {
  const post = new Post(req.body);
  const postResult = await post.save();
  res.send(postResult);
});
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
