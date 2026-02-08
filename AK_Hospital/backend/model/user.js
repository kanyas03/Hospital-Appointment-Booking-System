import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },

  patientID: { type: Number, required: true, unique: true },
  sex: { type: String, enum: ["Male", "Female", "Other"] },
  age: { type: Number },

  phone: { type: Number, required: true },
  address: { type: String, required: true },

  password: { type: String, required: true },

  userRole: {
    type: String,
    enum: ["Admin", "Doctor", "Patient"],
    default: "Patient"
  }
});

const User = mongoose.model("User", userSchema);
export { User };
