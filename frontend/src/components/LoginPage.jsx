import React, { useState } from 'react'
import Navbar from './Navbar'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { doSignInWithEmailAndPassword } from '../firebase/auth';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post("/login", { email, password });

    const userId = response.data._id;
localStorage.setItem("userId", userId);


    toast.success("Successfully logged in!");
    navigate("/homepage");
  } catch (error) {
    console.log("Failed to log in", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Failed to login");
  }
};

  return (
    <div>
      <Navbar/>
      <div className="h-screen bg-gradient-to-t from-blue-500 via-color-base-100 to-color-base-100 flex items-center justify-center">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit}>

              <div className="text-black">
              <label className="text-gray-700 font-medium">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="w-full mt-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none text-black"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="w-full mt-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none text-black"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:opacity-90 transition duration-200 mt-3"
            >
              Login
            </button>

            <p className='text-black text-center mt-1'>Dont have an accout? <Link to={"/signup"}className='text-blue-500 hover:underline'>Sign up</Link></p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
