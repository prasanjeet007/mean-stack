const express = require("express");
const router = express.Router();
const postController = require("./../controllers/posts");
const checkAuth = require("../middleware/check-auth");
const multerMiddleWare = require("../middleware/multer");
router.post(
  "/createpost",
  checkAuth,
  multerMiddleWare,
  postController.createPost
);
router.get("/getposts", checkAuth, postController.getPosts);
router.get("/getpost/:id", checkAuth, postController.getPostById);
router.delete("/deletepost/:id", checkAuth, postController.deletePostById);
router.put(
  "/updatepost/:id",
  checkAuth,
  multerMiddleWare,
  postController.updatePostById
);
module.exports = router;
