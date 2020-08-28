require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("./controllers/AnimalController.js")(app);
require("./controllers/AuthController.js")(app);
require("./controllers/projectController.js")(app);
require("./controllers/ZooController.js")(app);
require("./uplode.js")(app);
require("./image.js")(app);

app.listen(3000);
