import fs from 'fs';
import imagekit from '../configs/imageKit.js';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import main from '../configs/gemini.js';
export const addBlog = async(req,res) =>{
    try{
        const {title , subTitle , description , category , isPublished} = JSON.parse(req.body.blog);
        const imageFile = req.file;


        if(!title || !description || !category || !imageFile){
            return res.json({success: false , message: "Missing required Fields"});
        }

        const fileBuffer = fs.readFileSync(imageFile.path);
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        });



        const optimizedImageURL = imagekit.url({
            path: response.filePath,
            transformation: [
                {quality: 'auto'},
                {format: 'webp'},
                {width: '1280'}
            ]
        });

        const image = optimizedImageURL;

         await Blog.create({title,subTitle,description,image,category,isPublished});

         res.json({success: true , message: "Blog Added Sucessfully"});
    }catch(err){ 
        res.json({success: false, message: err.message});
    }
}


export const getAllBlogs = async(req, res) => {
    try {
        const blogs = await Blog.find({isPublished: true});
        res.json({success: true, blogs});
    } catch (err) {
        res.json({success: false, message: err.message});
    }
}


export const getBlogById = async(req, res) => {
    try {
        const blogId = req.params.blogId;
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.json({success: false, message: "Blog not found"});
        }
        if(blog.isPublished === false){
            return res.json({success: false, message: "Blog is not published"});
        }
        res.json({success: true, blog});
    } catch (err) {
        res.json({success: false, message: err.message});
    }
}

export const deleteBlogById = async(req,res) =>{
    try {
        const id = req.params.id;

        const blog = await Blog.findByIdAndDelete(id);


        //Delete all the comments related to the blog
        await Comment.deleteMany({blog: id});
        if (!blog) {
            return res.json({success: false, message: "Blog not found"});
        }
        res.json({success: true, message: "Blog deleted successfully"});
    } catch (err) {
        res.json({success: false, message: err.message});
    }
}


export const togglePublish = async(req, res) => {
    try{
        const id = req.params.id;
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.json({success: false, message: "Blog not found"});
        }
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({success: true, message: "Blog updated successfully"});
    } catch (err) {
        res.json({success: false, message: err.message});
    }
}

export const addComment = async(req, res) => {
    try {
        const { blog,name, content } = req.body;
        if (!blog || !name || !content) {
            return res.json({success: false, message: "Missing required fields"});
        }
        await Comment.create({blog,name,content});
        res.json({success: true, message: "Comment is sent for review Successfully"});
    } catch (err) {
        res.json({success: false, message: err.message});
    }
}

export const getBlogComments = async(req, res) => {
    try {
        const blogId = req.params.id;
        const comments = await Comment.find({ blog: blogId , isApproved: true }).sort({ createdAt: -1 });
        res.json({ success: true, comments });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
}


export const deleteCommentById = async(req, res) => {
    try {
        const id = req.params.id;
        const comment = await Comment.findByIdAndDelete(id);
        if (!comment) {
            return res.json({success: false, message: "Comment not found"});
        }
        res.json({success: true, message: "Comment deleted successfully"});
    } catch (err) {
        res.json({success: false, message: err.message});
    }
}

export const genrateAIContent = async(req, res) => {
    try{
        const {prompt} = req.body;
        console.log;(prompt);
        const content = await main(`You are given the title and the subtitle for writing a blog post ${prompt}  Generate the content for this title and the subtitle in simple text format treat yourself as an expert also try to also try to give the quotes said by famous person use book references  make the post more humanised form`);
        res.json({success: true, content: content});
    }catch(err){
        res.json({success: false, message: err.message});
    }
}