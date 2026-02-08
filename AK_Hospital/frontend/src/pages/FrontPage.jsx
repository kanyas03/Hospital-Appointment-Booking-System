import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FrontPage = () => {
  const navigate = useNavigate();

  const titleText = "AS Hospital Appointment";
  const [text, setText] = useState("");
  const [i, setI] = useState(0);

  // typing effect
  useEffect(() => {
    if (i < titleText.length) {
      const timer = setTimeout(() => {
        setText(text + titleText[i]);
        setI(i + 1);
      }, 70);
      return () => clearTimeout(timer);
    }
  }, [i, text]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center">
      
      {/* Content Wrapper */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        
        {/* LEFT SIDE - TEXT */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            {text}
            <span className="text-blue-500 animate-pulse">|</span>
          </h1>

          <p className="mt-6 text-gray-600 text-lg max-w-md">
            A simple and secure way to book, manage, and track hospital
            appointments with trusted doctors.
          </p>

          <div className="mt-10 flex gap-4">
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Signup
            </button>
          </div>
        </div>

        {/* RIGHT SIDE - DECORATIVE UI */}
        <div className="hidden md:flex justify-center">
          <div className="w-80 h-80 rounded-full bg-gradient-to-tr from-blue-200 to-cyan-200 blur-3xl opacity-70"></div>
        </div>

      </div>
    </div>
  );
};

export default FrontPage;
