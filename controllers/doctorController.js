const {promisify}=require("util");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const Doctor = require('../models/doctorModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const cloudinary=require("../utils/cloudinary");

exports.getAllDoctor = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Doctor.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const doctors = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: doctors.length,
    data: {
      doctors
    }
  });
});

exports.getDoctor = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.id);
  

  if (!doctor) {
    return next(new AppError('No doctor found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      doctor
    }
  });
});

exports.createDoctor = catchAsync(async (req, res, next) => {
  const newDoctor = await Doctor.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      doctor: newDoctor
    }
  });
});

exports.updateDoctor = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!doctor) {
    return next(new AppError('No doctor found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      doctor
    }
  });
});
exports.updateDo_password = catchAsync(async (req, res, next) => {
  // Get the current doctor from the database
  const doctor = await Doctor.findById(req.params.id);
  
  // Check if the doctor exists
  if (!doctor) {
  return next(new AppError('No doctor found with that ID', 404));
  }
  
  // Check if the password is provided and valid
  if (!req.body.password || req.body.password.length < 8) {
  return next(new AppError('Invalid password', 400));
  }
  
  // Hash the new password
  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  
  // Compare the new password with the old one
  const isMatch = await bcrypt.compare(req.body.password, doctor.password);
  
  // If the passwords are the same, do not update
  if (isMatch) {
  return next(new AppError('New password cannot be the same as the old one', 400));
  }
  
  // Update the doctor with the new password and other fields
  const updatedDoctor = await Doctor.findByIdAndUpdate(
  req.params.id,
  { ...req.body, password: hashedPassword },
  {
  new: true,
  runValidators: true
  }
  );
  
  // Send back the updated doctor
  res.status(200).json({
  status: 'success',
  data: {
  updatedDoctor
  }
  });
  });
  
exports.update_picture = catchAsync(async (req, res, next) => {
  const result = await cloudinary.uploader.upload(req.file.path, {
  tags: "doctorImg",
  folder: "doctorImg/",
});

  const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.file.path, {
  new: true,
  runValidators: true,
  
});

if (!doctor) {
  return next(new AppError('No Doctor found with that ID', 404));
}
doctor.image=result.secure_url
//console.log(`kfkkf`,result.secure_url);
await doctor.save();

res.status(200).json({
  status: 'success',
  data: {
    doctor
  }
});
});

exports.pId = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    return next(new AppError('No Doctor found with that ID', 404));
  }

  // Push new elements from the request body to the corresponding array fields
  if (req.body.pId) {
    doctor.pId.push(...req.body.pId);
  }

  // Save the updated document
  await doctor.save();

  res.status(200).json({
    status: 'success',
    data: {
      doctor
    }});
});





exports.deleteDoctor = catchAsync(async (req, res, next) => {
  const doctor= await Doctor.findByIdAndDelete(req.params.id);

  if (!doctor) {
    return next(new AppError('No doctor found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});


