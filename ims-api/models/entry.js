import mongoose from "mongoose";
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
    date: { 
        type: Date, 
        default: Date.now },
    vehicle: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    stopTime: {
        type: String,
        required: true
    },
    totalHour: {
        type: String,
        required: true
    },
    vbd: {
        type: String,
        required: true
    },
    dailyDiesel: {
        type: String,
        required: true
    },
    purchaseDiesel: {
        type: String,
        required: true
    },
    advance: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: true
    },
    opName: {
        type: String,
        required: true
    },
    attendance: {
        type: String,
        required: true
    }
});

export default mongoose.model("entry", EntrySchema);