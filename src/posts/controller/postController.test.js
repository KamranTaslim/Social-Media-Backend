const postRepository = require("../repository/postRepository");
const { getAllPosts } = require("./postController");

jest.mock("../repository/postRepository");

describe("getAllPosts", () => {
  test("should return all posts", async () => {
    const mockPosts = [
      { id: 1, content: "Post 1" },
      { id: 2, content: "Post 2" },
      { id: 3, content: "Post 3" },
    ];

    postRepository.getAllPosts.mockResolvedValue(mockPosts);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getAllPosts(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPosts);
  });

  test("should handle error and return 500 status code", async () => {
    const errorMessage = "Internal server error";

    postRepository.getAllPosts.mockRejectedValue(new Error(errorMessage));

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getAllPosts(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
