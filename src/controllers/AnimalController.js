const router = require("express").Router();
const Animal = require("../models/animal.js");

const multer = require("multer");
const { storage } = require("../config/multer.js");
const upload = multer({ storage: storage });
const { saveImage } = require("../config/multer.js");

const authMiddleware = require("../middlewares/auth.js");
const admMiddleware = require("../middlewares/admin.js");

router.get("/", [authMiddleware, admMiddleware], async (req, res) => {
  try {
    const animals = await Animal.find({ zoo_id: req.ZOO_ID });
    return res.send(animals);
  } catch (erro) {
    console.log(erro);
    return res.status(400).send(erro);
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const animal = await Animal.findOne({
      _id: req.params.id,
      zoo_id: req.params.ZOO_ID,
    });
    res.send(animal);
  } catch (erro) {
    console.log(erro);
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const animal = await Animal.create(req.body);
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
      if (req.file) {
        const { initialImageURL } = await Animal.findOne({
          _id: req.params.id,
          zoo_id: req.params.ZOO_ID,
        });
        console.log(initialImageURL);
        const finalImageURL = await saveImage(
          req.file,
          "animals",
          initialImageURL
        );
      }

      const animal = await Animal.updateOne(
        { _id: req.params.id },
        {
          name: req.body.name,
          image: finalImageURL ? finalImageURL : initialImageURL,
        }
      );
      return res.send(animal);
    } catch (erro) {
      console.log(erro);
      return res.status(400).send(erro);
    }
  }
);

router.delete("/:id", async (req, res) => {
  try {
    const animals = await Animal.findOneAndRemove(req.params.id);
    return res.send(animals);
  } catch (erro) {
    console.log(erro);
    return res.status(400).send(erro);
  }
});

module.exports = (app) => app.use("/animals", router);
