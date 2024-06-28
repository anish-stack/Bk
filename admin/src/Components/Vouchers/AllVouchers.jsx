import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllVouchers = () => {
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await axios.get('https://www.api.bkexporttradeco.store/api/vouchers');  // Adjust the endpoint as needed
        setVouchers(response.data.data);
      } catch (error) {
        console.error("Error fetching vouchers:", error);
      }
    };

    fetchVouchers();
  }, []);

  const markActive = async (id) => {
    try {
      await axios.put(`https://www.api.bkexporttradeco.store/api/vouchers/activateVoucher/${id}`);
      // Update the local state to reflect the change
      setVouchers(vouchers.map(voucher => voucher._id === id ? { ...voucher, Active: true } : voucher));
    } catch (error) {
      console.error("Error marking voucher as active:", error);
    }
  };

  const markInActive = async (id) => {
    try {
      await axios.put(`https://www.api.bkexporttradeco.store/api/vouchers/deactivateVoucher/${id}`);
      // Update the local state to reflect the change
      setVouchers(vouchers.map(voucher => voucher._id === id ? { ...voucher, Active: false } : voucher));
    } catch (error) {
      console.error("Error marking voucher as inactive:", error);
    }
  };

  const markDelete = async (id) => {
    try {
      await axios.delete(`https://www.api.bkexporttradeco.store/api/vouchers/deleteVoucher/${id}`);
      // Remove the voucher from local state
      setVouchers(vouchers.filter(voucher => voucher._id !== id));
    } catch (error) {
      console.error("Error deleting voucher:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Coupon Codes</h2>
        <Link to="/Create-Vouchers" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          + Add Coupon
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-start bg-white">
          <thead>
            <tr className='text-left'>
              <th className="py-2 px-4 border-b">Coupon Code</th>
              <th className="py-2 px-4 border-b">Discount Percentage</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Mark Active</th>
              <th className="py-2 px-4 border-b">Mark In-Active</th>
              <th className="py-2 px-4 border-b">Delete</th>
            </tr>
          </thead>
          <tbody>
            {vouchers && vouchers.map(voucher => (
              <tr key={voucher._id}>
                <td className="py-2 px-4 border-b">{voucher.CouponeCode}</td>
                <td className="py-2 px-4 border-b">{voucher.HowMuchPercentageof}%</td>
                <td className="py-2 px-4 border-b">{voucher.Active ? 'Yes' : 'No'}</td>
                <td className="py-2 px-4 border-b">
                  <button className='bg-green-400 p-1 text-white rounded-sm' onClick={() => markActive(voucher._id)}>Active</button>
                </td>
                <td className="py-2 px-4 border-b">
                  <button className='bg-red-400 p-1 text-white rounded-sm' onClick={() => markInActive(voucher._id)}>De-Active</button>
                </td>
                <td className="py-2 px-4 border-b">
                  <button className='bg-blue-200 p-1 text-white rounded-sm' onClick={() => markDelete(voucher._id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllVouchers;
