const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  originalURL: {
    type: String,
    require: true
  },
  shortURL: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model("Link", linkSchema);
