const express = require('express');
const fs = require('fs')
const {connectMongoDb} = require('./views/connection')

// const users = require("./MOCK_DATA.json");
const { json } = require('stream/consumers');
const userRouter = require('./routes/user')
const logReqRes = require('./middlewares');

const app = express();
const PORT = 8000;

// Middleware - Plugin
app.use(express.urlencoded({ extended: false}));
app.use(logReqRes("log.txt"));

//Connections
connectMongoDb = ('mongodb://127.0.0.1:27017/myapp-1');
app.use(express.json())

//Routes
app.use("/user", userRouter);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
