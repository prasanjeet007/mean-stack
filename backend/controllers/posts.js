const Post = require("../models/post");
exports.createPost = async (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    ...req.body,
    image: url + "/" + req.file.filename,
    creator: req.userData.userId,
  });
  const postResult = await post.save();
  res.send(postResult);
};
exports.getPosts = async (req, res) => {
  const pageSize = req.query.pagesize;
  const currentPage = req.query.page;
  const postQuery = Post.find();
  const postCount = Post.count();
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  const postResult = await postQuery;
  const postCountResult = await postCount;
  res.send({ postResult, postCountResult });
};
exports.getPostById = async (req, res) => {
  const postResult = await Post.findById({ _id: req.params.id });
  res.send(postResult);
};
exports.deletePostById = async (req, res) => {
  const postResult = await Post.findByIdAndDelete({
    _id: req.params.id,
    creator: req.userData.userId,
  });
  res.send(postResult);
};
exports.updatePostById = async (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const updatedPostResult = await Post.findByIdAndUpdate(
    { _id: req.params.id, creator: req.userData.userId },
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        image: url + "/" + req.file.filename,
      },
    },
    { new: true }
  );
  res.send(updatedPostResult);
};
