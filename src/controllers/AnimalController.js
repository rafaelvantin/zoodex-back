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

//authMiddleware
router.post("/", upload.single("image"), async (req, res) => {
  try {
    req.body.curiosities = JSON.parse(req.body.curiosities);
    //params
    const animal = await Animal.create({
      zoo_id: req.headers.zoo_id,
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

//authMiddleware
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const {
      name,
      scientificName,
      phylum,
      className,
      habitat,
      alimentation,
      clockHabit,
      lifeExpectancy,
      curiosities,
      avatar,
    } = await Animal.findOne({
      _id: req.params.id,
      //headers
      zoo_id: req.headers.zoo_id,
    });

    const newImageUrl = req.file ? await updateImage(req.file, "animals", avatar) : null;

    req.body.curiosities = JSON.parse(req.body.curiosities);

    const animal = await Animal.updateOne(
      { _id: req.params.id },
      {
        name: req.body.name ? req.body.name : name,
        scientificName: req.body.scientificName ? req.body.scientificName : scientificName,
        phylum: req.body.phylum ? req.body.phylum : phylum,
        className: req.body.className ? req.body.className : className,
        habitat: req.body.habitat ? req.body.habitat : habitat,
        alimentation: req.body.alimentation ? req.body.alimentation : alimentation,
        clockHabit: req.body.clockHabit ? req.body.clockHabit : clockHabit,
        lifeExpectancy: req.body.lifeExpectancy ? req.body.lifeExpectancy : lifeExpectancy,
        curiosities: req.body.curiosities ? req.body.curiosities : curiosities,
        avatar: newImageUrl ? newImageUrl : avatar,
      }
    );

    return res.send(animal);
  } catch (erro) {
    console.log(erro);
    return res.status(400).send(erro);
  }
});

//authMiddleware
router.delete("/:id", async (req, res) => {
  try {
    const animal = await Animal.deleteOne({
      //params
      zoo_id: req.headers.zoo_id,
      _id: req.params.id,
    });
    return res.send(animal);
  } catch (erro) {
    console.log(erro);
    return res.status(400).send(erro);
  }
});

module.exports = (app) => app.use("/animals", router);
