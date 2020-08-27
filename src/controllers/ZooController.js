const express = require("express");
const router = express.Router();
const Zoo = require("../models/zoo.js");

//CONSULTA GERAL
router.get("/", async (req, res) => {
  try {
    const zoos = await Zoo.find();
    return res.send(zoos);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

//CONSULTA POR ID
router.get("/:id", async (req, res) => {
  try {
    const zoo = await Zoo.findById(req.params.id);
    res.send(zoo);
  } catch (error) {
    console.log(error);
  }
});

//CADASTRO
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const zoo = await Zoo.create(req.body);
    return res.send(zoo);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

//ALTERAÇÃO
router.put("/:id", async (req, res) => {
  try {
    const zoo = await Zoo.findByIdAndUpdate(req.params.id, {
      $set: {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      },
    });
    return res.send(zoo);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

//EXCLUSÃO
router.delete("/:id", async (req, res) => {
  try {
    const zoo = await Zoo.findOneAndRemove(req.params.id);
    return res.send(zoo);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

module.exports = (app) => {
  app.use("/zoo", router);
};
