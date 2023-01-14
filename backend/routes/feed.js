const express = require("express");
const { body } = require("express-validator/check");

const feedController = require("../controllers/feed");
const fileUpload = require("../middleware/file-upload");

const router = express.Router();

// GET /feed/getPosts
router.get("/getPosts", feedController.getPosts);

// GET /feed/getPost
router.get("/getPost/:postId", feedController.getPost);

// GET /feed/getMyPosts
router.get("/getMyPosts/:userId", feedController.getMyPosts);

//DELETE /feed/deletePost
router.delete("/deletePost/:postId", feedController.deletePost);

//PATCH /feed/updatePost

router.patch("/updatePost/:postId",  feedController.updatePost);

// POST /feed/createPost

router.post(
  "/createPost",
  fileUpload.single("image"), //middleware de imagen
  [
    //validaciones
    body("title").trim().isLength({ min: 1 }),
    body("description").trim().isLength({ min: 1 }),
  ],
  feedController.createPost
);

module.exports = router;
