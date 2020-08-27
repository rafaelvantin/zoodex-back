const mongoose = require("../database/index.js");

const ZooSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    maxlength: 8,
    required: true,
  },
});

const Zoo = mongoose.model("Zoo", ZooSchema);
module.exports = Zoo;
