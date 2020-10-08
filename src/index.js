require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const cors = require("cors");

app.use(cors({ origin: ["http://localhost:8080"] }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("./controllers/AnimalController.js")(app);
require("./controllers/ZooController.js")(app);
require("./controllers/AuthController.js")(app);

const server = require("http").createServer(app);
require("./config/socket.js")(server);

server.listen(process.env.PORT || 3000);
