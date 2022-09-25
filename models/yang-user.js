// require statements
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// user schema
const userSchema = new Schema({
  userName: { type: String, require: true },
  Password: { type: String, require: true },
  emailAddress: { type: Array, require: true },
});

// Export the user module
module.exports = mongoose.model("User", userSchema);
