const {promisify}=require("util");
const jwt=require("jsonwebtoken");
const cloudinary=require("../utils/cloudinary");
 const multer=require("../utils/multer");
const Doctor=require("./../models/doctorModel");
const catchAsync=require("./../utils/catchAsync");
const appError=require("./../utils/appError");
const signToken=id=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
     } )
}

exports.signup=catchAsync(async(req,res,next)=>{
    
    const newDoctor=await Doctor.create({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        age:req.body.age,
        gender:req.body.gender,
        department:req.body.department,
        email:req.body.email,
        address:req.body.address,
         password:req.body.password,
         phoneNumber:req.body.phoneNumber,
        pId:req.body.pId,
        // image:result.secure_url
 
    })
 const token= signToken(newDoctor._id)
    res.status(201).json({
        status:"success",
        Message:"تم تسجيل الدخول ب نجاح",
        token,
        data:{
            doctor:newDoctor
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
     const doctor=await  Doctor.findOne({email}).select("+password")
     if(!doctor|| !await doctor.correctPassword(password,doctor.password) ){
        return next(new appError('incorect email or password',401))
     }
     //if all ok send token
     const token=signToken(doctor._id);
     res.status(200).json({
        status:"success",
        Message:"تم تسجيل الدخول ب نجاح",
        data:{doctor},
        token
     })
})
exports.forget_pass=catchAsync( async(req,res,next)=>{
   const {email,phoneNumber}=req.body;
   //check if email and phone number exist
   console.log(email,phoneNumber)
   if(!email||!phoneNumber){
   return next(new appError("please provid email and phone number",400))
   }
   //check if user exists
   const doctor=await  Doctor.findOne({email, phoneNumber})
   if(!doctor){
   return next(new appError('incorect email or phone number',401))
   }
   //if all ok send token
   const token=signToken(doctor._id);
   res.status(200).json({
   status:"success",
   Message:"تم تسجيل الدخول ب نجاح",
   data:{doctor},
   token
   })
   })

