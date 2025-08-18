import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/homepage";
  const isSignupPage = location.pathname === "/signup";
  const isExamPage = location.pathname === "/exam";

  const handleLogout = () => {
    localStorage.removeItem("userId");
    window.location.href = "/login";
  }; 

  return (
    <nav className="bg-blue-500 shadow-xl rounded-2xl md:rounded-xl md:mx-4 p-4 sticky top-0 z-50 transition-all duration-300 mt-2">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo and Home Link */}
        <Link to={isHomePage ? "/" : "/homepage"} className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
            <span role="img" aria-label="Books emoji" className="text-blue-600 text-xl">
              📚
            </span>
          </div>
          <h1 className="text-white font-extrabold text-2xl tracking-wide">
            Prep<span className="text-gray-900">Student</span>
          </h1>
        </Link>

       
        <div className="flex items-center space-x-3">
          {isSignupPage && (
            <Link to="/login">
              <button className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-gray-100 active:scale-95 transition-all duration-300">
                Log In
              </button>
            </Link>
          )}

          {isHomePage && (
            <Link to="/exam">
              <button className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-gray-100 active:scale-95 transition-all duration-300">
                Take a Test
              </button>
            </Link>
          )}

          {(isHomePage || isExamPage) && (
            <button
              onClick={handleLogout}
              className="bg-white text-black font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-red-600 active:scale-95 transition-all duration-300"
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;