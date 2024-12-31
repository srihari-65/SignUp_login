const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const userRoutes = require("./routers/userRoutes");

// Database connection
const connect = () => {
  try {
    mongoose.connect("mongodb://localhost:27017/SignUp");
    console.log("Connected to Database of MongoDB");
  } catch (err) {
    console.log(err.message);
  }
};

// Middleware
app.use(cors());
// app.use(express.json());

// used to parse json requests
app.use(bodyParser.json());

// Routes
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("server is working....");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connect();
});

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log("Server is listening on port", 8001);
//   connect();
// });
