const mongoose = require("../database/index.js");

const AnimalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  scientificName: {
    type: String,
    required: true,
    trim: true,
  },
  phylum: {
    type: String,
    required: true,
    trim: true,
  },
  className: {
    type: String,
    required: true,
    trim: true,
  },
  habitat: {
    type: String,
    required: true,
    trim: true,
  },
  alimentation: {
    type: String,
    required: true,
    trim: true,
  },
  clockHabit: {
    type: String,
    required: true,
    trim: true,
  },
  lifeExpectancy: {
    type: Number,
    required: true,
  },
  curiosities: {
    type: Array,
    required: false,
  },
  timesCaptured: {
    type: Number,
    required: true,
  },
  zoo_id: {
    type: String,
    required: true,
    select: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  created_at: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Animal = mongoose.model("Animal", AnimalSchema);
module.exports = Animal;
