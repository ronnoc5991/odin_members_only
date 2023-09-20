const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// TODO: define maxLengths in one central location, use across app (here, validation, etc)

const MessageSchema = new Schema({
  title: { type: String, required: true, maxLength: 50 },
  body: { type: String, required: true, maxLength: 180 },
  timestamp: { type: Number, required: true },
  author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Message", MessageSchema);
