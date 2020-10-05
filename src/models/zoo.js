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
  cnpj: {
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
  additionalInfo: [
    {
      title: {
        type: String,
        required: true,
      },
      info: {
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
  map: {
    type: String,
    required: false,
    trim: true,
  },
  recoveryToken: {
    type: String,
    required: false,
    select: false,
  },
  created_at: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Zoo = mongoose.model("Zoo", ZooSchema);
module.exports = Zoo;
