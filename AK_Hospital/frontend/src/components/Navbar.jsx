import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo / Project Name */}
        <h1 className="text-xl font-bold text-blue-600">
          AS Hospital
        </h1>

        {/* Links */}
        <div className="space-x-6 hidden md:flex">
          <Link to="/" className="text-gray-600 hover:text-blue-600">
            Home
          </Link>
          <Link to="/login" className="text-gray-600 hover:text-blue-600">
            Login
          </Link>
          <Link to="/signup" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Signup
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
