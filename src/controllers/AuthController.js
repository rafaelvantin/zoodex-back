const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const mailgun = require("mailgun-js");
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });

const authMiddleware = require("../middlewares/auth.js");

const { getEmail } = require("../config/util");

const Zoo = require("../models/zoo.js");

const generateToken = (params = {}) => jwt.sign(params, process.env.JWT_SECRET, { expiresIn: 86400 });
const generateRecoveryToken = (params = {}) => jwt.sign(params, process.env.JWT_RECOVERY_SECRET, { expiresIn: 86400 });

router.get("/", authMiddleware, (req, res) => {
  res.send({ ok: true, zoo: req.params.ZOO_ID });
});

router.post("/authenticate", async (req, res) => {
  try {
    const { email, password } = req.body;

    const zoo = await Zoo.findOne({ email }).select("+password");

    if (!zoo) return res.status(400).send({ error: "Zoo not found" });

    if (!(await bcrypt.compare(password, zoo.password))) return res.status(400).send({ error: "Invalid password" });

    res.send({
      zoo,
      token: generateToken({ id: zoo._id }),
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

router.post("/recovery/forgot", async (req, res) => {
  try {
    const { email } = req.body;

    const zoo = await Zoo.findOne({ email });

    if (!zoo) return res.send({ error: "No zoo found with that email" });

    const token = generateRecoveryToken({ id: zoo.id });

    const data = {
      from: "noreply@coffuel.com",
      to: email,
      subject: "Recuperação de Senha",
      html: getEmail(token),
    };

    await mg.messages().send(data);

    const updatedZoo = await Zoo.updateOne({ _id: zoo._id }, { recoveryToken: token });

    return res.send({ message: "Email foi enviado, cheque sua caixa de mensagem por favor" });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

router.post("/recovery/reset", async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token) return res.status(400).send({ error: "No token provided" });

    const { id } = jwt.verify(token, process.env.JWT_RECOVERY_SECRET);

    const zoo = await Zoo.findOne({ _id: id });

    if (!zoo) return res.status(400).send({ error: "Token invalido" });

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(zoo);

    const updatedZoo = await Zoo.updateOne(
      { recoveryToken: token, _id: id },
      { password: hashedPassword, recoveryToken: "" }
    );

    console.log(zoo);
    return res.send(updatedZoo);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

module.exports = (app) => app.use("/auth", router);
