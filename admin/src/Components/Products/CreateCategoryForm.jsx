import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const CreateCategoryForm = () => {
  const [formData, setFormData] = useState({
    MainCategory:"",
    title: "",
   
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
  const [isLoading,setIsloading] = useState(false)
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
setIsloading(true)
    try {
      const formDataToSend = new FormData(); // Create a new FormData object
      formDataToSend.append('title', formData.title); // Append title
      formDataToSend.append('images', formData.file); // Append file
      formDataToSend.append('MainCategory', formData.MainCategory); // Append file

      console.log(formDataToSend)
      const response = await axios.post(
        "https://www.api.bkexporttradeco.store/api/create-category",
        formDataToSend,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      toast.success('Category Created')
      console.log(response.data);
      setMessage("Category created successfully!");
      setIsloading(false)

    } catch (error) {
      toast.error('Internal Error')
      console.error("Error creating banner:", error);
      setMessage("Error creating banner. Please try again.");
      setIsloading(false)

    }
  };

  return (
    <div className="max-w-2xl p-5 min-h-[7vhh] border-2 mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Create Category</h1>
      <Link to="/upload" className="text-blue-400 underline">Upload-images</Link>
      <form onSubmit={handleSubmit} className="space-y-4 mt-5">
      <div>
          <label className="block text-sm font-medium text-gray-700">Main Category:</label>
          <input
            type="text"
            name="MainCategory"
            value={formData.MainCategory}
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Sub Category:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
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
        disabled={isLoading}
          className={`bg-indigo-600 ${isLoading ? 'cursor-not-allowed':'cursor-pointer'} hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        >
          {isLoading ? "Please Wait":"Create Category"}
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default CreateCategoryForm;
