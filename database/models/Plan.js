import mongoose from "mongoose";

const { Schema } = mongoose;

const planSchema = new Schema({
  name: String,
  days: Number,
  routine: Array,
  isCurrent: Boolean,
});

const Plan = mongoose.models.Plan || mongoose.model("Plan", planSchema);

export default Plan;
