import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const SalesBanner = () => {
    const [banners, setBanners] = useState([]);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.api.bkexporttradeco.store/api/get-sales-Banners"
        );
        setBanners(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
useEffect(()=>{

  fetchData();
},[])



  const deleteBanner = async (id) => {
    try {
      const res = await axios.delete(`https://www.api.bkexporttradeco.store/api/delete-sales-Banners/${id}`);
      alert('Banner Deleted Successfully');
      console.log(res.data);
      // Refresh banners after deletion
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" mx-auto min-h-screen py-8">
    <div className="mb-4 max-w-[1200px] mx-auto flex justify-between items-center">
             <h2 className="text-2xl font-bold">Banners</h2>
             <Link to="/Create-Offer-Banner" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                 + Add Sales Banners
             </Link>
         </div>
   <table className="w-[1200px] mx-auto border-collapse border border-gray-300">
     <thead>
       <tr className="bg-gray-100">
         {/* <th className="border border-gray-300 px-4 py-2">Banner Title</th> */}
         <th className="border border-gray-300 px-4 py-2">Image</th>
         <th className="border border-gray-300 px-4 py-2">Button Title</th>
         {/* <th className="border border-gray-300 px-4 py-2">Paragraph</th> */}

         <th className="border border-gray-300 px-4 py-2">Active</th>
         <th className="border border-gray-300 px-4 py-2">Actions</th>
       </tr>
     </thead>
     <tbody>
       {banners.map((banner) => (
         <tr key={banner._id}>
           {/* <td className="border border-gray-300 px-4 py-2">{banner.title}</td> */}
           <td className="border border-gray-300 px-4 py-2">
             <img src={banner.image} alt={banner.title} className="w-24 h-24 object-cover" />
           </td>
           <td className="border border-gray-300 px-4 py-2">{banner.BtnTitle}</td>
           {/* <td className="border border-gray-300 px-4 py-2">{banner.Para}</td> */}

           <td className="border border-gray-300 px-4 py-2">{banner.active ? 'Yes' : 'No'}</td>
           <td className="border border-gray-300 px-4 py-2">
          
             <button onClick={() => deleteBanner(banner._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
           </td>
         </tr>
       ))}
     </tbody>
   </table>
 </div>
  )
}

export default SalesBanner