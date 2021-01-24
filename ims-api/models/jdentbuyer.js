import mongoose from "mongoose";
// import Float from "mongoose-float";
var Float = require('mongoose-float').loadType(mongoose);
const Schema = mongoose.Schema;
import autoIncrement from 'mongoose-auto-increment';
 
var connection = mongoose.createConnection("mongodb://localhost/newjdent_db");
 
autoIncrement.initialize(connection);
 
const JdentBuyerSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  address: {
    type: String
  },
  emailId: {
    type: String
  },
  contactNo: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  invoiceNo: {
    type: String
  },
  deliveryNote: {
    type: String
  },
  supplierRef: {
    type: String
  },
  otherRef: {
    type: String
  },
  buyersOrderNo: {
    type: String
  },
  dispatchDocumentNo: {
    type: String
  },
  deliveryNoteDate: {
    type: String
  },
  dispatchedThrough: {
    type: String
  },
  destination: {
    type: String
  },
  termsOfDelivery: {
    type: String
  },
  srNo:{
    type: String
  },
  disriptionOfGoods:{
    type: String
  },
  sirNo:{
    type: String
  },
  modelNo:{
    type: String
  },
  hsnsac:{
    type: String
  },
  quantity:{
    type: String
  },
  rate:{
    type: String
  },
  per:{
    type: String
  },
  discount:{
    type: String
  },
  amount:{
    type: String
  },
  totalAmount:{
    type: String
  },
  totalAmountInWords: {
    type: String
  }
});

JdentBuyerSchema.plugin(autoIncrement.plugin, { model: 'jdentbuyer', field: 'invoiceNo', startAt: 1, incrementBy: 1 });

export default mongoose.model("jdentbuyer", JdentBuyerSchema);