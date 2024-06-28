import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const Shipped = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    length: '',
    breadth: '', 
    height: '',
    weight: '',
    token: sessionStorage.getItem('S-token') || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post(`http://localhost:4234/api/Order-Ship/${id}`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      if (response.status === 201) {
        console.log('Order shipped successfully');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };
  
  const checkIsShipRocketLogin = sessionStorage.getItem('S-token');
  if (!checkIsShipRocketLogin) {
    sessionStorage.setItem('order-change', id);
    return window.location.href="/Ship-login";
  }

  return (
    <div className="w-full">
      <div className="max-w-[1920px] mx-auto p-10 flex flex-col gap-5">
        <div className="text-center">
          <h2 className="font-semibold text-2xl">Ship Rocket Details</h2>
        </div>
        <div className="container mx-auto px-4">
          <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
            <div className="mb-4">
              <label htmlFor="length" className="block text-gray-700">Length:</label>
              <input type="text" id="length" name="length" value={formData.length} onChange={handleChange} className="form-input border-[1px] border-black mt-1 block w-full" />
            </div>
            <div className="mb-4">
              <label htmlFor="breadth" className="block text-gray-700">Breadth:</label>
              <input type="text" id="breadth" name="breadth" value={formData.breadth} onChange={handleChange} className="form-input border-[1px] border-black mt-1 block w-full" />
            </div>
            <div className="mb-4">
              <label htmlFor="height" className="block text-gray-700">Height:</label>
              <input type="text" id="height" name="height" value={formData.height} onChange={handleChange} className="form-input border-[1px] border-black mt-1 block w-full" />
            </div>
            <div className="mb-4">
              <label htmlFor="weight" className="block text-gray-700">Weight:</label>
              <input type="text" id="weight" name="weight" value={formData.weight} onChange={handleChange} className="form-input border-[1px] border-black mt-1 block w-full" />
            </div>
            <div className="mb-4">
              <input type="text" id="token" name="token" value={formData.token} readOnly={true} className="form-input border-[1px] border-black invisible mt-1 block w-full" />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Shipped;
