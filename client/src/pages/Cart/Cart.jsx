import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateQuantity, removeItem } from '../../store/slices/CartSlice';
import No from './images (1).png'
import toast from 'react-hot-toast';
import axios from 'axios';
const Cart = () => {
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.cart);
    const User = useSelector(state => state.register)

    console.log(cartItems.items);
    const [Cart, setCart] = useState([])
    useEffect(() => {
        setCart(cartItems.items)
    }, [cartItems])
    const [newQuantity, setNewQunatity] = useState()
    const handleQuantityChange = (itemId, newQuantity) => {
        if (newQuantity < 1) {
            toast.error("Quantity must be at least 1");
            return;
        }
        dispatch(updateQuantity({ itemId, newQuantity }));
    };

    const handleRemove = (itemId) => {
        dispatch(removeItem(itemId));
        // toast.success("Item Removed");
    };

    const Totalprices = Cart.reduce((total, item) => {
        return total + (item.price * item.quantity);

    }, 0)

    const CheckOutWithData = async () => {
        if (!User.token) {
            toast.error('Please Login First To Checkout', {
                style: {
                    border: '1px solid #713200',
                    padding: '16px',
                    color: '#713200',
                },
                iconTheme: {
                    primary: '#713200',
                    secondary: '#FFFAEE',
                },
            });
            setTimeout(() => {
                window.location.href = "/sign-in";
            }, 2000);
            return; // Return here to prevent further execution
        }
        try {
            const CheckOutData = {
                Items: Cart.map(item => ({
                    image: item.img,
                    Productname: item.productName,
                    Size: item.size,
                    price: item.price,
                    Colour: item.color,
                    Quantity: item.quantity,
                    Categories: item.categories
                })),
                FinalPrice: LastPrice || Totalprices,
                userInfo: JSON.stringify(User.user)
            };

            sessionStorage.setItem('checkOut', JSON.stringify(CheckOutData))


            window.location.href = `/Check-Out/Cart`


        } catch (error) {
            console.log(error)

            // Handle any errors that occur during checkout
        }
    };
    const [LastPrice,setLastprice] = useState()

    const [formData, setFormData] = useState({
        CouponeCode: '',
        orderTotal: 0 // Initialize orderTotal to 0
      });
      useEffect(() => {
        // Set orderTotal to Totalprices once Totalprices is available
        setFormData(prevState => ({
          ...prevState,
          orderTotal: Totalprices
        }));
      }, [Totalprices]);
      const handleChange = (e) => {
        setFormData(prevState => ({
          ...prevState,
          CouponeCode: e.target.value
        }));
      };
    const [message,setmessage] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        console.log(formData);
        try {
            const res = await axios.post('https://www.api.bkexporttradeco.store/api/apply-vouchers', formData);
            const RoundTotal = Math.round(res.data.data.discountedTotal)
            setLastprice(RoundTotal);
              setmessage('Coupon is Applied Successfull')
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.error)
              setmessage('')

        }
    };
    return (
        <div className="min-h-screen bg-gray-100  pt-5">
            <h1 className="mb-10 text-center text-2xl font-bold">Cart <i className="ri-shopping-cart-2-fill"></i></h1>
            <div className="mx-auto max-w-7xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                <div className="rounded-lg md:w-2/3">
                    {Cart.length > 0 ? (
                        Cart.map((item, index) => (
                            <div key={index} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                                <img src={item.img} alt="product-image" className="w-full md:h-32 object-cover object-top rounded-lg sm:w-40" />
                                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                    <div className="mt-5 sm:mt-0">
                                        <h2 className="text-lg font-bold text-gray-900">{item.productName}</h2>
                                        <p className="mt-1 text-xl capitalize font-bold text-gray-700">Size: {item.size}</p>
                                        <p className="inline-block mt-2 w-6 h-6 mr-2 cursor-pointer rounded-full" style={{ backgroundColor: item.color }}></p>


                                    </div>
                                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                        <div className="flex items-center border-gray-100">
                                            <span onClick={() => handleQuantityChange(item._id, item.quantity - 1)} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                                            <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={item.quantity} min="1" readOnly />
                                            <span onClick={() => handleQuantityChange(item._id, item.quantity + 1)} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <p className="text-sm">{LastPrice || item.price * item.quantity } Rs</p>
                                            <svg onClick={() => handleRemove(item._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className=' w-full'>
                            <div className=' h-[24rem]'>
                                <img className='w-full h-full object-cover object-center' src={No} alt="" />
                            </div>
                        </div>
                    )}
                </div>


                <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                    <div className="mb-2 flex justify-between">
                        <p className="text-gray-700">Subtotal</p>
                        <p className="text-gray-700">{LastPrice || Totalprices}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-gray-700">Shipping</p>
                        <p className="text-gray-700">Free</p>
                    </div>
                    <hr className="my-4" />

                    <div className='mt-5'>
                        <h2 className='text-xl font-semibold mb-3'>Apply Coupon</h2>
                        <form onSubmit={handleSubmit}>
                        <div className='flex items-center border border-gray-300 rounded'>
                               
                               
                            </div>
                            <div className='flex items-center border border-gray-300 rounded'>
                                <input
                                    type="text"
                                    value={formData.CouponeCode}
                                    name="CouponeCode"
                                    onChange={handleChange}
                                    className='w-full py-2 px-4 focus:outline-none'
                                    placeholder="Enter coupon code"
                                />
                                <button type="submit" className='bg-blue-500 text-white py-2 px-4 rounded-r hover:bg-blue-600 focus:outline-none'>
                                    Apply
                                </button>
                            </div>
                        </form>
                        <p className='text-green-400 mt-1 mr-1'>{message || ''}</p>
                    </div>
                    <button onClick={CheckOutWithData} disabled={cartItems.items.length === 0} className={`mt-6 w-full rounded-md py-1.5 font-medium text-white ${cartItems.items.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}>Check out</button>
                </div>
            </div>
        </div>
    )
}

export default Cart