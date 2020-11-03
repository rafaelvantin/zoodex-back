const express = require("express");
const router = express.Router();
const Zoo = require("../models/zoo.js");
const Animal = require("../models/animal.js");

const bcrypt = require("bcrypt");

const multer = require("multer");
const { storage } = require("../config/multer.js");
const upload = multer({ storage: storage });
const { saveImage, updateImage } = require("../config/multer.js");

const authMiddleware = require("../middlewares/auth.js");

router.get("/", async (req, res) => {
  try {
    const zoo = await Zoo.find({});
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

router.post("/", upload.fields([{ name: "avatarImage" }, { name: "mapImage" }]), async (req, res) => {
  try {
    if (await Zoo.findOne({ email: req.body.email }))
      return res.status(400).send({ error: "Email já foi cadastrado!" });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    req.body.password = hashedPassword;

    if (req.body.address) req.body.address = JSON.parse(req.body.address);
    if (req.body.contacts) req.body.contacts = JSON.parse(req.body.contacts);
    if (req.body.additionalInfo) req.body.additionalInfo = JSON.parse(req.body.additionalInfo);

    const zoo = await Zoo.create(req.body);

    const avatarUrl = req.files.avatarImage ? await saveImage(req.files.avatarImage[0], "zoos") : "";
    const mapUrl = req.files.mapImage ? await saveImage(req.files.mapImage[0], "maps") : "";

    const zooWithImage = await Zoo.updateOne({ _id: zoo._id }, { avatar: avatarUrl, map: mapUrl });

    return res.send(zooWithImage);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

router.put("/", [authMiddleware, upload.fields([{ name: "avatarImage" }, { name: "mapImage" }])], async (req, res) => {
  try {
    const { avatar, map } = await Zoo.findOne({
      _id: req.params.ZOO_ID,
    });

    console.log(req.files.avatarImage);

    const newAvatarUrl = req.files.avatarImage
      ? await updateImage(req.files.avatarImage[0], "zoos", avatar)
      : undefined;
    const newMapUrl = req.files.mapImage ? await updateImage(req.files.mapImage[0], "zoos", map) : undefined;

    if (req.body.additionalInfo) req.body.additionalInfo = JSON.parse(req.body.additionalInfo);
    if (req.body.contacts) req.body.contacts = JSON.parse(req.body.contacts);
    if (req.body.address) req.body.address = JSON.parse(req.body.address);

    const zoo = await Zoo.updateOne(
      { _id: req.params.ZOO_ID },
      {
        ...req.body,
        avatar: newAvatarUrl ? newAvatarUrl : avatar,
        map: newMapUrl ? newMapUrl : map,
      }
    );

    return res.send(zoo);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

router.delete("/", authMiddleware, async (req, res) => {
  try {
    const zoo = await Zoo.deleteOne({ _id: req.params.ZOO_ID });
    await Animal.deleteMany({ zoo_id: req.params.ZOO_ID });
    return res.send(zoo);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

module.exports = (app) => app.use("/zoo", router);
