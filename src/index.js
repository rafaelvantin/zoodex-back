require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const server = require("http").createServer(app);
const io = require("socket.io")(server);

let users = [];

const exampleMessage = {
  _id: 1,
  text: "Bom dia 73B!",
  createdAt: new Date(),
  user: {
    _id: 2,
    name: "Grupo Coffuel",
    avatar: "https://placeimg.com/140/140/any",
  },
};

function userJoin(id, name, room) {
  users.push({ id, name, room });
}

function getUser(id) {
  return users.find((item) => item.id === id);
}

// io.on("connection", (socket) => {
//   console.log(`${socket.id}`);
//   socket.on("join", ({ name, room }) => {
//     userJoin(socket.id, name, room);

//     socket.join(room);
//     setTimeout(() => socket.to(room).emit("message", [exampleMessage]), 3000);
//   });
//   socket.on("message", (msg) => {
//     const { room } = getUser(socket.id);
//     io.to(room).emit("message", msg);
//     console.log(msg);
//   });
// });

const cors = require("cors");

app.use(cors({ origin: ["http://localhost:8080"] }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("./controllers/AnimalController.js")(app);
require("./controllers/ZooController.js")(app);
require("./controllers/AuthController.js")(app);

server.listen(process.env.PORT || 3000);
