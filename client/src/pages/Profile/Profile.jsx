import React, { useEffect, useState } from 'react';
import user from './user.jpg';
import { useSelector } from 'react-redux';
import axios from 'axios';
import OrderDetailsQuickView from './OrderDetailsQuickView';
import { Link } from 'react-router-dom';
import login from './login.jpg'
const Profile = () => {
    const userState = useSelector(state => state.register);
    const finalUser = userState ? userState.user : null;
    const token = sessionStorage.getItem('token');
    const [order, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(8);
    const [showQuick, setShowQuick] = useState(false); // State for showing quick view
    const [selectedOrder, setSelectedOrder] = useState(null);
    
    const handleShowQuick = (selectedOrder) => {
        setSelectedOrder(selectedOrder);
        setShowQuick(true);
    }

    const handleCloseQuick = () => {
        setShowQuick(false);
    }

    const handleFindMyOrder = async () => {
        try {
            const response = await axios.get('https://www.api.bkexporttradeco.store/api/get-My-Orders', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // console.log(response.data);
            setOrders(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleFindMyOrder();
    }, []);

    // Get current orders
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = order.slice(indexOfFirstOrder, indexOfLastOrder);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleLogout = () => {
        sessionStorage.clear()
        window.location.href = "/"
    }
    
    return (
        <div className='w-full min-h-screen'>
            {/* Profile Header */}
            {finalUser ? (
                <div className='profile-header flex items-center justify-evenly w-full bg-[#4891E0]'>
                    <div className='user-info w-52'>
                        <div className='user-img w-full'>
                            <img src={user} className='max-w-full w-full object-cover' alt="Logged-user" />
                        </div>
                    </div>
                    <div className='user-details'>
                        <h2 className='text-white md:text-5xl mb-2 capitalize font-bold'>Welcome To Seema Collections</h2>
                        <h1 className='md:text-4xl font-medium capitalize text-pretty mt-2'>{finalUser.name}</h1>
                        <h2 className='md:text-4xl font-medium capitalize text-pretty'>{finalUser.email}</h2>
                    </div>
                </div>
            ) : (
                <div className='min-h-[70vh] flex items-center justify-center'>
                <div className='text-center'>
                    <h2 className='mb-5 text-2xl font-bold md:text-7xl'>Please Sign In to Access It</h2>
                    <img src={login} className='w-52 md:w-80 mx-auto mb-6' alt="Login" />
                    <Link to="/sign-in" className='bg-[#16153C] text-white font-bold px-[3rem] py-2 rounded capitalize hover:bg-[#16153C]'>sign-in</Link>
                </div>
            </div>
            
            )}
            
            {/* Order Cards */}
            {finalUser && (
                <div className='Order-Cards'>
                    <div className=' bg-gray-900 flex p-2 items-center justify-between'>
                        <h2 className='text-xl md:text-3xl p-2 whitespace-nowrap truncate text-white font-bold'>Orders Done By Mr. {finalUser.name}</h2>
                        <button onClick={handleLogout} className='bg-white text-pretty font-medium whitespace-nowrap px-7 py-2'>Logout</button>
                    </div>                
                    <div className='w-full mt-5 grid grid-cols-2 md:grid-cols-4 p-5 gap-4'>
                        {currentOrders.length > 0 ? (
                            currentOrders.map((orderItem, orderIndex) => (
                                <div key={orderIndex} className="w-full mx-auto md:glass bg-white rounded-xl overflow-hidden shadow-md md:flex mb-4">
                                    {/* Image Section */}
                                    <div className="w-full md:w-[40%] md:bg-blue-500" style={{ backgroundColor: '#4891E0' }}>
                                        <div className="p-2">
                                            {orderItem.items && orderItem.items.length > 0 && (
                                                <img src={orderItem.items[0].image} alt={orderItem.items[0].Productname} className="object-cover w-full h-full" />
                                            )}
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="py-6 w-full md:w-[60%]">
                                        <div className="md:pl-6">
                                            <h2 className="text-lg font-semibold text-gray-800">Order Details</h2>
                                            <p className="text-gray-600 whitespace-nowrap mt-2">Order Date: {new Date(orderItem.OrderDate).toLocaleDateString()}</p>
                                            <p className="text-gray-600 whitespace-nowrap">Paid: Rs {orderItem.FinalPrice}</p>
                                            <p className="text-gray-600 whitespace-nowrap">Order Status: {orderItem.OrderStatus}</p>
                                            <button onClick={() => handleShowQuick(orderItem)} className="mt-4 bg-[#4861e0] whitespace-nowrap hover:bg-[#4861e0c7] text-white font-bold py-2 px-4 rounded">Check Order</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='col-span-4'>
                                <h1 className='text-center'>You Have Not Completed Any Orders</h1>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Pagination */}
            {order.length > 0 && (
                <div className="mt-4 flex justify-center">
                    <nav>
                        <ul className="pagination">
                            {Array.from({ length: Math.ceil(order.length / ordersPerPage) }, (_, i) => (
                                <li key={i} className="page-item">
                                    <button onClick={() => paginate(i + 1)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-1 transition duration-300">{i + 1}</button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            )}

            <OrderDetailsQuickView handleClose={handleCloseQuick} showQuick={showQuick} order={selectedOrder} />
        </div>
    );
};

export default Profile;
