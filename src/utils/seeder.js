// seeder.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../auth/models/user");
const Post = require("../posts/models/posts");
const Like = require("../likes/models/likes");
const Comment = require("../comments/models/comments");
mongoose.connect("mongodb://127.0.0.1:27017/yourdatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async function () {
  console.log("Connected to the database");

  await User.deleteMany({});
  await Post.deleteMany({});
  await Like.deleteMany({});
  await Comment.deleteMany({});

  // Ensure the passwords meet the validation requirements
  const user1Password = "Password123"; // Valid password
  const user2Password = "Password456"; // Valid password

  const salt = await bcrypt.genSalt(10);
  const hashedUser1Password = await bcrypt.hash(user1Password, salt);
  const hashedUser2Password = await bcrypt.hash(user2Password, salt);

  const users = await User.create([
    { email: "user1@example.com", password: hashedUser1Password },
    { email: "user2@example.com", password: hashedUser2Password },
  ]);

  // Make user1 follow user2 and vice versa
  await User.findByIdAndUpdate(users[0]._id, {
    $addToSet: { following: users[1]._id },
  });
  await User.findByIdAndUpdate(users[1]._id, {
    $addToSet: { followers: users[0]._id },
  });

  const posts = await Post.create([
    { userId: users[0]._id, content: "Hello world!" },
    { userId: users[1]._id, content: "This is another post." },
  ]);

  const comments = await Comment.create([
    { userId: users[1]._id, content: "Nice post!", postId: posts[0]._id },
    { userId: users[0]._id, content: "Thank you!", postId: posts[1]._id },
  ]);

  await Post.findByIdAndUpdate(posts[0]._id, {
    $push: { comments: comments[0]._id },
  });
  await Post.findByIdAndUpdate(posts[1]._id, {
    $push: { comments: comments[1]._id },
  });

  await Like.create([
    { userId: users[0]._id, post: posts[1]._id },
    { userId: users[1]._id, post: posts[0]._id },
  ]);

  console.log("Database seeded!");
  mongoose.connection.close();
});
