const express = require("express");
const router = express.Router();
const Zoo = require("../models/zoo.js");

const bcrypt = require("bcrypt");

const multer = require("multer");
const { storage } = require("../config/multer.js");
const upload = multer({ storage: storage });
const { saveImage, updateImage } = require("../config/multer.js");

const authMiddleware = require("../middlewares/auth.js");
const admMiddleware = require("../middlewares/admin.js");

//ADM GET AND DELETE

router.get("/adm/", [authMiddleware, admMiddleware], async (req, res) => {
  try {
    const zoos = await Zoo.find();
    return res.send(zoos);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

router.get("/adm/:id", [authMiddleware, admMiddleware], async (req, res) => {
  try {
    const zoo = await Zoo.findById(req.params.id);
    res.send(zoo);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/adm/", [authMiddleware, admMiddleware], async (req, res) => {
  try {
    const zoo = await Zoo.findOneAndRemove(req.params.id);
    return res.send(zoo);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

//USER ROUTES

router.get("/", async (req, res) => {
  try {
    const zoo = await Zoo.find();
    return res.send(zoo);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const zoo = await Zoo.find({ _id: req.params.id });
    return res.send(zoo);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (await Zoo.findOne({ email: req.body.email }))
      return res.status(400).send({ error: "Email já foi cadastrado!" });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    req.body.password = hashedPassword;

    req.body.address = JSON.parse(req.body.address);
    req.body.contacts = JSON.parse(req.body.contacts);
    req.body.additionalInfo = JSON.parse(req.body.additionalInfo);

    const zoo = await Zoo.create(req.body);

    const imageUrl = req.file ? await saveImage(req.file, "zoos") : "";

    const zooWithImage = await Zoo.updateOne({ _id: zoo._id }, { avatar: imageUrl });

    return res.send(zooWithImage);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

//authMiddleware
router.put("/", upload.single("image"), async (req, res) => {
  try {
    const { name, cnpj, additionalInfo, address, contacts, avatar, map } = await Zoo.findOne({
      //params
      _id: req.headers.zoo_id,
    });

    const newImageUrl = req.file ? await updateImage(req.file, "zoos", avatar) : undefined;

    req.body.additionalInfo = JSON.parse(req.body.additionalInfo);
    req.body.contacts = JSON.parse(req.body.contacts);
    req.body.address = JSON.parse(req.body.address);

    //params
    const zoo = await Zoo.updateOne(
      { _id: req.headers.zoo_id },
      {
        name: req.body.name ? req.body.name : name,
        cnpj: req.body.cnpj ? req.body.cnpj : cnpj,
        additionalInfo: req.body.additionalInfo ? req.body.additionalInfo : additionalInfo,
        address: req.body.address ? req.body.address : address,
        contacts: req.body.contacts ? req.body.contacts : contacts,
        avatar: newImageUrl ? newImageUrl : avatar,
        map: req.body.map ? req.body.map : map,
      }
    );

    return res.send(zoo);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

//authMiddleware
router.delete("/", async (req, res) => {
  try {
    //params
    const zoo = await Zoo.deleteOne({ _id: req.headers.zoo_id });
    return res.send(zoo);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

module.exports = (app) => app.use("/zoo", router);
