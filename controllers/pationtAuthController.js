const {promisify}=require("util");
const jwt=require("jsonwebtoken");
const Pationt=require("./../models/pationtModel");
//const cloudinary=require("../utils/cloudinary");
const catchAsync=require("./../utils/catchAsync");
const appError=require("./../utils/appError")
const signToken=id=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
     } )
}
exports.signup=catchAsync(async(req,res,next)=>{
  //const result = await cloudinary.uploader.upload(req.file.path, {
        // tags: "pationtImg",
      //   folder: "pationtImg/",
    //   });
//  console.log(result);
    const newPationt=await Pationt.create({
        fristName:req.body.fristName,
        lastName:req.body.lastName,
        age:req.body.age,
        bloodType:req.body.bloodType,
        gender:req.body.gender,
        email:req.body.email,
         password:req.body.password,
         phoneNumber:req.body.phoneNumber,
         National_ID:req.body. National_ID,
        chronic_Diseases:req.body.chronic_Diseases,
        Health_problems:req.body.Health_problems,
        Hereditary_diseases:req.body.Hereditary_diseases,
        Surgical_operations:req.body.Surgical_operations,
        
    })
 const token= signToken(newPationt._id)
    res.status(201).json({
        status:"success",
        token,
        data:{
            pationt:newPationt
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
     const pationt=await  Pationt.findOne({email}).select("+password")
     if(!pationt|| !await pationt.correctPassword(password,pationt.password) ){
        return next(new appError('incorect email or password',401))
     }
     //if all ok send token
     const token=signToken(pationt._id);
     res.status(200).json({
        status:"success",
        data:{pationt},
        token
     })
})
exports.forget_pass=catchAsync( async(req,res,next)=>{
    const {email,National_ID}=req.body;
    //check if email and phone number exist
    console.log(email,National_ID)
    if(!email||!National_ID){
    return next(new appError("please provid email and National_ID",400))
    }
    //check if user exists
    const pationt=await  Doctor.findOne({email, National_ID})
    if(!pationt){
    return next(new appError('incorect email or National_ID',401))
    }
    //if all ok send token
    const token=signToken(pationt._id);
    res.status(200).json({
    status:"success",
    Message:"تم تسجيل الدخول ب نجاح",
    data:{pationt},
    token
    })
    })
