const express = require("express");
const router = express.Router();
const Zoo = require("../models/zoo.js");

const bcrypt = require("bcrypt");

const multer = require("multer");
const multerConfig = require("../config/multer.js");

const upload = multer({ storage: multerConfig });

const { saveImage } = require("../config/multer.js");

router.get("/", async (req, res) => {
  try {
    const zoos = await Zoo.find();
    return res.send(zoos);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const zoo = await Zoo.findById(req.params.id);
    res.send(zoo);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (await Zoo.findOne({ email: req.body.email }))
      return res.status(400).send({ error: "Email já foi cadastrado!" });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const zoo = await Zoo.create(req.body);
    zoo.password = undefined;

    const imageUrl = req.file ? await saveImage(req.file) : "";

    const zooWithImage = await Zoo.updateOne(
      { _id: zoo._id },
      {
        avatar: imageUrl,
      }
    );

    return res.send(zooWithImage);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const zoo = await Zoo.updateOne(
      { _id: req.params.id },
      {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      }
    );
    return res.send(zoo);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const zoo = await Zoo.findOneAndRemove(req.params.id);
    return res.send(zoo);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

module.exports = (app) => app.use("/zoo", router);
