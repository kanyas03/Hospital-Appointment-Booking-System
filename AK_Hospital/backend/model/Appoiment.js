import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true
    },
    date: {
      type: String,
      required: true
    },
    timeSlot: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Completed", "Cancelled"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

// Prevent double booking
appointmentSchema.index(
  { doctor: 1, date: 1, timeSlot: 1 },
  { unique: true }
);

export const Appointment = mongoose.model("Appointment", appointmentSchema);
