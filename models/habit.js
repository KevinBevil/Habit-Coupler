const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const habitSchema = new Schema({
  habitname: { type: String, required: true }
});

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;
