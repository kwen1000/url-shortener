const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const shortenRouter = require("./routes/shortenRoute");
const goRouter = require("./routes/goRoute");

const app = express();

require("dotenv").config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/url-shortener";
const PORT =
  process.env.PORT || 3000;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", shortenRouter);
app.use("/go", goRouter);

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Mongo DB connected."));

app.listen(PORT, () => console.log(`DB running at ${PORT}`))
