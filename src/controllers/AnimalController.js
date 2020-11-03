const router = require("express").Router();
const Animal = require("../models/animal.js");

const multer = require("multer");
const { storage } = require("../config/multer.js");
const upload = multer({ storage: storage });
const { saveImage, updateImage } = require("../config/multer.js");

const authMiddleware = require("../middlewares/auth.js");

router.get("/", async (req, res) => {
  try {
    const animals = await Animal.find({ zoo_id: req.headers.zoo_id });
    return res.send(animals);
  } catch (erro) {
    console.log(erro);
    return res.status(400).send(erro);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const animal = await Animal.findOne({
      _id: req.params.id,
      zoo_id: req.headers.zoo_id,
    });
    res.send(animal);
  } catch (erro) {
    console.log(erro);
    return res.status(400).send(erro);
  }
});

router.post("/", [authMiddleware, upload.single("image")], async (req, res) => {
  try {
    if (req.body.curiosities) req.body.curiosities = JSON.parse(req.body.curiosities);

    const animal = await Animal.create({
      zoo_id: req.params.ZOO_ID,
      timesCaptured: 0,
      ...req.body,
    });

    const imageUrl = req.file ? await saveImage(req.file, "animals") : "";

    const animalWithImage = await Animal.updateOne({ _id: animal._id }, { avatar: imageUrl });

    return res.send(animalWithImage);
  } catch (erro) {
    console.log(erro);
    return res.status(400).send(erro);
  }
});

router.put("/:id", [authMiddleware, upload.single("image")], async (req, res) => {
  try {
    const animal = await Animal.findOne({
      _id: req.params.id,
      zoo_id: req.params.ZOO_ID,
    });

    if (!animal) return res.status(404).send("Animal not found");

    const { avatar } = animal;

    const newImageUrl = req.file ? await updateImage(req.file, "animals", avatar) : null;

    if (req.body.curiosities) req.body.curiosities = JSON.parse(req.body.curiosities);

    const animalUpdated = await Animal.updateOne(
      { _id: req.params.id },
      {
        ...req.body,
        avatar: newImageUrl ? newImageUrl : avatar,
      }
    );

    return res.send(animalUpdated);
  } catch (erro) {
    console.log(erro);
    return res.status(400).send(erro);
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const animal = await Animal.deleteOne({
      zoo_id: req.params.ZOO_ID,
      _id: req.params.id,
    });
    return res.send(animal);
  } catch (erro) {
    console.log(erro);
    return res.status(400).send(erro);
  }
});

module.exports = (app) => app.use("/animals", router);
