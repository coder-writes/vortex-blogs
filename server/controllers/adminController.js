import jwt from "jsonwebtoken";
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';

const adminLogin = async(req,res) => {
    try{
        const {email , password} = req.body;

        

        if(email!== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
            return res.json({success: false , message: "INVALID Credentials"})
        }

        const token = jwt.sign({email}, process.env.JWT_SECRET);

        res.json({success: true , token});
    }catch(err){
        res.json({success: false , message: err.message});
    }
}

export const getAllBlogsAdmin = async (req, res) => {
    try{
        const blogs = await Blog.find({}).sort({createdAt: -1});
        res.json({success: true, blogs});
    } catch (err) {
        res.json({success: false, message: err.message});
    }
}

export const getAllCommentsAdmin = async (req, res) => {
    try{
        const comments = await Comment.find({}).populate("blog").sort({createdAt: -1});
        res.json({success: true, comments});
    }catch(err){
        res.json({success: false, message: err.message});
    }
}
export const getDashboard = async (req,res) => {
    try{
        const recentBlogs = await Blog.find({}).sort({createdAt: -1}).limit(5);
        const blogs = await Blog.countDocuments();
        const comments = await Comment.countDocuments({});
        const drafts = await Blog.countDocuments({isPublished: false});
        
        const dashboardData = {
            recentBlogs,
            blogs,
            comments,
            drafts
        }
        res.json({
            success: true,
            dashboardData
        });
      }catch(err){
        res.json({success: false, message: err.message});
    }
}


export const approveCommentById = async (req, res) => {
    try {
        const id = req.params.id;
        const comment = await Comment.findByIdAndUpdate(id, {isApproved: true}, {new: true});
        if (!comment) {
            return res.json({success: false, message: "Comment not found"});
        }
        res.json({success: true, message: "Comment Aprroved successfully"});
    } catch (err) {
        res.json({success: false, message: err.message});
    }
}

export default adminLogin;