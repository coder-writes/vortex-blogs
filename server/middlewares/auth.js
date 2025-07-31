import jwt from 'jsonwebtoken'


const auth = (req,res,next) =>{
    const token = req.headers.authorization;


    try{
        jwt.verify(token,process.env.JWT_SECRET);
        next();
    }catch(err){
        res.json({success:false,message: "Invalid Creadentials or Token Expired"});
    }
}

export default auth;