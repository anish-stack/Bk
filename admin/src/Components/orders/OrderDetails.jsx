import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import logo from './logo-main.png'
import { PDFDownloadLink } from '@react-pdf/renderer';
import Bill from './Bill';
const OrderDetails = () => {
  const { id } = useParams()
  const [order, setOrder] = useState(null);
  const [sUser, setUser] = useState(null);

  const [newStatus, setNewStatus] = useState('');
  const [statusUpdated, setStatusUpdated] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4234/api/single-orders/${id}`);
        setOrder(response.data.data);
        console.log(response.data.data)
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [id]);

  // const handleStatusUpdate = async () => {
  //   try {
  //     const res = await axios.post(`http://localhost:4234/api/update-order`, {
  //       status: newStatus,
  //       orderId: id
  //     });
  //     setStatusUpdated(true);

  //     console.log(res.data)
  //   } catch (error) {
  //     console.error('Error updating order status:', error);
  //   }
  // };

  if (!order) {
    return <div>Loading...</div>;
  }
  // const handlePrint = async (id) => {
  //   try {
  //     const res = await axios.get(`http://localhost:4234/api/finduserbyid/${id}`);
  //     console.log(res.data.data);
  //     setUser(res.data.data)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="container mx-auto text-black">
      <h1 className="text-3xl font-bold my-4">Order Details</h1>
      <div className="border rounded p-4">
        <h2 className="text-lg font-bold mb-2">Order ID: {order._id}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">

          <div>
            <div className="space-y-4 flex items-center justify-between ">
              {order.items.map((item, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-2">
                  <div className=" ">
                    <img src={item.image} alt={item.Productname} className="w-32 h-auto max-w-md mx-auto" />
                  </div>
                  <div className=' flex flex-col gap-1'>
                    <p><strong>Product Name:</strong> {item.Productname}</p>
                    <div className=' w-full justify-around flex'>
                      <p><strong>Price:</strong> Rs{item.price}</p>
                      <p><strong>Quantity:</strong> {item.Quantity}</p>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-[2px]">
            <p><strong>Total Amount:</strong> Rs{order.FinalPrice}</p>
            <p><strong>Order Status:</strong> {order.OrderStatus}</p>
            <p><strong>User:</strong> {order.UserInfo.Name}</p>
            <p><strong>User Email:</strong> {order.UserInfo.Email}</p>
            <p><strong>User ID:</strong> {order.UserInfo.userid}</p>
            <p><strong>Delivery Address:</strong> {order.UserDeliveryAddress.Street}, {order.UserDeliveryAddress.HouseNo}, {order.UserDeliveryAddress.City}, {order.UserDeliveryAddress.State} - {order.UserDeliveryAddress.Pincode}</p>
            <p><strong>Payment Method:</strong> {order.PaymentMode}</p>
            <p><strong>Transaction ID:</strong> {order.Transaction_id}</p>
            <p><strong>Payment Status:</strong> {order.PaymentStatus}</p>
            <p><strong>Order Date:</strong> {new Date(order.OrderDate).toLocaleString()}</p>
            <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>Updated At:</strong> {new Date(order.updatedAt).toLocaleString()}</p>
            <p><strong>Change Order Satus:</strong> <Link to={`/Change-Order-Status/${order._id}`} className=' px-4 py-1 rounded-sm bg-blue-700 text-white'>Click</Link></p>
          </div>


        </div>

      </div>
    </div>


  );
};

export default OrderDetails;
