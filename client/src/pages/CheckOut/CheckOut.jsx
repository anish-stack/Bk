import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const CheckOut = () => {
    const items = sessionStorage.getItem('checkOut') || [];
    const finalPrice = sessionStorage.getItem('FinalPrice') || {};
    const userInfo = sessionStorage.getItem('user');
    const token = sessionStorage.getItem('token');

    const parsedItem = JSON.parse(items);
    const parsedUser = JSON.parse(userInfo);

    useEffect(() => {
        const itemss = JSON.parse(sessionStorage.getItem('checkOut')) || [];
        if (itemss.length === 0) {
            window.location.href = "/Shop";
        }
    }, []);

    const [formData, setFormData] = useState({
        items: parsedItem.Items,
        finalPrice: parsedItem.FinalPrice,
        UserInfo: {
            Name: parsedUser?.name || "",
            Email: parsedUser?.email || "",
            userid: parsedUser?._id
        },
        UserDeliveryAddress: {
            Street: "",
            HouseNo: "",
            Pincode: "",
            mobileNumber: "",
            State: "",
            City: "",
            landMark: ""
        },
        PaymentMode: "Online" // Default payment mode
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            UserDeliveryAddress: {
                ...formData.UserDeliveryAddress,
                [name]: value
            }
        });
    };

    const handlePaymentModeChange = (e) => {
        setFormData({
            ...formData,
            PaymentMode: e.target.value
        });
    };

    const checkoutHandler = async (e) => {
        e.preventDefault();
        try {
            const { data: { order } } = await axios.post("https://www.api.bkexporttradeco.store/api/Create-payment", {
                amount: formData.finalPrice
            });

            const options = {
                key: "rzp_test_fdUdrX0kEzotSX",
                amount: order.amount || 100,
                currency: "INR",
                name: "B & K EXPORT TRADE CO",
                description: "Payment Of Products",
                image: "https://i.pinimg.com/originals/9e/ff/85/9eff85f9a3f9540bff61bbeffa0f6305.jpg",
                order_id: order.id,
                callback_url: "https://www.api.bkexporttradeco.store/api/paymentverification",
                prefill: {
                    name: formData.UserInfo.Name,
                    email: formData.UserInfo.Email,
                    contact: formData.UserDeliveryAddress.mobileNumber
                },
                notes: {
                    "address": "Razorpay Corporate Office"
                },
                theme: {
                    "color": "#121212"
                }
            };

            const razor = new window.Razorpay(options);
            razor.open();
        } catch (error) {
            console.error('Error in creating order:', error);
            toast.error('Something went wrong!');
        }
    };
    return (
        <div className="max-w-5xl  shadow-xl  p-4 mx-auto">
            <h2 className="text-xl font-bold mb-4">Checkout</h2>
            <form onSubmit={checkoutHandler} className=" bg-gray-100 py-2 px-5 space-y-4">
                <div className='grid grid-cols-2 gap-2'>
                    <div className='w-full'>
                        <label htmlFor="name" className="block w-full text-sm font-medium text-gray-700">Name</label>
                        <input id="name" type="text" name="Name" value={formData.UserInfo.Name} onChange={handleInputChange} className=" w-full py-2 px-3 input" />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="email" className="block w-full text-sm font-medium text-gray-700">Email</label>
                        <input id="email" type="email" name="Email" value={formData.UserInfo.Email} onChange={handleInputChange} className=" w-full py-2 px-3 input" />
                    </div>
                </div>
                <div className='w-full'>
                    <label htmlFor="mobileNumber" className="block w-full text-sm font-medium text-gray-700">Mobile Number</label>
                    <input id="mobileNumber" type="text" name="mobileNumber" value={formData.UserDeliveryAddress.mobileNumber} onChange={handleInputChange} className=" w-full py-2 px-3 input" />
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <div className='w-full'>
                        <label htmlFor="street" className="block w-full text-sm font-medium text-gray-700">Street</label>
                        <input id="street" type="text" name="Street" value={formData.UserDeliveryAddress.Street} onChange={handleInputChange} className=" w-full py-2 px-3 input" />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="houseNo" className="block w-full text-sm font-medium text-gray-700">House No</label>
                        <input id="houseNo" type="text" name="HouseNo" value={formData.UserDeliveryAddress.HouseNo} onChange={handleInputChange} className=" w-full py-2 px-3 input" />
                    </div>

                </div>
                <div className='grid grid-cols-3 gap-2'>
                    <div className='w-full'>
                        <label htmlFor="pincode" className="block w-full text-sm font-medium text-gray-700">Pincode</label>
                        <input id="pincode" type="text" name="Pincode" value={formData.UserDeliveryAddress.Pincode} onChange={handleInputChange} className=" w-full py-2 px-3 input" />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="state" className="block w-full text-sm font-medium text-gray-700">State</label>
                        <input id="state" type="text" name="State" value={formData.UserDeliveryAddress.State} onChange={handleInputChange} className=" w-full py-2 px-3 input" />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="city" className="block w-full text-sm font-medium text-gray-700">City</label>
                        <input id="city" type="text" name="City" value={formData.UserDeliveryAddress.City} onChange={handleInputChange} className=" w-full py-2 px-3 input" />
                    </div>

                </div>
                <div className='w-full'>
                    <label htmlFor="landMark" className="block w-full text-sm font-medium text-gray-700">Landmark</label>
                    <input id="landMark" type="text" name="landMark" value={formData.UserDeliveryAddress.landMark} onChange={handleInputChange} className=" w-full py-2 px-3 input" />
                </div>
                <div className='w-full'>
                    <label htmlFor="paymentMode" className="block w-full text-sm font-medium text-gray-700">Payment Mode</label>
                    <select id="paymentMode" value={formData.PaymentMode} onChange={handlePaymentModeChange} className="w-full py-2 px-3">
                        <option value="Online">Online</option>
                        <option value="COD">Cash on Delivery</option>
                    </select>
                </div>
                <button type="submit" className=" text-center bg-green-400 py-1 px-5 mt-2">Proceed to Pay</button>
            </form>
        </div>

    );
};

export default CheckOut;
