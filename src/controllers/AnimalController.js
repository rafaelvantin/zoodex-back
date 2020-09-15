const router = require("express").Router();
const Animal = require("../models/animal.js");

const multer = require("multer");
const { storage } = require("../config/multer.js");
const upload = multer({ storage: storage });
const { saveImage, updateImage } = require("../config/multer.js");

const authMiddleware = require("../middlewares/auth.js");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const animals = await Animal.find({ zoo_id: req.params.ZOO_ID });
    return res.send(animals);
  } catch (erro) {
    console.log(erro);
    return res.status(400).send(erro);
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    console.log(req.params.id, req.params.ZOO_ID);
    const animal = await Animal.findOne({
      _id: req.params.id,
      zoo_id: req.params.ZOO_ID,
    });
    res.send(animal);
  } catch (erro) {
    console.log(erro);
    return res.status(400).send(erro);
  }
});

router.post("/", [authMiddleware, upload.single("image")], async (req, res) => {
  try {
    const animal = await Animal.create({
      zoo_id: req.params.ZOO_ID,
      ...req.body,
    });

    const imageUrl = req.file ? await saveImage(req.file, "animals") : "";

    const animalWithImage = await Animal.updateOne(
      { _id: animal._id },
      { avatar: imageUrl }
    );

    return res.send(animalWithImage);
  } catch (erro) {
    console.log(erro);
    return res.status(400).send(erro);
  }
});

router.put(
  "/:id",
  [authMiddleware, upload.single("image")],
  async (req, res) => {
    try {
      let newImageUrl;

      const { avatar } = await Animal.findOne({
        _id: req.params.id,
        zoo_id: req.params.ZOO_ID,
      });

      if (req.file)
        newImageUrl = await updateImage(req.file, "animals", avatar);

      const animal = await Animal.updateOne(
        { _id: req.params.id },
        {
          name: req.body.name,
          scientific_name: req.body.scientific_name,
          group: req.body.group,
          life_expectancy: req.body.life_expectancy,
          alimentation: req.body.alimentation,
          habitat: req.body.habitat,
          description: req.body.description,
          curiosities: req.body.curiosities,
          avatar: newImageUrl ? newImageUrl : avatar,
        }
      );

      return res.send(animal);
    } catch (erro) {
      console.log(erro);
      return res.status(400).send(erro);
    }
  }
);

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const animals = await Animal.deleteOne({
      zoo_id: req.params.ZOO_ID,
      _id: req.params.id,
    });
    return res.send(animals);
  } catch (erro) {
    console.log(erro);
    return res.status(400).send(erro);
  }
});

module.exports = (app) => app.use("/animals", router);
