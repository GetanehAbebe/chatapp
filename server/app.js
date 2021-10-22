const express = require("express");
const app = express();
const cors = require("cors")
const usersRouter = require('./routes/users')
const contactRouter = require('./routes/contacts')
const conversationRouter = require('./routes/conversations')
const errorHandlers = require("./handlers/errorHandlers");
const auth = require('./middlewares/auth')
const multer = require('multer')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Setup Cross Origin
app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'UPDATE'],
    credentials: true
}));


app.use("/api/user", usersRouter);
app.use("/api/contact", contactRouter);
app.use("/api/conversation", conversationRouter);


app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoseErrors);
if (process.env.ENV === "DEVELOPMENT") {
    app.use(errorHandlers.developmentErrors);
} else {
    app.use(errorHandlers.productionErrors);
}

module.exports = app;
