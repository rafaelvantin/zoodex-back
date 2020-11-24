require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const cors = require("cors");

app.use(cors({ origin: ["http://localhost:8080", "https://zoodex-web.herokuapp.com/"] }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("./controllers/AnimalController.js")(app);
require("./controllers/ZooController.js")(app);
require("./controllers/AuthController.js")(app);
require("./controllers/UserController.js")(app);

app.listen(process.env.PORT || 3000);
