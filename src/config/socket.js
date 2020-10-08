const socket = require("socket.io");

module.exports = (server) => {
  const io = socket(server);

  let users = [];

  const welcomeMessage = (name) => {
    return {
      _id: new Date(),
      text: `${name} acabou de se juntar ao chat`,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "Admin",
      },
    };
  };

  function userJoin(id, name, room) {
    users.push({ id, name, room });
  }

  function getUser(id) {
    return users.find((item) => item.id === id);
  }

  const onUserJoin = (socket, { name, room }) => {
    userJoin(socket.id, name, room);
    socket.join(room);
    io.to(room).emit("message", [welcomeMessage(name)]);
  };

  const onUserMessage = (socket, msg) => {
    const user = getUser(socket.id);
    if (user == null || user == undefined) return;
    io.to(user.room).emit("message", msg);
  };

  io.on("connection", (socket) => {
    socket.on("join", (user) => onUserJoin(socket, user));
    socket.on("message", (msg) => onUserMessage(socket, msg));
  });
};
