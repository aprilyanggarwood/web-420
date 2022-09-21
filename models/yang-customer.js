const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lineItemSchema = new Schema({
  name: { type: String, require: true },
  price: { type: Number, require: true },
  quantity: { type: Number, require: true },
});

const invoiceSchema = new Schema({
  subtotal: { type: Number, require: true },
  tax: { type: Number, require: true },
  dateCreated: { type: String, require: true },
  dateShipped: { type: String, require: true },
  lineItems: [lineItemSchema],
});

const customerSchema = new Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  userName: { type: String, require: true },
  invoices: [invoiceSchema],
});

module.exports = mongoose.model("Customer", customerSchema);
