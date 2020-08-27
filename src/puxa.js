const router = require("express").Router();
const cloudinary = require("cloudinary").v2;

router.get("/", async (req, res) => {
  await cloudinary.v2.api.resources_by_ids(["teste"], function (error, result) {
    console.log(result, error);
  });
});

module.exports = (app) => {
  app.use("/puxa", router);
};
