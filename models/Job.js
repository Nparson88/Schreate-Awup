const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const JobSchema = new Schema(
  {
    company: {
      type: String,
      trim: true,
      required: "Enter company name"
    },
    budget: {
      type: Number,
      required: "Enter an amount"
    },
    dateStarted : {
      type: Date,
      default: Date.now
    },
    finshDate: {
        type: Date,
        default: Date.now + 7
    }
  }
);

const Job = mongoose.model("Job", JobSchema);

module.exports = Job;