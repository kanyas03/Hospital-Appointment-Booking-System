import { Router } from "express";
import Doctor from "../model/Doctor.js";
import authenticate from "../middleware/auth.js";
import { isAdmin } from "../middleware/roleCheck.js";


const adminauth = Router();
adminauth.post("/admin/add-doctor",authenticate,
  isAdmin,
  async (req, res) => {
    try {
      const { name, doctorID, sex, age, department } = req.body;

      const exists = await Doctor.findOne({ doctorID });
      if (exists) {
        return res.status(400).json({ message: "Doctor already exists" });
      }

      const doctor = new Doctor({
        name,
        doctorID,
        sex,
        age,
        department
      });

      await doctor.save();
      res.status(201).json({ message: "Doctor added successfully" });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);
adminauth.get(
  "/admin/doctors",
  authenticate,
  isAdmin,
  async (req, res) => {
    try {
      const doctors = await Doctor.find();
      res.status(200).json(doctors);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

adminauth.get("/admin/doctors/department/:dept",authenticate,isAdmin,
  async (req, res) => {
    try {
      const doctors = await Doctor.find(
        { department: req.params.dept },
     
      );

      res.status(200).json(doctors);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);
adminauth.put(
  "/admin/doctors/:doctorID",
  authenticate,
  isAdmin,
  async (req, res) => {
    try {
      const { name, sex, age, department } = req.body;

      const doctor = await Doctor.findOneAndUpdate(
        { doctorID: req.params.doctorID },
        { name, sex, age, department },
        { new: true }
      );

      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }

      res.status(200).json({ message: "Doctor updated successfully" });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

adminauth.delete(
  "/admin/doctors/:doctorID",authenticate,isAdmin,
  async (req, res) => {
    try {
      const doctor = await Doctor.findOneAndDelete({
        doctorID: req.params.doctorID
      });

      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }

      res.status(200).json({ message: "Doctor deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

adminauth.get(
  "/admin/appointments",
  authenticate,
  isAdmin,
  async (req, res) => {
    const appointments = await Appointment.find()
      .populate("doctor", "name department doctorID")
      .populate("patient", "firstName lastName patientID")
      .sort({ createdAt: -1 });

    res.status(200).json(appointments);
  }
);


export default adminauth;
