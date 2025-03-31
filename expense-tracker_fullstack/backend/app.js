const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const { readdirSync } = require("fs");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use(cors());

// Auth routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/v1/auth", authRoutes);

// Other routes
readdirSync("./routes").map((route) => {
  if (route !== "authRoutes.js") {
    app.use("/api/v1", require("./routes/" + route));
  }
});

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("listening to port:", PORT);
  });
};

server();
