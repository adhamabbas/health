const Orgnis = require('../models/orgnisModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const cloudinary=require("../utils/cloudinary");


exports.getAllOrgnis = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Orgnis.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const orgniss = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: orgniss.length,
    data: {
      orgniss
    }
  });
});

exports.getOrgnis = catchAsync(async (req, res, next) => {
  const orgnis = await Orgnis.findById(req.params.id);
  

  if (!orgnis) {
    return next(new AppError('No organistion found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      orgnis
    }
  });
});

exports.createOrgnis = catchAsync(async (req, res, next) => {
  const newOrgnis = await Orgnis.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      orgnis:newOrgnis
    }
  });
});

exports.updateOrgnis = catchAsync(async (req, res, next) => {
  const orgnis = await Orgnis.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!orgnis) {
    return next(new AppError('No orgnistion found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      orgnis
    }
  });
});





exports.pationtId = catchAsync(async (req, res, next) => {
  const orgnis = await Orgnis.findById(req.params.id);

  if (!orgnis) {
    return next(new AppError('No Doctor found with that ID', 404));
  }

  // Push new elements from the request body to the corresponding array fields
  if (req.body.pId) {
    orgnis.pationtId.push(...req.body.pationtId);
  }

  // Save the updated document
  await orgnis.save();

  res.status(200).json({
    status: 'success',
    data: {
      orgnis
    }});
});





exports.deleteOrgnis = catchAsync(async (req, res, next) => {
  const orgnis= await Orgnis.findByIdAndDelete(req.params.id);

  if (!orgnis) {
    return next(new AppError('No doctor found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});


