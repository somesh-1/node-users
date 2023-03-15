const express = require("express");
const mongoose = require("mongoose");
const app = express();

const routes = require("./routes/routes");
require("dotenv").config();

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;
app.use(express.json());
app.use("/api", routes);
database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const port = 8000;
app.listen(port, () => {
  console.log(`localhost running on port ${port}`);
});
