const router = require("express").Router();
const Animal = require("../models/animal.js");
const multer = require("multer");
const multerConfig = require("../config/multer.js");
const { randomBytes } = require("crypto");

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

    if (req.body.image) {
      const upload = multer({ multerConfig }).single("image");

      upload(req, res, function (err) {
        if (err) return res.send(err);

        cloudinary.uploader.upload(
          path,
          { public_id: `blog/${uniqueFilename}`, tags: `blog` },
          function (err, image) {
            if (err) return res.send(err);
            console.log("file uploaded to Cloudinary");
            // remove file from server
            const fs = require("fs");
            fs.unlinkSync(path);
            // return image details
            res.json(image);
          }
        );
      });

      const animal = await Animal.create(req.body);
      return res.send(animal);
    }
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
