// likeRoutes.js

const express = require("express");
const router = express.Router();
const { likePost, unlikePost } = require("../controller/likeController"); // Adjust the path as necessary
const authMiddleware = require("../../auth/middlewares/authMiddleware");

router.post("/", authMiddleware, likePost);
router.delete("/", authMiddleware, unlikePost);

module.exports = router;
