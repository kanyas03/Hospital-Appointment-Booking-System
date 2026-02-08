  import mongoose from "mongoose";

  const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },

    doctorID: {
      type: Number,
      required: true,
      unique: true
    },

    sex: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true
    },

    age: { type: Number, required: true },

    department: { type: String, required: true },

  });

  export default mongoose.model("Doctor", doctorSchema);
