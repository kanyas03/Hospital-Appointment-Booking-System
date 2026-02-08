import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../model/user.js";
import Doctor from "../model/Doctor.js";
import authenticate from "../middleware/auth.js";
import { isAdmin } from "../middleware/roleCheck.js";
import { isPatient } from "../middleware/roleCheck.js";
import { Appointment } from "../model/Appoiment.js";

const userauth = Router();


userauth.post("/signup", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      patientID,
      age,
      sex,
      phone,
      address,
      password,
      confirmPassword,
      userRole
    } = req.body;


    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

  
    const existingUser = await User.findOne({ patientID });
    if (existingUser) {
      return res.status(400).json({ message: "Patient ID already exists" });
    }

    if (userRole === "Admin") {
      const adminExists = await User.findOne({ userRole: "Admin" });
      if (adminExists) {
        return res.status(403).json({ message: "Admin already exists" });
      }
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = new User({
      firstName,
      lastName,
      patientID,
      age,
      sex,
      phone,
      address,
      password: hashedPassword,
      userRole
    });

    await newUser.save();
    res.status(201).json({ message: "Signup successful" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


userauth.post("/login", async (req, res) => {
  try {
    const { patientID, password } = req.body;

    const user = await User.findOne({ patientID });
    if (!user) {
      return res.status(404).json({ message: "Invalid Patient ID" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        patientID: user.patientID,
        userRole: user.userRole
      },
      process.env.SECRET_KEY,
      { expiresIn: "2h" }
    );

    res.cookie("ASH", token, {
      httpOnly: true,
      sameSite: "lax"
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      role: user.userRole
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
userauth.get(
  "/doctors",
  authenticate,
  async (req, res) => {
    const doctors = await Doctor.find(
      {},
      { name: 1, doctorID: 1, department: 1, sex: 1, age: 1 }
    );

    res.status(200).json(doctors);
  }
);

userauth.get("/admin/doctors/department/:dept",authenticate,isAdmin,
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
userauth.post(
  "/patient/book-appointment",
  authenticate,
  isPatient,
  async (req, res) => {
    try {
      const { doctorID, date, timeSlot } = req.body;

      if (!doctorID || !date || !timeSlot) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // 1. Get doctor from DB
      const doctor = await Doctor.findOne({ doctorID });
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }

      // 2. Create appointment
      const appointment = new Appointment({
        patient: req.user.userId,
        doctor: doctor._id,
        date,
        timeSlot
      });

      await appointment.save();

      res.status(201).json({
        message: "Appointment booked successfully",
        appointment: {
          doctorName: doctor.name,
          department: doctor.department,
          date,
          timeSlot,
          status: "Pending"
        }
      });

    } catch (error) {
      // Double booking
      if (error.code === 11000) {
        return res
          .status(400)
          .json({ message: "This time slot is already booked" });
      }

      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

userauth.get(
  "/patient/appointments",
  authenticate,
  isPatient,
  async (req, res) => {
    const appointments = await Appointment.find({
      patient: req.user.userId
    })
      .populate("doctor", "name department doctorID")
      .sort({ createdAt: -1 });

    res.status(200).json(appointments);
  }
);

userauth.put(
  "/patient/cancel/:id",
  authenticate,
  isPatient,
  async (req, res) => {
    const appointment = await Appointment.findOneAndUpdate(
      { _id: req.params.id, patient: req.user.userId },
      { status: "Cancelled" },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment cancelled" });
  }
);
export{userauth}