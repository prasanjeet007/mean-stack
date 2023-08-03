const express = require("express");
const cors = require("cors");
const databaseConnection = require("./db/connection");
const app = express();
const port = process.env.PORT || 3000;
app.set("port", port);
app.use(cors());
app.use(express.json());
databaseConnection();
const Post = require("./models/post");
app.post("/createpost", async (req, res) => {
  const post = new Post(req.body);
  const postResult = await post.save();
  res.send(postResult);
});
app.get("/getposts", async (req, res) => {
  const postResult = await Post.find();
  res.send(postResult);
});
app.delete("/deletepost/:id", async (req, res) => {
  const postResult = await Post.findByIdAndDelete({ _id: req.params.id });
  res.send(postResult);
});
app.listen(port, () => {
  console.log(`Server is running on the ${port} port`);
});
