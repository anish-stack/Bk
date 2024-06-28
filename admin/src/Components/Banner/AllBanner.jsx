import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllBanner = () => {
  const [banners, setBanners] = useState([]);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4234/api/get-Banners"
        );
        setBanners(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
useEffect(()=>{

  fetchData();
},[])


  const makeActive = async (id) => {
    try {
      const res = await axios.put(`http://localhost:4234/api/Banner/active/${id}`);
      alert('Banner Activated Successfully');
      console.log(res.data);
      // Refresh banners after activation
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const makeInactive = async (id) => {
    try {
      const res = await axios.put(`http://localhost:4234/api/Banner/inactive/${id}`);
      alert('Banner Deactivated Successfully');
      console.log(res.data);
      // Refresh banners after deactivation
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBanner = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:4234/api/delete-Banners/${id}`);
      alert('Banner Deleted Successfully');
      console.log(res.data);
      // Refresh banners after deletion
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto min-h-screen py-8">
       <div className="mb-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold">Banners</h2>
                <Link to="/Create-Banner" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    + Add Banners
                </Link>
            </div>
      <table className="w-[1370px] border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Banner Title</th>
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Active</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {banners.map((banner) => (
            <tr key={banner._id}>
              <td className="border border-gray-300 px-4 py-2">{banner.title}</td>
              <td className="border border-gray-300 px-4 py-2">
                <img src={banner.image} alt={banner.title} className="w-24 h-24 object-cover" />
              </td>
              <td className="border border-gray-300 px-4 py-2">{banner.active ? 'Yes' : 'No'}</td>
              <td className="border border-gray-300 px-4 py-2">
             
                <button onClick={() => deleteBanner(banner._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllBanner;
