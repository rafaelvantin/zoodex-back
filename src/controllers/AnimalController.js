const express = require("express");
const router = express.Router();
const Animal = require("../models/animal.js");

router.get("/", async (req, res) => {
  try {
    const animals = await Animal.find();
    return res.send(animals);
  } catch (erro) {
    console.log(erro);
    return res.status(400).send(erro);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    res.send(animal);
  } catch (erro) {
    console.log(erro);
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const animal = await Animal.create(req.body);
    return res.send(animal);
  } catch (erro) {
    console.log(erro);
    return res.status(400).send(erro);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const animal = await Animal.findByIdAndUpdate(req.params.id, {
      $set: {
        name: req.body.name,
      },
    });
    return res.send(animal);
  } catch (erro) {
    console.log(erro);
    return res.status(400).send(erro);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const animals = await Animal.findOneAndRemove(req.params.id);
    return res.send(animals);
  } catch (erro) {
    console.log(erro);
    return res.status(400).send(erro);
  }
});

module.exports = (app) => {
  app.use("/animals", router);
};
