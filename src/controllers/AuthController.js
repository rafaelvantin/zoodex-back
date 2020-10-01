const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authMiddleware = require("../middlewares/auth.js");
const authConfig = require("../config/auth.json");

const Zoo = require("../models/zoo.js");

function generateToken(params = {}) {
  return (token = jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  }));
}

router.get("/", authMiddleware, (req, res) => {
  res.send({ ok: true, zoo: req.params.ZOO_ID });
});

router.post("/authenticate", async (req, res) => {
  const { email, password } = req.body;

  const zoo = await Zoo.findOne({ email }).select("+password");

  if (!zoo) return res.status(400).send({ error: "Zoo not found" });

  if (!(await bcrypt.compare(password, zoo.password))) return res.status(400).send({ error: "Invalid password" });

  res.send({
    zoo,
    token: generateToken({ id: zoo.id }),
  });
});

module.exports = (app) => app.use("/auth", router);
