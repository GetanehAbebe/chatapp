require("dotenv").config();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).then(() => {
  console.log('connected to database')
}).catch((e) => {
  console.log('faild to connect')
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose Connection ERROR: " + err.message);
});

mongoose.connection.once("open", () => {
  console.log("MongoDB Connected");
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose Connection ERROR: " + err.message);
});
//Bring in the models
require("./models/User");
require("./models/conversations");
require("./models/Message");
const Message = mongoose.model("Message");
const Conversation = mongoose.model("Conversation");
const User = mongoose.model("User");

const app = require("./app");
const server = app.listen(5000, () => {
  console.log("Server listening on port 5000");
});

const io = require("socket.io")(server, {
  allowEIO3: true,
  cors: {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'UPDATE'],
    credentials: true
  }
});



io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const payload = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    socket.userId = payload.id;
    next();
  } catch (err) {
    console.log(err)
  }
});

io.on("connection", (socket) => {
  console.log("Connected: " + socket.userId);
  socket.on("joinRoom", async ({ chatroomId, userId }) => {
    console.log('join room')
    if (chatroomId !== 0) {
      socket.join(chatroomId);
      console.log("A user joined chatroom: " + chatroomId, "userId", userId);
      const room = await Conversation.findById(chatroomId)
      const member = room?.participants.find(user => user.userId === userId)
      const joinDay = new Date(member.joinDay).getTime()
      if (room) {
        const updatedViwers = room.messages.map((message, i) => {
          if (i != 0 && (new Date(message.date).getTime() - joinDay) >= 0) {
            const newMessage = { ...message, viewers: Array.from(new Set([...message.viewers, userId])) }
            return newMessage
          }
          return message
        })
        room.messages = updatedViwers
        await room.save()
      }
    }
  });

  socket.on("leaveRoom", ({ chatroomId }) => {
    socket.leave(chatroomId);
    console.log("A user left chatroom: " + chatroomId);
  });
  socket.on("typing", ({ name }) => {
    console.log('typing')
    socket.broadcast.emit("typing", name);
  });

  socket.on("watchMessage", async ({ chatroomId, userId, messageId }) => {
    console.log(`watched by ${userId}`)
    const conversation = await Conversation.findById(chatroomId)
    if (conversation) {
      const updateViwers = conversation.messages.map(item => {
        if (item._id === messageId) {
          const newItem = { ...item, viewers: Array.from(new Set([...item.viewers, userId])) }
          return newItem
        }
        return item
      })

      conversation.messages = updateViwers
      const updateAll = await conversation.save()
      socket.to(chatroomId).emit("watchMessage", chatroomId)
      socket.broadcast.emit("watchMessage", {});
    }

  })

  socket.on("chatroomMessage", async ({ chatroomId, message, userId }) => {

    if (message.content.trim().length > 0) {
      const user = await User.findById(userId);
      const newMessage = new Message({ ...message, roomId: chatroomId })
      const room = await Conversation.findById(chatroomId)
      const messagesArray = [...room.messages, newMessage]

      io.to(chatroomId).emit("newMessage", {
        newMessage
      });
      room.messages = messagesArray

      await room.save()
      // console.log('room', room)
    }
  });
  socket.on("disconnect", () => {
    console.log("Disconnected: " + socket.userId);
  });
});
