import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from '../components/AdminNav.jsx';

const AdminHome = () => {
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("/api/doctors", {
        withCredentials: true,
      });
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load doctors");
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const deleteDoctor = async (doctorID) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this doctor?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/admin/doctor/${doctorID}`, {
        withCredentials: true,
      });
      fetchDoctors();
    } catch (err) {
      console.error(err);
      alert("Failed to delete doctor");
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-28 px-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-10">
          Doctors
        </h1>

        <div className="grid gap-6 max-w-6xl mx-auto sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doc) => (
            <div
              key={doc.doctorID}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                Dr. {doc.name}
              </h2>

              <p className="text-gray-600 mt-1">
                Department: {doc.department}
              </p>

              <p className="text-gray-500 text-sm">
                Doctor ID: {doc.doctorID}
              </p>

              <p className="text-gray-500 text-sm">
                Age: {doc.age} | Sex: {doc.sex}
              </p>

              <button
                onClick={() => deleteDoctor(doc.doctorID)}
                className="mt-5 w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
              >
                Remove Doctor
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminHome;
