import mongoose from "mongoose";

const symptomSchema = new mongoose.Schema(
  {
    symptoms: {
      type: String,
      required: true,
    },
    severity: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    causes: {
      type: String,
    },
    advice: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Symptom", symptomSchema);
