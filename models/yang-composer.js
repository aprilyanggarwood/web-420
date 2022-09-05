/* Title: yang-composer.js
Author: Professor Krasso
Date: 08 31 2022
Modified By: April Yang
Description: Composer Schema for mongodb
 */

// require statements
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// composer schema
const composerSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
});

// Export the composer module
module.exports = mongoose.model("Composer", composerSchema);
