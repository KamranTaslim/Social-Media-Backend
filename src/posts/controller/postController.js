const Post = require("../models/posts");
const postRepository = require("../repository/postRepository");
const Like = require("../../likes/models/likes");
//const User = require("../../../src/auth/models/user");
/**
 * Create a new post.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.userId - The user ID.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.content - The content of the post.
 * @param {Object} res - The response object.
 * @returns {Object} The created post.
 */
const createPost = async (req, res) => {
  try {
    const userId = req.userId;
    const { content } = req.body;

    // Create the post
    let post = await postRepository.createPost({ userId, content });

    // Fetch the created post to populate the userId field
    // await Post.populate(post, { path: "user", select: "email" });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    await postRepository.deletePost(postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await postRepository.getAllPosts();
    const postsWithLikes = await Promise.all(
      posts.map(async (post) => {
        const likes = await Like.find({ post: post._id });
        const currentUserLiked = likes.some(
          (like) => like.userId === req.userId
        );
        return { ...post._doc, likes: likes.length, currentUserLiked };
      })
    );
    res.status(200).json(postsWithLikes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await postRepository.getPostById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const post = await postRepository.updatePost(postId, content);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
};
