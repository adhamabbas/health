const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const pationtRouter = require('./routes/pationtRoutes');
const doctorRouter = require('./routes/doctorRoutes');
const orgnisRouter = require("./routes/orgnisRotes");
const updateDo_password = require("./routes/updateDo_pasword");
const updatePa_password = require("./routes/updatePa_password");
const updateRouter =require("./routes/updateRoutes ");
const updateByorgnis =require("./routes/updateByorgnis");
const updateimage =require("./routes/updateimage");
const x_ray =require("./routes/updatex_ray");
const update_picture =require("./routes/update_picture");
const pId=require("./routes/pIdRoutes");
const pationtId =require("./routes/pationt_idRoutes")

const app = express();
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/pationts', pationtRouter);
app.use('/api/v1/doctors', doctorRouter);
app.use('/api/v1/orgniss', orgnisRouter);
app.use("/api/v1/updateDo_pass",updateDo_password);
app.use("/api/v1/updatePa_pass",updatePa_password);
app.use("/api/v1/updateBydoctor",updateRouter);
app.use("/api/v1/updateByorgnis",updateByorgnis);
app.use('/api/v1/x_ray', x_ray);
app.use("/api/v1/update_image",updateimage);
app.use("/api/v1/update_doc_picture",update_picture);
app.use("/api/v1/pId",pId);
app.use("/api/v1/pationtId",pationtId);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
