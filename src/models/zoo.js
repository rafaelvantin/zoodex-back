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
    required: true,
    select: false,
  },
});

const Zoo = mongoose.model("Zoo", ZooSchema);
module.exports = Zoo;
