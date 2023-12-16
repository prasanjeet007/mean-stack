const express = require("express");
const router = express.Router();
const userController = require("./../controllers/users");
router.post("/signup", userController.createUser);
router.post("/login", userController.loginUser);
// router.get("/getposts", async (req, res) => {
//   const pageSize = req.query.pagesize;
//   const currentPage = req.query.page;
//   const postQuery = Post.find();
//   const postCount = Post.count();
//   if (pageSize && currentPage) {
//     postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
//   }
//   const postResult = await postQuery;
//   const postCountResult = await postCount;
//   res.send({ postResult, postCountResult });
// });
// router.get("/getpost/:id", async (req, res) => {
//   const postResult = await Post.findById({ _id: req.params.id });
//   res.send(postResult);
// });
// router.delete("/deletepost/:id", async (req, res) => {
//   const postResult = await Post.findByIdAndDelete({ _id: req.params.id });
//   res.send(postResult);
// });
// router.put(
//   "/updatepost/:id",
//   multer({ storage: storage }).single("image"),
//   async (req, res) => {
//     const url = req.protocol + "://" + req.get("host");
//     const updatedPostResult = await Post.findByIdAndUpdate(
//       { _id: req.params.id },
//       {
//         $set: {
//           title: req.body.title,
//           description: req.body.description,
//           image: url + "/" + req.file.filename,
//         },
//       },
//       { new: true }
//     );
//     res.send(updatedPostResult);
//   }
// );
module.exports = router;
