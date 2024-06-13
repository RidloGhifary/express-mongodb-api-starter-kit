const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});

app.use("/users", userRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = app;
