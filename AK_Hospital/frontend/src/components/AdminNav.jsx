import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const logout = async () => {
    await axios.post("/api/logout", {}, { withCredentials: true });
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">
          AS Hospital
        </h1>

        <div className="flex gap-6 text-gray-700 font-medium">
          <Link to="/admin" className="hover:text-blue-600">
            Doctors
          </Link>
          <Link to="/admin/appointments" className="hover:text-blue-600">
            Appointments
          </Link>
          <button
            onClick={logout}
            className="text-red-500 hover:text-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
