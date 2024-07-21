const Post = require("../models/posts");
const Comment = require("../../comments/models/comments"); // Import the Comment model

// Rest of the code...

const createPost = async ({ userId, content }) => {
  const post = new Post({ userId, content });
  return await post.save();
};

const deletePost = async (postId) => {
  await Post.findByIdAndDelete(postId);
};

const getAllPosts = async () => {
  return await Post.find()
    .populate({ path: "userId", select: "email" })
    .populate("comments");
};

const getPostById = async (postId) => {
  return await Post.findById(postId)
    .populate("userId", "email")
    .populate("comments");
};

const updatePost = async (postId, content) => {
  return await Post.findByIdAndUpdate(postId, { content }, { new: true });
};

module.exports = {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
};
