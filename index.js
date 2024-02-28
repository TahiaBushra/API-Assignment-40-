require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Express app
const app = express();

// Middlewares
app.use(express.json());
app.use(cors({ credentials: true }));

// Test API
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to our server",
  });
});

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/books", bookRouter);

// Port
const port = process.env.PORT || 8080;

// URI
const uri = process.env.MONGODB_URI;

// DB connection
mongoose
  .connect(uri)
  .then(() => {
    app.listen(port, () => {
      console.log(`Surver running on port:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
