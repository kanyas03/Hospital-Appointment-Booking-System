import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    patientID: "",
    age: "",
    sex: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8002/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      // ✅ SUCCESS
      navigate("/login");

    } catch (err) {
      setError("Server not responding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center pt-24">
        <div className="bg-white shadow-lg rounded-xl w-full max-w-2xl p-8">

          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Create Account
          </h2>
          <p className="text-gray-500 text-center mt-2">
            Register to manage your hospital appointments
          </p>

          {error && (
            <p className="text-center text-red-600 mt-4">{error}</p>
          )}

          <form
            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5"
            onSubmit={handleSignup}
          >
            {/* First Name */}
            <div>
              <label className="block text-gray-600 mb-1">First Name</label>
              <input
                name="firstName"
                onChange={handleChange}
                type="text"
                placeholder="Enter first name"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-gray-600 mb-1">Last Name</label>
              <input
                name="lastName"
                onChange={handleChange}
                type="text"
                placeholder="Enter last name"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Patient ID */}
            <div>
              <label className="block text-gray-600 mb-1">Patient ID</label>
              <input
                name="patientID"
                onChange={handleChange}
                type="number"
                placeholder="Enter patient ID"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-gray-600 mb-1">Age</label>
              <input
                name="age"
                onChange={handleChange}
                type="number"
                placeholder="Enter age"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-gray-600 mb-1">Gender</label>
              <select
                name="sex"
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-600 mb-1">Phone</label>
              <input
                name="phone"
                onChange={handleChange}
                type="text"
                placeholder="Enter phone number"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-gray-600 mb-1">Address</label>
              <input
                name="address"
                onChange={handleChange}
                type="text"
                placeholder="Enter address"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-600 mb-1">Password</label>
              <input
                name="password"
                onChange={handleChange}
                type="password"
                placeholder="Create password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-600 mb-1">Confirm Password</label>
              <input
                name="confirmPassword"
                onChange={handleChange}
                type="password"
                placeholder="Confirm password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {loading ? "Creating account..." : "Signup"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
