// likeController.js

const likeRepository = require("../repositories/likeRepository");

async function likePost(req, res) {
  try {
    const { postId } = req.body; // Assuming postId is passed in the body. Adjust as needed.
    const userId = req.userId; // Assuming userId is available in req.user. Adjust as needed.

    // Check if the user has already liked the post
    const existingLike = await likeRepository.getLike(userId, postId);
    if (existingLike) {
      return res
        .status(400)
        .json({ message: "You have already liked this post." });
    }

    const like = await likeRepository.addLike(userId, postId);
    res.status(201).json(like);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function unlikePost(req, res) {
  try {
    const { postId } = req.body; // Assuming postId is passed in the body. Adjust as needed.
    const userId = req.userId; // Assuming userId is available in req.user. Adjust as needed.
    await likeRepository.removeLike(userId, postId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { likePost, unlikePost };
