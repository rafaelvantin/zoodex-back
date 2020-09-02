const Zoo = require("../models/zoo.js");

const admMiddleware = async (req, res, next) => {
  try {
    req.params.IS_ADM = false;

    const zoo = await Zoo.findOne({ _id: req.params.ZOO_ID });
    if (zoo.email === "grupotcc73b@gmail.com") req.params.IS_ADM = true;

    return next();
  } catch (err) {
    return res.status(400).send({ error: "Zoológico não encontrado!" });
  }
};

module.exports = admMiddleware;
