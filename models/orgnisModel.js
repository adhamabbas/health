const mongoose = require('mongoose');
const validator=require("validator");
const bcrypt=require("bcryptjs")
const orgnisSchema = new mongoose.Schema(
  {
   Name:{
      type:String,
      required:[true,"first name required"],
      minlength:[6,"too short name"],
      maxlength:[30,"too long name"],
  },
  
  
    department:{
        type:String,
        required:[true,"please provide your department"]
    },
    email:{
        type:String,
        required:[true,"please provide your email"],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,"please provid a valed email"]
    },
    password:{
        type:String,
        required:[true,"please provide a password"],
        minlenght:8

    },
    // passwordConfirm:{
    //     type:String,
        
    // },
    address:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true
    },
    pationtId:{
      type:[String],
      default:[]
    }
  
}
);
orgnisSchema.pre('save',async function(next){
  //only run if password was actile modifed
  if(!this.isModified('password')) return next();
  this.password= await bcrypt.hash(this.password,12)
  next();
})
orgnisSchema.methods.correctPassword=async function( condidatePassword,orgnisPassword){
  return await bcrypt.compare(condidatePassword,orgnisPassword);
};

const Orgnis = mongoose.model('Orgnis', orgnisSchema);

module.exports = Orgnis;
