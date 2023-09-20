const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 25 },
  last_name: { type: String, required: true, maxLength: 25 },
  username: { type: String, required: true, maxLength: 25 },
  hashed_password: { type: String, required: true },
  salt: { type: String, required: true },
  membership_status: { type: String }, // TODO: should/could this be a union type?
});

UserSchema.virtual("full_name").get(function () {
  return `${this.first_name} ${this.last_name}`;
});

module.exports = mongoose.model("User", UserSchema);
