const router = require("express").Router();
const Animal = require("../models/animal.js");
const Zoo = require("../models/zoo.js");

router.get("/zoo/:id", async (req, res) => {
  try {

    if(req.params.id.length != 24) return res.status(400).send({ valid: false, error: "ID inválido!"});

    const zoo = await Zoo.findOne({
      _id: req.params.id,
    });

    if(zoo == null) return res.status(400).send({ valid: false,error: "Zoo não existe no banco de dados!"});

    res.send(zoo);
  } catch (erro) {
    console.log(erro);
    return res.status(400).send(erro);
  }
});

router.get("/animal/:id", async (req, res) => {
  try {

    if(req.params.id.length != 24) return res.status(400).send({valid: false, error: "ID inválido!"});

    const animal = await Animal.findOne({
      _id: req.params.id,
      zoo_id: req.headers.zoo_id,
    });

    if(animal == null) return res.status(400).send({ valid: false, error: "Animal não existe no banco de dados!"});

    res.send(animal);
  } catch (erro) {
    console.log(erro);
    return res.status(400).send(erro);
  }
});

router.post("/animal/:id", async (req, res) => {
  try {

    const animal = await Animal.findOne({
      _id: req.params.id,
      zoo_id: req.headers.zoo_id,
    });

    if(animal == null) return res.status(400).send({ valid: false, error: "Animal não existe no banco de dados!"});

    const newTimesCaptured = animal.timesCaptured + 1;

    const animalUpdated = await Animal.updateOne(
      { _id: req.params.id, zoo_id: req.headers.zoo_id },
      { timesCaptured: newTimesCaptured }
    );
    
    res.send(animalUpdated);
  } catch (erro) {
    console.log(erro);
    return res.status(400).send(erro);
  }
});


module.exports = (app) => app.use("/user", router);
