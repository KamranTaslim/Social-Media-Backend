// likeRepository.js

const Like = require("../models/likes"); // Adjust the path to your Like model

async function addLike(userId, postId) {
  const like = new Like({ userId, post: postId });
  return like.save();
}

async function removeLike(userId, postId) {
  return Like.findOneAndDelete({ userId, post: postId });
}

async function getLike(userId, postId) {
  return Like.findOne({ userId, post: postId });
}

module.exports = { addLike, removeLike, getLike };
