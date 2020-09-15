const mongoose = require("../database/index.js");

const ZooSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    select: false,
  },
  address: {
    zipcode: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    street: {
      type: String,
      required: true,
      trim: true,
    },
    complement: {
      type: String,
      required: false,
      trim: true,
    },
  },
  contacts: [
    {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },
  ],
  avatar: {
    type: String,
    required: false,
    trim: true,
  },
});

const Zoo = mongoose.model("Zoo", ZooSchema);
module.exports = Zoo;