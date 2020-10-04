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
    try {
      cloudinary.uploader.upload(
        image.path,
        {
          public_id: `${zooname}/${type}/${image.filename.split(".")[0]}`,
          overwrite: true,
        },
        (err, { url }) => {
          unlinkSync(image.path);
          if (err) reject(err);
          resolve(url);
        }
      );
    } catch (err) {
      console.log(err);
    }
  });
};

const updateImage = (image, type, url, zooname = "ZooBauru") => {
  return new Promise(async (resolve, reject) => {
    try {
      const imageArray = url.split("/");
      const imageName = imageArray[imageArray.length - 1].slice(0, -4);

      cloudinary.uploader.upload(
        image.path,
        {
          public_id: `${zooname}/${type}/${imageName}`,
          overwrite: true,
        },
        (err, { url }) => {
          unlinkSync(image.path);
          if (err) reject(err);
          resolve(url);
        }
      );
    } catch (err) {
      console.log(err);
    }
  });
};

module.exports = { storage, saveImage, updateImage };
