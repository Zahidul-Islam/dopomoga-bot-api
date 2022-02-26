const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

require("dotenv").config();

const routes = require("./routes");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(
  bodyParser.json({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 8081;

// mongodb
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api/v1", routes);
app.use("/", (req, res) => res.status(200).send("alive"));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500).send("error");
});

if (process.env.NODE_ENV === "development") {
  app.listen(port, () => console.log("App is running on port " + port));
}

module.exports.handler = serverless(app);
