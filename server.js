const express = require("express");
const app = express();
const socket = require("socket.io");
const cors = require("cors");
const { getRooms, getRoomById } = require("./rooms");
const { getUsers, joinUser, getUserById, logoutUser } = require("./user");

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8000;

app.get("/rooms", (req, res) => {
  const rooms = getRooms();
  res.status(200).send({ rooms });
});

app.get("/users", (req, res) => {
  const users = getUsers();
  res.status(200).send({ users });
});

var server = app.listen(port, () => {
  console.log(`Server is running on the port : ${port} `);
});

const io = socket(server);

io.on("connection", (socket) => {
  socket.on("join", ({ username, room_id }) => {
    const user = joinUser(socket.id, username, room_id);
    const room = getRoomById(room_id);

    console.log(socket.id, "<=id");
    socket.join(room_id);

    socket.emit("message", {
      user_id: user.user_id,
      username: user.username,
      text: `Welcome ${user.username} to room ${room.name}`,
      room: room.name,
    });

    socket.broadcast.to(room_id).emit("message", {
      user_id: user.user_id,
      username: user.username,
      text: `${user.username} has joined the chat`,
    });
  });

  socket.on("sendMessage", (text) => {
    const user = getUserById(socket.id);
    if (typeof(user.room_id)!== 'undefined') {
      io.to(user.room_id).emit("message", {
        user_id: user.user_id,
        username: user.username,
        text: text,
      });
      console.log(`User ${user.username} sent a message ${text}`);
    }
  });

  socket.on("disconnect", () => {
    const user = logoutUser(socket.id);

    if (user) {
      io.to(user.room_id).emit("message", {
        user_id: user.id,
        username: user.username,
        text: `${user.username} has left the chat`,
      });
    }
  });



});
