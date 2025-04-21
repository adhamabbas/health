const mongoose = require('mongoose');
const validator=require("validator");
const bcrypt=require("bcryptjs")
const healthproblem_Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  medicen: {
    type: String,
    required: true
  }
});
const orgnis_report_Schema= new mongoose.Schema({
  descrption: {
    type: String,
    required: true
  },
  date: {
    type: String,
    minlength:[10," short data please set data as EX 01/02/2020"],
    maxlength:[10," long data too long PhoneNumber"],
    required: true
  }
});
const Surgical_operations_Schema= new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    minlength:[10," short data please set data as EX 01/02/2020"],
    maxlength:[10," long data too long PhoneNumber"],
    required: true
  }
});
const diagonas_Schema= new mongoose.Schema({
  DoctorName: {
    type: String,
    required: true,
  },
  
  date: {
    type: String,
    minlength:[10," short data please set data as EX 01/02/2020"],
    maxlength:[10," long data too long PhoneNumber"],
    required: true
  },
  Diagnose_condition:{
    type:String,
    require:true
  },
  Medicine:{
    type:[String],
    require:true
  }
 
});





const Hereditary_diseases_Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  medicen: {
    type: String,
    required: true
  }
});
const chronic_Diseases_Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  medicen: {
    type: String,
    required: true
  }
});
const pationtSchema = new mongoose.Schema(
  {
    fristName:{
      type:String,
      required:[true,"fristName required"],
      minlength:[3,"too short fristName"],
      maxlength:[10,"too long fristName"],
  },
  lastName:{
    type:String,
    required:[true,"lastName required"],
    minlength:[3,"too short lastName"],
    maxlength:[10,"too long lastName"],
  },
   image:{
     type:String,
     default:"https://res.cloudinary.com/dxs0ugb8z/image/upload/v1684962851/pationtImg/woep0gm8je0yr9smzxny.png"
   },
   x_ray:{
     type:[String],
     default:[]
   },
  age:{
      type:Number,
      required:true
  },
  bloodType: {
      type: String,
      required: [true, 'bloodType required'],
      enum: {
        values: ['A+', 'A-', 'B+','B-','AB+', 'AB-', 'O+','O-',"don't know"],
        message: "must choose a valid bloodtype('A+', 'A-', 'B+','B-','AB+', 'AB-', 'O+','O-')"
      }
    },
    gender:{
      type:String,
      enum:{
        values:["mail","femail"],
        message:" choose mail or femail"
      }
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
      minlength:[8," to short password"],
      select:false

  },
  phoneNumber:{
    type:String,
    required:true,
    unique:true,
    minlength:[11,"too short PhoneNumber"],
    maxlength:[11,"too long PhoneNumber"]
},
National_ID:{
  type:String,
  required:true,
  unique:true,
  minlength:[14,"too short National_ID"],
  maxlength:[14,"too long National_ID"]
  },
  chronic_Diseases:{
    type:[chronic_Diseases_Schema],
     default: []
   },
  Health_problems:{
    type:[healthproblem_Schema],
      default: []
   },
  Hereditary_diseases:{
    type:[Hereditary_diseases_Schema],
      default: []
   },
  Surgical_operations:{
   type:[Surgical_operations_Schema],
   default:[]

   },
   diagonas:{
    type:[diagonas_Schema],
    default:[]
   },
   orgnis_report:{
    type:[orgnis_report_Schema],
    default:[]
   }

}
);
pationtSchema.pre('save',async function(next){
  //only run if password was actile modifed
  if(!this.isModified('password')) return next();
  this.password= await bcrypt.hash(this.password,12)
  next();
})
pationtSchema.methods.correctPassword=async function( condidatePassword,pationtPassword){
  return await bcrypt.compare(condidatePassword,pationtPassword);
};

const Pationt = mongoose.model('Pationt', pationtSchema);

module.exports = Pationt;
