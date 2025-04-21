const {promisify}=require ('util');
const jwt=require("jsonwebtoken");
const cloudinary=require("../utils/cloudinary");
 const multer=require("../utils/multer");
const Orgnis=require("./../models/orgnisModel");
const catchAsync=require("./../utils/catchAsync");
const appError=require("./../utils/appError");
const signToken=id=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
     } )
}

exports.signup=catchAsync(async(req,res,next)=>{
     
    const newOrgnis=await Orgnis.create({
        Name:req.body.Name,
        department:req.body.department,
        email:req.body.email,
        address:req.body.address,
         password:req.body.password,
         phoneNumber:req.body.phoneNumber,
         pationtId:req.body.pationtId
 
    })
 const token= signToken(newOrgnis._id)
    res.status(201).json({
        status:"success",
        Message:"تم تسجيل الدخول ب نجاح",
        token,
        data:{
            orgnis:newOrgnis
        }
    })
})
exports.login=catchAsync( async(req,res,next)=>{
     const {email,password}=req.body;
     //check if email and pass  exist
     console.log(email,password)
     if(!email||!password){
        return next(new appError("please provid email or password",400))
     }
     //check if user exest&&pass is corect
     const orgnis=await  Orgnis.findOne({email}).select("+password")
     if(!orgnis|| !await orgnis.correctPassword(password,orgnis.password) ){
        return next(new appError('incorect email or password',401))
     }
     //if all ok send token
     const token=signToken(orgnis._id);
     res.status(200).json({
        status:"success",
        Message:"تم تسجيل الدخول ب نجاح",
        data:{orgnis},
        token
     })
})
