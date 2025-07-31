import express from "express";
import { addBlog ,getBlogById ,getAllBlogs , deleteBlogById ,togglePublish, addComment, getBlogComments } from "../controllers/blogControllers.js";
import upload from "../middlewares/multer.js";
import auth from "../middlewares/auth.js";
import { genrateAIContent } from "../controllers/blogControllers.js";

const blogRouter = express.Router();

blogRouter.post("/add", upload.single('image'), auth, addBlog);
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/:blogId", getBlogById);
blogRouter.delete("/:id", auth, deleteBlogById);
blogRouter.put("/:id/toggle-publish", auth, togglePublish);
blogRouter.post('/add-comment' , addComment);
blogRouter.post('/comments/:id', getBlogComments);
blogRouter.post('/genrate-ai-content', auth, genrateAIContent);

export default blogRouter;