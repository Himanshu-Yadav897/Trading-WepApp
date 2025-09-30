import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    panNumber: "",
  });

  const [idImageName, setIdImageName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { name, email, password, panNumber } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFileChange = (e) => {
    if (e.target.files.length > 0) {
      setIdImageName(e.target.files[0].name);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!idImageName) {
      setError("Please upload a dummy ID image.");
      return;
    }
    try {
      const newUser = { name, email, password, panNumber };

      const res = await axios.post(
        "http://localhost:5001/api/users/register",
        newUser
      );

      console.log("User registered successfully:", res.data);

      navigate("/login");
    } catch (err) {
      console.error(err.response.data);
      setError(err.response.data.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <form
        onSubmit={onSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create an Account
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email Address</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">PAN Number</label>
          <input
            type="text"
            name="panNumber"
            value={panNumber}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Upload Dummy ID Image</label>
          <input
            type="file"
            name="idImage"
            onChange={onFileChange}
            required
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
