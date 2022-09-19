const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: String, require: true },
  Password: { type: String, require: true },
  emailAddress: { type: Array, require: true },
});

module.exports = mongoose.model("User", userSchema);
