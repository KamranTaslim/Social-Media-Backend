const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConfig");
const userController = require("./src/auth/controllers/userController.js");
const cors = require("cors"); // Import CORS middleware
// Load environment variables from .env file
const postRoutes = require("./src/posts/routes/postRoutes.js");
const likeRoutes = require("./src/likes/routes/likeRoutes.js");
dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use(cors());

app.use("/api/likes", likeRoutes);
app.use("/api/post", postRoutes);

app.use("/api/auth", userController);
// Simple route for testing
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});

// {
//   "email":"abc2@gmail.com",
//   "password":"Password123"
// }
