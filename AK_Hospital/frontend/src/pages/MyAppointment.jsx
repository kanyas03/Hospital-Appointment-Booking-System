import { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../components/userNav";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch appointments
  const fetchAppointments = async () => {
    try {
      const res = await axios.get("/api/patient/appointments", {
        withCredentials: true,
      });
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Cancel appointment
  const cancelAppointment = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );
    if (!confirmCancel) return;

    try {
      await axios.put(`/api/patient/cancel/${id}`, {}, {
        withCredentials: true,
      });
      fetchAppointments(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Unable to cancel appointment");
    }
  };

  return (
    <>
      <UserNavbar />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-28 px-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-10">
          My Appointments
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : appointments.length === 0 ? (
          <p className="text-center text-gray-500">
            No appointments booked yet
          </p>
        ) : (
          <div className="grid gap-6 max-w-5xl mx-auto md:grid-cols-2">
            {appointments.map((appt) => (
              <div
                key={appt._id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold text-gray-800">
                  Dr. {appt.doctor.name}
                </h2>

                <p className="text-gray-600 mt-1">
                  Department: {appt.doctor.department}
                </p>

                <p className="text-gray-600">
                  Doctor ID: {appt.doctor.doctorID}
                </p>

                <div className="mt-4 space-y-1 text-sm text-gray-500">
                  <p>Date: <span className="font-medium">{appt.date}</span></p>
                  <p>
                    Time Slot:{" "}
                    <span className="font-medium">{appt.timeSlot}</span>
                  </p>
                  <p>
                    Status:{" "}
                    <span
                      className={`font-semibold ${
                        appt.status === "Cancelled"
                          ? "text-red-500"
                          : "text-green-600"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </p>
                </div>

                <button
                  disabled={appt.status === "Cancelled"}
                  onClick={() => cancelAppointment(appt._id)}
                  className={`mt-5 w-full py-2 rounded-lg font-semibold transition
                    ${
                      appt.status === "Cancelled"
                        ? "bg-gray-300 cursor-not-allowed text-gray-600"
                        : "bg-red-500 hover:bg-red-600 text-white"
                    }`}
                >
                  Cancel Appointment
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyAppointments;
