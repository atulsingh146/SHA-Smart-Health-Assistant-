import mongoose from "mongoose";

const healthSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: String, required: true },
    sleepHours: Number,
    waterGlasses: Number,
    mood: String,
    temperature: Number,
  },
  { timestamps: true }
);

export default mongoose.model("HealthLog", healthSchema);
