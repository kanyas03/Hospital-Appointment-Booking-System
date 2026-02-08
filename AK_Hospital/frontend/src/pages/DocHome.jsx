import { useEffect, useState } from "react";
import axios from "axios";
import DoctorNavbar from "../components/docNav.jsx";
const DoctorHome = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("/api/doctor/appointments", {
        withCredentials: true,
      });
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load appointments");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `/api/doctor/appointment/${id}`,
        { status },
        { withCredentials: true }
      );
      fetchAppointments();
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  return (
    <>
      <DoctorNavbar />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-28 px-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-10">
          My Appointments
        </h1>

        <div className="max-w-5xl mx-auto space-y-5">
          {appointments.length === 0 ? (
            <p className="text-center text-gray-500">
              No appointments yet
            </p>
          ) : (
            appointments.map((appt) => (
              <div
                key={appt._id}
                className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center"
              >
                <div>
                  <h2 className="font-semibold text-gray-800">
                    Patient ID: {appt.patient.patientID}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Date: {appt.date}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Time: {appt.timeSlot}
                  </p>
                  <p className="text-sm mt-1">
                    Status:{" "}
                    <span
                      className={`font-semibold ${
                        appt.status === "Accepted"
                          ? "text-green-600"
                          : appt.status === "Rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    disabled={appt.status !== "Pending"}
                    onClick={() => updateStatus(appt._id, "Accepted")}
                    className={`px-4 py-2 rounded-lg font-semibold transition
                      ${
                        appt.status !== "Pending"
                          ? "bg-gray-300 cursor-not-allowed text-gray-600"
                          : "bg-green-500 hover:bg-green-600 text-white"
                      }`}
                  >
                    Accept
                  </button>

                  <button
                    disabled={appt.status !== "Pending"}
                    onClick={() => updateStatus(appt._id, "Rejected")}
                    className={`px-4 py-2 rounded-lg font-semibold transition
                      ${
                        appt.status !== "Pending"
                          ? "bg-gray-300 cursor-not-allowed text-gray-600"
                          : "bg-red-500 hover:bg-red-600 text-white"
                      }`}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default DoctorHome;
