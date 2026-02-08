import { Link } from "react-router-dom";

const UserNavbar = () => {
  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">
          AS Hospital
        </h1>

        <div className="space-x-6">
          <Link to="/patient/home" className="text-gray-600 hover:text-blue-600">
            Home
          </Link>
          <Link to="/patient/appointments" className="text-gray-600 hover:text-blue-600">
            My Appointments
          </Link>
          <button className="text-red-500 hover:underline">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
