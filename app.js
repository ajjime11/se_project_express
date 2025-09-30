const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { createUser, login } = require("./controllers/users");
const errorHandler = require("./middlewares/error-handler");
const { errors } = require("celebrate");

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());
app.use(cors());

const users = require("./routes/users");
const clothingItems = require("./routes/clothingItems");

const { validateUserBody, validateLogin } = require("./middlewares/validation");
app.post("/signup", validateUserBody, createUser);
app.post("/signin", validateLogin, login);

app.use("/items", clothingItems);
app.use("/users", users);

app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
