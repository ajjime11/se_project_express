const express = require("express");
const mongoose = require("mongoose");

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "68ce7f06412e5af95cffb254",
  };
  next();
});

const users = require("./routes/users");
const clothingItems = require("./routes/clothingItems");

app.use("/users", users);
app.use("/items", clothingItems);

app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
