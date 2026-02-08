import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNav.jsx";
const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAllAppointments = async () => {
      try {
        const res = await axios.get("/api/admin/appointments", {
          withCredentials: true,
        });
        setAppointments(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load appointments");
      }
    };

    fetchAllAppointments();
  }, []);

  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-28 px-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-10">
          All Appointments
        </h1>

        <div className="max-w-6xl mx-auto space-y-4">
          {appointments.map((appt) => (
            <div
              key={appt._id}
              className="bg-white shadow-md rounded-xl p-6 flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold text-gray-800">
                  Dr. {appt.doctor.name} ({appt.doctor.department})
                </h2>
                <p className="text-gray-500 text-sm">
                  Patient ID: {appt.patient.patientID}
                </p>
                <p className="text-gray-500 text-sm">
                  Date: {appt.date} | {appt.timeSlot}
                </p>
              </div>

              <span
                className={`px-4 py-1 rounded-full text-sm font-semibold
                  ${
                    appt.status === "Cancelled"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
              >
                {appt.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminAppointments;
