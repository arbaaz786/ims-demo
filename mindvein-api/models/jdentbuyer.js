import mongoose from 'mongoose';
// import Float from "mongoose-float";
import express from 'express';
var Float = require('mongoose-float').loadType(mongoose);
var config = require('../config/configFile.js');
const Schema = mongoose.Schema;
import autoIncrement from 'mongoose-auto-increment';
const app = express();
var uri = config.db[app.settings.env];
// var connection = mongoose.createConnection('mongodb://localhost/newjdent_db');

const connection = mongoose.createConnection(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

autoIncrement.initialize(connection);

const JdentBuyerSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  address: {
    type: String,
  },
  emailId: {
    type: String,
  },
  contactNo: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  invoiceNo: {
    type: String,
  },
  deliveryNote: {
    type: String,
  },
  supplierRef: {
    type: String,
  },
  otherRef: {
    type: String,
  },
  buyersOrderNo: {
    type: String,
  },
  dispatchDocumentNo: {
    type: String,
  },
  deliveryNoteDate: {
    type: String,
  },
  dispatchedThrough: {
    type: String,
  },
  destination: {
    type: String,
  },
  termsOfDelivery: {
    type: String,
  },
  srNo: {
    type: String,
  },
  disriptionOfGoods: {
    type: String,
  },
  sirNo: {
    type: String,
  },
  modelNo: {
    type: String,
  },
  hsnsac: {
    type: String,
  },
  quantity: {
    type: String,
  },
  rate: {
    type: String,
  },
  per: {
    type: String,
  },
  discount: {
    type: String,
  },
  amount: {
    type: String,
  },
  totalAmount: {
    type: String,
  },
  totalAmountInWords: {
    type: String,
  },
});

JdentBuyerSchema.plugin(autoIncrement.plugin, {
  model: 'jdentbuyer',
  field: 'invoiceNo',
  startAt: 1,
  incrementBy: 1,
});

export default mongoose.model('jdentbuyer', JdentBuyerSchema);
