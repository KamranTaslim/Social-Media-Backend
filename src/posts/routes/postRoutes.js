const express = require("express");
const router = express.Router();
const postController = require("../controller/postController");
const authMiddleware = require("../../auth/middlewares/authMiddleware");

// Create a new post
router.post("/", postController.createPost);

// Delete a post
router.delete("/:postId", postController.deletePost);

// Get all posts
router.get("/", postController.getAllPosts);

// Get a particular post
router.get("/:postId", postController.getPostById);

// Update a post
router.put("/:postId", postController.updatePost);

module.exports = router;
