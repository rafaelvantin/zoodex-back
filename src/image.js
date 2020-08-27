const router = require("express").Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "storage/");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  },
});

router.post("/", (req, res) => {
  const upload = multer({ storage }).single("avatar");
  upload(req, res, function (err) {
    if (err) {
      return res.send(err);
    }
    res.json(req.file);
  });
});

module.exports = (app) => {
  app.use("/image", router);
};
