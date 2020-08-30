const multer = require("multer");

const { extname } = require("path");
const { randomBytes } = require("crypto");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "storage/");
  },
  filename: function (req, file, cb) {
    randomBytes(16, (err, result) => {
      if (err) return cb(err);
      return cb(null, result.toString("hex") + extname(file.originalname));
    });
  },
});

module.exports = storage;
