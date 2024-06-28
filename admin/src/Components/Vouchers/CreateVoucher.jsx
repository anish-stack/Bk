import React, { useState } from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast'
const CreateVoucher = ({ onCreate }) => {
  const [formData, setFormData] = useState({
    CouponeCode: '',
    HowMuchPercentageof: '',
    Active: true,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4234/api/vouchers/create-vouchers', formData);  // Adjust the endpoint as needed
      console.log(response.data.data);
      toast.success('Coupon Code Generated Successfully');
      //   setFormData({ CouponeCode: '', HowMuchPercentageof: '', Active: true });
    } catch (error) {
      console.error("Error creating voucher:", error);
      toast.error(error.response.data.error || "Internal Server Error"
        )
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Create Voucher</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Coupon Code</label>
          <input
            type="text"
            name="CouponeCode"
            value={formData.CouponeCode}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Discount Percentage</label>
          <input
            type="number"
            name="HowMuchPercentageof"
            value={formData.HowMuchPercentageof}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Active</label>
          <input
            type="checkbox"
            name="Active"
            checked={formData.Active}
            onChange={(e) => setFormData({ ...formData, Active: e.target.checked })}
            className="mr-2"
          />
          Active
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateVoucher;
