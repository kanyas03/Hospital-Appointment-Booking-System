import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserNavbar from "../components/userNav.jsx";
const UserHome = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/doctors");
        setDoctors(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <>
      <UserNavbar />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-24 px-6">
        
        {/* Hospital Name */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          AK Hospital – Doctors Available
        </h1>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                Dr. {doctor.name}
              </h2>
              <p className="text-gray-500 mt-1">
                Department: {doctor.department}
              </p>
              <p className="text-gray-500">
                Experience: {doctor.experience} years
              </p>

              <button
                onClick={() =>
                  navigate("/book-appointment", {
                    state: {
                      doctorId: doctor._id,
                      doctorName: doctor.name,
                      department: doctor.department,
                    },
                  })
                }
                className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserHome;
