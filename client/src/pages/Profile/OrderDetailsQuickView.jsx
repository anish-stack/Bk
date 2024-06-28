import React from 'react';

const OrderDetailsQuickView = ({ handleClose, showQuick, order }) => {
    const showHideClassName = showQuick ? "fixed inset-0 overflow-y-auto" : "hidden";
    console.log(order)
    return (
        <div className={`${showHideClassName} z-10`}>
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl whitespace-nowrap truncate sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <button onClick={handleClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h2 className="text-lg  truncate whitespace-nowrap font-semibold mb-4">Order Details</h2>
                        {order ? (
                            <div>
                                {order.items.map((item, index) => (
                                    <div key={index} className="grid grid-cols-2 mb-6">
                                        <div className="flex items-center justify-between  mb-2">
                                            <img src={item.image} alt={item.Productname} className="w-full h-32 object-top object-cover mr-4" />
                                        </div>
                                        <div className="truncate whitespace-nowrap text-gray-600">
                                            <p className="mb-1"><span className=" truncate whitespace-nowrap font-semibold">Product Name:</span> {item.Productname}</p>
                                            <p className="mb-1"><span className=" truncate whitespace-nowrap font-semibold">Size:</span> {item.Size}</p>
                                            <p className="mb-1"><span className=" truncate whitespace-nowrap font-semibold">Price:</span> {item.price}</p>
                                            <p className="mb-1"><span className=" truncate whitespace-nowrap font-semibold">Color:</span> {item.Colour}</p>
                                            <p className="mb-1"><span className=" truncate whitespace-nowrap font-semibold">Quantity:</span> {item.Quantity}</p>
                                            <p className="mb-1"><span className=" truncate whitespace-nowrap font-semibold">Categories:</span> {item.Categories}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600 mb-4">No order details available.</p>
                        )}



                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsQuickView;
