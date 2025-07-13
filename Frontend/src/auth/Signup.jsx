import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phoneNo: "",
    role: "passenger",
    licenseNumber: "",
    vehicleNumber: "",
    vehicleType: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};

    if (/^\d/.test(form.username)) {
      newErrors.username = "Username should not start with a number.";
    }
    if (/\d/.test(form.username)) {
      newErrors.username = "Name should not contain numbers.";
    }

    if (form.password.length < 5) {
      newErrors.password = "Password must be at least 5 characters.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
if (!emailRegex.test(form.email)) {
  newErrors.email = "Enter a valid email address.";
}

    if (!/^[1-9]\d{9}$/.test(form.phoneNo)) {
      newErrors.phoneNo = "Phone number must be 10 digits and not start with 0.";
    }

    if (form.role === "driver" && form.licenseNumber.length !== 16) {
      newErrors.licenseNumber = "License number must be exactly 16 characters.";
    }

    if (form.role === "driver") {
      if (!form.vehicleNumber.trim()) {
        newErrors.vehicleNumber = "Vehicle number is required.";
      }
      if (!form.vehicleType) {
        newErrors.vehicleType = "Vehicle type is required.";
      }
      
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await axios.post("http://localhost:5000/api/auth/signup", form);
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert("Signup failed");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-400">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-200 p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Sign Up</h2>

        <div>
          <input
            name="username"
            placeholder="Enter Name"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username}</p>
          )}
        </div>

        <input
          name="email"
          placeholder="Enter Email"
          type="email"
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <div>
          <input
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <div>
          <input
            name="phoneNo"
            type="text"
            placeholder="Enter Phone Number"
            maxLength="10"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors.phoneNo && (
            <p className="text-red-500 text-sm">{errors.phoneNo}</p>
          )}
        </div>

        <select
          name="role"
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">-- Select Role --</option>
          <option value="passenger">Passenger</option>
          <option value="driver">Driver</option>
        </select>

        {form.role === "driver" && (
          <>
            <div>
              <input
                name="licenseNumber"
                placeholder="License Number (16 chars)"
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.licenseNumber && (
                <p className="text-red-500 text-sm">{errors.licenseNumber}</p>
              )}
            </div>

            <div>
              <input
                name="vehicleNumber"
                placeholder="Vehicle Number"
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.vehicleNumber && (
                <p className="text-red-500 text-sm">{errors.vehicleNumber}</p>
              )}
            </div>

            <div>
              <select
                name="vehicleType"
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">-- Select Vehicle Type --</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="bike">Bike</option>
              </select>
              {errors.vehicleType && (
                <p className="text-red-500 text-sm">{errors.vehicleType}</p>
              )}
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300 font-semibold"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
        <p className="text-center text-sm text-gray-600">
          Go to{" "}
          <span
            onClick={() => navigate("/")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Home
          </span>
        </p>
      </form>
    </div>
  );
}
