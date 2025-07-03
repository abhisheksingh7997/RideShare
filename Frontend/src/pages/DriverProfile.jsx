import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DriverProfile() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    license: "",
    vehicleNo: "",
    vehicleType: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/drivers", formData, {
        withCredentials: true
      });
      alert("Driver profile saved!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving driver:", error);
      alert("Failed to save driver.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Driver Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input name="name" placeholder="Enter Name" value={formData.name} onChange={handleChange} className="w-full p-2 border" />
        <input name="phone" placeholder="Enter phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border" />
        <input name="license" placeholder="Enter license No." value={formData.license} onChange={handleChange} className="w-full p-2 border" />
        <input name="vehicleNo" placeholder="Enter vehicle No." value={formData.vehicleNo} onChange={handleChange} className="w-full p-2 border" />
        <input name="vehicleType" placeholder="Enter vehicle type" value={formData.vehicleType} onChange={handleChange} className="w-full p-2 border" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save Driver</button>
      </form>
    </div>
  );
}

export default DriverProfile;
