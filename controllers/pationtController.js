const {promisify}=require("util");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const Pationt = require('../models/pationtModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const cloudinary=require("../utils/cloudinary");

exports.getAllPationts = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Pationt.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const pationts = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: pationts.length,
    data: {
      pationts
    }
  });
});

exports.getPationt = catchAsync(async (req, res, next) => {
  const pationt = await Pationt.findOne({ National_ID:req.params.id});
  if (!pationt) {
    return next(new AppError('No pationt found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      pationt
    }
  });
});

exports.createPationt = catchAsync(async (req, res, next) => {
  const newPationt = await Pationt.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      pationt: newPationt
    }
  });
});
exports.updatePationt = catchAsync(async (req, res, next) => {
  const pationt = await Pationt.findByIdAndUpdate(req.params.id, req.body, {
  new: true,
  runValidators: true
});

if (!pationt) {
  return next(new AppError('No pationt found with that ID', 404));
}
await pationt.save();
// console.log("dommmmmmmmmmmmm");
res.status(200).json({
  status: 'success',
  data: {
    pationt
  }
});
});

exports.updatePa_password = catchAsync(async (req, res, next) => {
// Get the current patient from the database
const pationt = await Pationt.findById(req.params.id);

// Check if the patient exists
if (!pationt) {
return next(new AppError('No patient found with that ID', 404));
}

// Check if the password is provided and valid
if (!req.body.password || req.body.password.length < 8) {
return next(new AppError('Invalid password', 400));
}

// Hash the new password
const hashedPassword = await bcrypt.hash(req.body.password, 12);

// Compare the new password with the old one
const isMatch = await bcrypt.compare(req.body.password, pationt.password);

// If the passwords are the same, do not update
if (isMatch) {
return next(new AppError('New password cannot be the same as the old one', 400));
}

// Update the patient with the new password and other fields
const updatedPationt = await Pationt.findByIdAndUpdate(
req.params.id,
{ ...req.body, password: hashedPassword },
{
new: true,
runValidators: true
}
);

// Send back the updated patient
res.status(200).json({
status: 'success',
data: {
updatedPationt
}
});
});


exports.updateimage = catchAsync(async (req, res, next) => {
  const result = await cloudinary.uploader.upload(req.file.path, {
  tags: "pationtImg",
  folder: "pationtImg/",
});

  const pationt = await Pationt.findByIdAndUpdate(req.params.id, req.file.path, {
  new: true,
  runValidators: true,
  
});

if (!pationt) {
  return next(new AppError('No pationt found with that ID', 404));
}
pationt.image = result.secure_url;
await pationt.save();
//console.log(`kfkkf`,result.secure_url);
res.status(200).json({
  status: 'success',
  data: {
    pationt
  }
});
});

exports.updateByDoctor = catchAsync(async (req, res, next) => {
  
  
  const pationt = await Pationt.findOne({ National_ID:req.params.id});

  if (!pationt) {
    return next(new AppError('No pationt found with that ID', 404));
  }

  // Push new elements from the request body to the corresponding array fields
  if (req.body.chronic_Diseases) {
    pationt.chronic_Diseases.push(...req.body.chronic_Diseases);
  }
  if (req.body.Health_problems) {
    pationt.Health_problems.push(...req.body.Health_problems);
  }
  if (req.body.Hereditary_diseases) {
    pationt.Hereditary_diseases.push(...req.body.Hereditary_diseases);
  }
  if (req.body.Surgical_operations) {
    pationt.Surgical_operations.push(...req.body.Surgical_operations);
  }
  if (req.body.diagonas) {
    pationt.diagonas.push(...req.body.diagonas);
  }
   

  // Save the updated document
  await pationt.save();

  res.status(200).json({
    status: 'success',
    data: {
      pationt
    }
});
});
exports.updateByOrgnis = catchAsync(async (req, res, next) => {
  
  
  const pationt = await Pationt.findOne({ National_ID:req.params.id});

  if (!pationt) {
    return next(new AppError('No pationt found with that ID', 404));
  }

  // Push new elements from the request body to the corresponding array fields
  if (req.body.orgnis_report) {
    pationt.orgnis_report.push(...req.body.orgnis_report);
  }
   
  // Save the updated document
  await pationt.save();

  res.status(200).json({
    status: 'success',
    data: {
      pationt
    }
});
});


exports.updateX_ray = catchAsync(async (req, res, next) => {
  const result = await cloudinary.uploader.upload(req.file.path, {
     tags: "x_rayImg",
     folder: "x_rayImg/",
   });
  
  const pationt = await Pationt.findOne({ National_ID:req.params.id});

  if (!pationt) {
    return next(new AppError('No pationt found with that ID', 404));
  }

   if (req.file.path) {
    
     console.log(`kfkkf`,result.secure_url);
     console.log(pationt.x_ray);
     pationt.x_ray.push(result.secure_url);
   
  
   }

  // Save the updated document
  await pationt.save();

  res.status(200).json({
    status: 'success',
    data: {
      pationt
    }
    });
});





exports.deletePationt = catchAsync(async (req, res, next) => {
  const pationt = await Pationt.findByIdAndDelete(req.params.id);

  if (!pationt) {
    return next(new AppError('No pationt found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});


