import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Login = () => {
  const navigate = useNavigate();

  const [patientID, setPatientID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8002/login", {
        method: "POST",
        credentials: "include", // IMPORTANT for cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ patientID, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // ✅ SUCCESS
      if (data.role === "Admin") navigate("/admin");
      else if (data.role === "Doctor") navigate("/doctor");
      else navigate("/patient");

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
        <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">

          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-center mt-2">
            Login to manage your appointments
          </p>

          {error && (
            <div className="mt-4 text-sm text-red-600 text-center">
              {error}
            </div>
          )}

          <form className="mt-8 space-y-5" onSubmit={handleLogin}>

            {/* Patient ID */}
            <div>
              <label className="block text-gray-600 mb-1">
                Patient ID
              </label>
              <input
                type="number"
                value={patientID}
                onChange={(e) => setPatientID(e.target.value)}
                placeholder="Enter patient ID"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-gray-500 mt-6">
            Don’t have an account?
            <Link
              to="/signup"
              className="text-blue-600 hover:underline ml-1"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
