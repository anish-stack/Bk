import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const CreateBanner = () => {
  const [formData, setFormData] = useState({
    title: "",
    active: true,
    image: null, // Add file property to formData
  });
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the first file from the input
    setFormData((prevData) => ({
      ...prevData,
      file: file, // Update file property
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
// console.log(formData)
    try {
      const formDataToSend = new FormData(); // Create a new FormData object
      formDataToSend.append('title', formData.title); // Append title
      formDataToSend.append('active', formData.active); // Append active
      formDataToSend.append('images', formData.file); // Append file
      console.log(formDataToSend)
      const response = await axios.post(
        "https://www.api.bkexporttradeco.store/api/create-banners",
        formDataToSend,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      console.log(response.data);
      toast.success('Banner Created')
      setMessage("Banner created successfully!");
    } catch (error) {
      toast.error('Server Error')
      console.error("Error creating banner:", error);
      setMessage("Error creating banner. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl p-5 min-h-[70ch] border-2 mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Create Banner</h1>
      <Link to="/upload" className="text-blue-400 underline">Upload-images</Link>
      <form onSubmit={handleSubmit} className="space-y-4 mt-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
       
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.active}
            name="active"
            onChange={(e) => setFormData((prevData) => ({
              ...prevData,
              active: e.target.checked
            }))}
            className="mr-2 rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
          />
          <label className="text-sm text-gray-700">Active</label>
        </div>
       
        <input
          type="file"
          name="images"
          onChange={handleFileChange}
          className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
       
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Create Banner
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default CreateBanner;
