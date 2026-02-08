import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import UserNavbar from "../components/userNav.jsx";

const BookAppointment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { doctorId, doctorName, department } = state || {};

  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointmentData = {
      doctorId,
      date,
      timeSlot,
    };

    try {
      await axios.post("http://localhost:8002/api/appointments", appointmentData);
      alert("Appointment booked successfully");
      navigate("/user-home");
    } catch (error) {
      console.error(error);
      alert("Failed to book appointment");
    }
  };

  return (
    <>
      <UserNavbar />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center pt-24 px-4">
        <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
          
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Book Appointment
          </h2>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            
            <div>
              <label className="block text-gray-600 mb-1">Doctor Name</label>
              <input
                type="text"
                value={doctorName}
                disabled
                className="w-full px-4 py-3 border rounded-lg bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Department</label>
              <input
                type="text"
                value={department}
                disabled
                className="w-full px-4 py-3 border rounded-lg bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Time Slot</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select time</option>
                <option>09:00 AM – 10:00 AM</option>
                <option>10:00 AM – 11:00 AM</option>
                <option>11:00 AM – 12:00 PM</option>
                <option>02:00 PM – 03:00 PM</option>
                <option>03:00 PM – 04:00 PM</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Confirm Appointment
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookAppointment;
