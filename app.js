const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { createUser, login } = require("./controllers/users");
const { auth } = require("./middlewares/auth");

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());
app.use(cors());

const users = require("./routes/users");
const clothingItems = require("./routes/clothingItems");

app.post("/signup", createUser);
app.post("/signin", login);

app.use(auth);

app.use("/items", clothingItems);
app.use("/users", users);

app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === 500 ? "An error has occurred on the server." : message,
  });
});

app.listen(PORT);
