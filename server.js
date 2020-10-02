const express = require("express");
const logger = require("morgan");
const path= require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const handlebars = require("express-handlebars");
const shortenRouter = require("./routes/shortenRoute");
const goRouter = require("./routes/goRoute");
const homeRouter = require("./routes/homeRoute");

const app = express();
const hbs = handlebars.create({
  defaultLayout: "main"
});

require("dotenv").config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/url-shortener";
const PORT =
  process.env.PORT || 3000;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(path.join(__dirname, "public")));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use("/", homeRouter);
app.use("/api", shortenRouter);
app.use("/go", goRouter);

app.listen(PORT, () => console.log(`Port ${PORT} opened.`));

console.log("Checking for Mongo daemon...");
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Mongo connected."));
