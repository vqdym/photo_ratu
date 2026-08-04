const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
// const hpp = require("hpp");

const AppError = require("./utils/appError");
const adminRouter = require("./routes/adminRoute");
const galleryRouter = require("./routes/galleryRoute");
const presetRouter = require("./routes/presetRoute");
const orderRouter = require("./routes/orderRoute");
const globalErrorHandler = require("./controllers/errorController");

const app = express();
app.use(helmet());

app.use(express.json({ limit: "10kb" }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 300,
  windowMs: 30 * 60 * 1000,
  message: "Too many request from this IP, please try again later.",
});
app.use("/api", limiter);

const mongoMiddleware = mongoSanitize();
const xssMiddleware = xss();

app.use((req, res, next) => {
  const fakeReq = {
    body: req.body,
    params: req.params,
    query: { ...req.query },
  };

  mongoMiddleware(fakeReq, res, () => {
    xssMiddleware(fakeReq, res, () => {
      if (req.body) req.body = fakeReq.body;
      if (req.params) req.params = fakeReq.params;

      if (req.query) {
        Object.keys(req.query).forEach((key) => delete req.query[key]);
        Object.assign(req.query, fakeReq.query);
      }
      next();
    });
  });
});

// app.use(
//   hpp({
//     whitelist: [

//     ],
//   }),
// );

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/gallery", galleryRouter);
app.use("/api/v1/preset", presetRouter);
app.use("/api/v1/order", orderRouter);

app.all(/(.*)/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
