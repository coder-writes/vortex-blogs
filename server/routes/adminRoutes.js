import express from "express";
import adminLogin, {approveCommentById, getAllBlogsAdmin, getAllCommentsAdmin, getDashboard }  from "../controllers/adminController.js";
import { deleteCommentById } from "../controllers/blogControllers.js";
import auth from "../middlewares/auth.js";
const adminRouter = express.Router();

adminRouter.post("/login" , adminLogin);
adminRouter.get("/comments",auth, getAllCommentsAdmin);
adminRouter.get("/blogs",auth, getAllBlogsAdmin);
adminRouter.post("/delete-comment/:id" , auth , deleteCommentById);
adminRouter.post('/approve-comment/:id', auth, approveCommentById);
adminRouter.get("/dashboard",auth, getDashboard);

export default adminRouter;