// require statements
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// role schema
const roleSchema = new Schema({
  text: { type: String },
});

// dependant schema
const dependantSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
});

// person schema
const personSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  roles: [roleSchema],
  dependents: [dependantSchema],
  //   roles: { type: Array, roleSchema },
  //   dependents: { type: Array, dependantSchema },
  birthDate: { type: String },
});

// Export the person module
module.exports = mongoose.model("Person", personSchema);
