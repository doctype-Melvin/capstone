import mongoose from "mongoose";

const { Schema } = mongoose;

const planSchema = new Schema({
    days: Number,
    focus: String
})

const Plan = mongoose.models.Plan || mongoose.model('Plan', planSchema);

export default Plan;