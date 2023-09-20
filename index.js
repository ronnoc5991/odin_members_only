const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");

dotenv.config();

mongoose.set("strictQuery", false);

const connectToDb = async () => {
  await mongoose.connect(process.env.MONGO_DB);
};

connectToDb().catch((err) => console.log(err));

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// TODO:
// add public folder for any static assets, tell express about them (app.use(express.static(path.join(__dirname, "public"))));)

app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
