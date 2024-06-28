import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [adminOrders, setAdminOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10); // Number of orders per page
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(''); // State variable for selected order status

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4234/api/admin-orders');
        setAdminOrders(response.data.data);
        // console.log(response.data)
        const OrderBy = response.data.data

        setFilteredOrders(OrderBy.reverse());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() => {
    const filtered = adminOrders.filter(order =>
      order.items[0].Productname.toLowerCase().includes(searchText.toLowerCase()) &&
      (selectedStatus === '' || order.OrderStatus === selectedStatus)
    );
    setFilteredOrders(filtered);
  }, [searchText, selectedStatus, adminOrders]);

  const handleStatusFilterChange = e => {
    setSelectedStatus(e.target.value);
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <div className="mx-auto overflow-x-auto">
      <h1 className="text-3xl font-bold my-4">Admin Orders</h1>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search by product name"
          className="border rounded p-2 mr-4"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        <select
          value={selectedStatus}
          onChange={handleStatusFilterChange}
          className="border rounded p-2"
        >
          <option value="">All Status</option>
          <option value="Pending">Order Confirmation Pending</option>
          <option value="Confirmed">Confirmed order</option>
          <option value="Packed">Packed</option>
          <option value="Dispatched">Order Dispatch</option>
          <option value="Returned">Order Return</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="divide-y divide-gray-200 w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Product</th>

              <th className="px-6 py-3 text-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment method</th>
              <th className="px-6 py-3 text-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
              <th className="px-6 py-3 text-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
              <th className="px-6 py-3 text-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Status</th>
              <th className="px-6 py-3 text-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentOrders.map(order => (
              <tr key={order._id}>
                <td className="px-6 py-4 text-blue-500 underline cursor-pointer whitespace-nowrap"><Link to={`/Order-details/${order._id}`}>{order._id}</Link></td>
                <td className="px-6 py-4 whitespace-nowrap">{order.items.length}</td>

                <td className="px-6 py-4 whitespace-nowrap">{order.items[0].Productname}</td>
                <td className="px-6 py-4 whitespace-nowrap">Rs {order.items[0].price}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.items[0].Quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={order.items[0].image} alt={order.items[0].Productname} className="h-10 w-10 object-cover" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{order.PaymentMode}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.Transaction_id || "COD"}</td>
                <td className="px-6 py-4 whitespace-nowrap">Rs {order.FinalPrice}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.OrderStatus}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 ml-5">
        {Array.from({ length: Math.ceil(filteredOrders.length / ordersPerPage) }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-3 py-1 mx-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>

  );
};

export default Orders;
