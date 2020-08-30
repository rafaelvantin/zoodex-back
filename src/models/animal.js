const mongoose = require("../database/index.js");

const AnimalSchema = new mongoose.Schema({
  scientific_name: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: Number,
    required: true,
    trim: true,
  },
  group: {
    type: String,
    required: true,
    trim: true,
  },
  life_expectancy: {
    type: Number,
    required: true,
  },
  alimentation: {
    type: String,
    required: true,
    trim: true,
  },
  habitat: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  curiosities: {
    type: Array,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const Animal = mongoose.model("Animal", AnimalSchema);
module.exports = Animal;
