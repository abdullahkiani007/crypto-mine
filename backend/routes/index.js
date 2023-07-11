import express from "express";
import authController from "../controller/authController.js";
import blogController from "../controller/blogController.js";
import commentController from "../controller/commentController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

//test
const testRoute = router.get("/test", (req, res) => {
  res.status(200).json({ working: "Great" });
});

// Registration
const regRoute = router.post("/register", authController.register);

// Login
const loginRoute = router.post("/login", authController.login);

// logout
const logoutRoute = router.post("/logout", auth, authController.logout);

// refresh
const refreshRoute = router.get("/refresh", authController.refresh);

// blog

// create
const createBlog = router.post("/blog", auth, blogController.createBlog);

// get all
const getAllBlog = router.get("/blog/all", auth, blogController.getAllBlog);

// get blog by Id
const getBlogById = router.get("/blog/:id", auth, blogController.getBlogById);

// update
const updateBlog = router.put("/blog", auth, blogController.updateBlog);

// delete
const deleteBlog = router.delete("/blog/:id", auth, blogController.deleteBlog);

// comments

// create
const createComment = router.post("/comment", auth, commentController.create);

// get
const getComment = router.get("/comment/:id", auth, commentController.getById);

//delete
const deleteComment = router.delete(
  "/comment/:id",
  auth,
  commentController.delete
);

export default {
  testRoute,
  regRoute,
  loginRoute,
  logoutRoute,
  refreshRoute,
  createBlog,
  getAllBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
  createComment,
  getComment,
  deleteComment,
};
