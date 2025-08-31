import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { doCreateUserWithEmailAndPassword, doSendEmailVerification } from "../firebase/auth";
import { auth } from "../firebase/firebase";
import { updateProfile } from "firebase/auth";
import api from "../lib/axios";

const SignUpPage = () => {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate()
const [loading, setLoading] = useState(false); // New loading state

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if(!name || ! email || !password){
      toast.error("All fields are required")
      return;
    }
    setLoading(true); // Set loading to true
 
    try {
      const userCredential = await doCreateUserWithEmailAndPassword(email, password);
      if (auth.currentUser && name) {
        await updateProfile(auth.currentUser, { displayName: name });
      }
      // Send user data to your backend after successful Firebase signup
      await api.post("/signup", { name, email, password });

      await doSendEmailVerification();
      localStorage.setItem("userId", userCredential.user.uid);
      toast.success("Successfully signed up. Please check your email to verify your account.")
      navigate("/login")
    } catch (error) {
      console.log("error in signup",error)
      toast.error("error in signing up")
    } finally {
        setLoading(false); // Set loading to false in finally block
    }
  };

  return (
    <>
      <Navbar />
      <div className="h-screen bg-gradient-to-t from-blue-500 via-color-base-100 to-color-base-100 flex items-center justify-center">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
            Create Your Account
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="text-gray-700 font-medium">Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)}
                type="text"
                className="w-full mt-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none text-black"
                placeholder="Enter your name"
              />
            </div>

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
              className="bg-gradient-to-r bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:opacity-90 transition duration-200"
              disabled={loading} // Disable button when loading
            >
              {loading ? "Signing Up..." : "Sign Up"} {/* Display loader text */}
            </button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-6">
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-500 font-semibold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
