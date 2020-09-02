const { diskStorage } = require("multer");
const cloudinary = require("cloudinary").v2;
const { extname } = require("path");
const { randomBytes } = require("crypto");
const { unlinkSync } = require("fs");

const storage = diskStorage({
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

const saveImage = (image, type, zooname = "ZooBauru") => {
  return new Promise(async (resolve, reject) => {
    cloudinary.uploader.upload(
      image.path,
      {
        public_id: `${zooname}/${type}/${image.filename.slice(0, -4)}`,
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

const updateImage = (image, type, url, zooname = "ZooBauru") => {
  return new Promise(async (resolve, reject) => {
    cloudinary.uploader.upload(
      image.path,
      {
        public_id: `${zooname}/${type}/${url.split("/")[0].slice(0, -4)}`,
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

module.exports = { storage, saveImage, updateImage };
