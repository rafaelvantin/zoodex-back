const router = require("express").Router();
const Animal = require("../models/animal.js");

const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const multerConfig = require("../config/multer.js");
const { randomBytes } = require("crypto");
const { unlinkSync } = require("fs");

const upload = multer({ storage: multerConfig });
const fakeZooName = "ZooBauru";

const saveImage = (image) => {
  return new Promise(async (resolve, reject) => {
    cloudinary.uploader.upload(
      image.path,
      {
        public_id: `${fakeZooName}/animals/${image.filename.slice(0, -4)}`,
        overwrite: true,
      },
      (err, { url }) => {
        unlinkSync(image.path);
        if (err) reject(err);
        resolve(url);
      }
    );
  });
};

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

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const animal = await Animal.create(req.body);
    const imageUrl = req.file ? await saveImage(req.file, res) : "";

    const animalWithImage = await Animal.updateOne(
      { _id: animal._id },
      {
        image: imageUrl,
      }
    );

    return res.send(animalWithImage);
  } catch (erro) {
    console.log(erro);
    return res.status(400).send(erro);
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const imageUrl = req.file ? await saveImage(req.file, res) : "";

    const animal = await Animal.updateOne(
      { _id: req.params.id },
      { name: req.body.name }
    );
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
