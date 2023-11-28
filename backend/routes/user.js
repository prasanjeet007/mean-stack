const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user");
const { async } = require("rxjs");
router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const userData = new User({
      email: req.body.email,
      password: hash,
    });
    userData
      .save()
      .then((userResult) => {
        res.send(userResult);
      })
      .catch((err) => {
        res.send(err);
      });
  });
});
router.post("/login", async (req, res, next) => {
  const loginUser = await User.findOne({ email: req.body.email });
  if (loginUser) {
    const loginPass = await bcrypt.compare(
      req.body.password,
      loginUser.password
    );
    if (loginPass) {
      const token = jwt.sign(
        { email: loginUser.email, userId: loginUser._id },
        "userlogindetailstoken",
        {
          expiresIn: "1hr",
        }
      );
      res.status(200).json({
        success: true,
        token: token,
        result: "Authentication Successful",
      });
    }
  } else {
    res.status(401).json({
      success: false,
      result: "Authentication Failed",
    });
  }
});
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
