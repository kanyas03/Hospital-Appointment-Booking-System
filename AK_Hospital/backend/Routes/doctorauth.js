import { Router } from "express";
import authenticate from "../middleware/auth.js";
import { isDoctor } from "../middleware/roleCheck.js";
import { Appointment } from "../model/Appoiment.js";
import Doctor from "../model/Doctor.js";
const doctorauth = Router();


doctorauth.get(
  "/doctor/appointments",
  authenticate,
  isDoctor,
  async (req, res) => {
    try {
      // 1. Find doctor using logged-in doctor's ID
      const doctor = await Doctor.findOne({
        doctorID: req.user.patientID
      });

      if (!doctor) {
        return res.status(404).json({ message: "Doctor profile not found" });
      }

      // 2. Fetch only this doctor's appointments
      const appointments = await Appointment.find({
        doctor: doctor._id
      })
        .populate("patient", "firstName lastName patientID")
        .sort({ date: 1 });

      res.status(200).json({
        success: true,
        count: appointments.length,
        appointments
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

doctorauth.put(
  "/doctor/appointment/:id",
  authenticate,
  isDoctor,
  async (req, res) => {
    try {
      const { status } = req.body;

      if (!["Accepted", "Completed", "Cancelled"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      // 1. Find doctor
      const doctor = await Doctor.findOne({
        doctorID: req.user.patientID
      });

      if (!doctor) {
        return res.status(404).json({ message: "Doctor profile not found" });
      }

      // 2. Update ONLY if appointment belongs to this doctor
      const appointment = await Appointment.findOneAndUpdate(
        {
          _id: req.params.id,
          doctor: doctor._id
        },
        { status },
        { new: true }
      );

      if (!appointment) {
        return res.status(404).json({
          message: "Appointment not found or unauthorized"
        });
      }

      res.status(200).json({
        message: "Appointment status updated successfully",
        appointment
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

export default doctorauth;
