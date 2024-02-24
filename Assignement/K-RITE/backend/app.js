const express = require("express");
const cookieParser = require(`cookie-parser`);
const bodyparser = require(`body-parser`);
const app = express();

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());

const auth = require(`./routes/auth`);
const task = require("./routes/task");

app.use(`/api/v1`, auth);
app.use(`/api/v1`, task);

module.exports = app;
