const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log("Database connected"))
  .catch((error) => console.log("Database got some issues", error));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", require("./routes/userRoutes"));

module.exports = app;
