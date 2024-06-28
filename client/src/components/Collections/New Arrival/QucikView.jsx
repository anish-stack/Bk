import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import payment from '../../../assets/payment.png';
import Loader from './Loader';
import { Link } from 'react-router-dom';

const QuickView = ({ showQuickView, item, handleClose }) => {
    console.log(item)
    const settings = {
        dots: true,
        infinite: true,
        className: "w-full md:h-full",
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 1500,
        autoplay: true,
        swipeToSlide: true,
        fade: true,
        slidesToScroll: 1,
        adaptiveHeight: true,
    };

    const [quantity, setQuantity] = useState(1);
    const [sizesPrize, setSizePrize] = useState()
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Simulate loading delay
        const timer = setTimeout(() => {
            if (item && Object.keys(item).length !== 0) {
                setIsLoading(false);
            }
        }, 400);

        // Clear timeout if component unmounts
        return () => clearTimeout(timer);
    }, [item]);

    const hanldeClick = (sizes) => {
        console.log(sizes)
        setSizePrize(sizes)
    }
    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <motion.div
            className={`fixed top-0 left-0 overflow-scroll w-full md:h-full z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center ${showQuickView ? '' : 'hidden'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="bg-white mt-5 md:mt-0 overflow-scroll rounded-lg p-6"
                initial={{ y: "-100vh" }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }} // Adjust damping for the drop effect
            >
                {!isLoading ? (
                    <div className='max-w-4xl overflow-scroll relative md:h-full min-h-[50vh] '>
                        <div className='grid grid-cols-1 overflow-scroll md:grid-cols-2 place-content-center place-items-center'>
                            <div className='imgs w-full  md:overflow-hidden'>
                                <Slider {...settings}>
                                    <div className=' h-[100%]'>
                                        <img src={item.img} className='w-full h-32 md:h-[600px] object-center object-contain' alt="" />
                                    </div>
                                    <div className='h-[100%]'>
                                        <img src={item.secondImg} className='w-full h-32 md:h-[600px] object-center object-contain' alt="" />
                                    </div>
                                    <div className='h-[100%]'>
                                        <img src={item.thirdimage} className='w-full h-32 md:h-[600px] object-center object-contain' alt="" />
                                    </div>
                                    <div className='h-[100%]'>
                                        <img src={item.fourthImage} className='w-full h-32 md:h-[600px] object-center object-contain' alt="" />
                                    </div>
                                </Slider>
                            </div>
                            <div className='w-full overflow-scroll'>
                                <div className='w-full px-3'>
                                    <p className='text-xl font-bold mt-5'>{item.productName}</p>
                                    <h3 className='text-xl font-bold text-red-500'>
                                        <del className='text-gray-300 font-thin'>{sizesPrize ? sizesPrize.mainPrice || item.sizes[0].mainPrice : item.sizes[0].mainPrice}</del> {sizesPrize ? (sizesPrize.discountPrice ? sizesPrize.discountPrice : item.sizes[0].discountPrice) : item.sizes[0].discountPrice}
                                    </h3>
                                    <hr className='mt-2' />
                                    <div className='w-5/5 mt-2'>
                                        <p className='text-sm hidden md:block w-4/5  text-gray-500 font-medium'>{item.description}</p>
                                    </div>
                                    {/* <div className='sizes  flex flex-wrap items-start  gap-3 mt-2 ml-2'>
                                        {item.sizes.map((sizes, index) => (
                                            <div onClick={() => hanldeClick(sizes)} className='bg-[#9680A6] rounded-[10px] cursor-pointer py-1 px-5 text-white' key={index}>{sizes.size}</div>
                                        ))}
                                    </div> */}
                                    <div className='flex items-center overflow-scroll justify-between'>
                                      
                                        <div className="counter mt-5 w-[50%]">
                                            <div className="flex border-2 wfull rounded-[40px] border-white items-center">
                                                <Link to={`/single-product/${item._id}/${item.productName}`} className='py-2 px-2 w-full rounded-[40px] bg-gray-900 text-white'>Add To Cart</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='payment-foot  w-[100%] mx-auto'>
                                        <img src={payment} className='w-full object-cover object-center' alt="" />
                                    </div>
                                    <div className="otherdetails">
                                        <ul>
                                            <li className='text-gray-600 capitalize text-sm'><strong>SKU: </strong>{item.SKU}</li>
                                            <li className='text-gray-600 capitalize text-sm'><strong>availability: </strong>{item.availability ? "in Stock" : "Out Of Stock"}</li>
                                            <li className='text-gray-600 capitalize text-sm'><strong>categories: </strong>{item.categories}</li>
                                            {/* <li className='text-gray-600 capitalize text-sm'><strong>tags: </strong>{item.tags[0] || "N.A"}</li> */}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <button
                                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                                onClick={handleClose}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ) : (
                    <Loader />
                )}
            </motion.div>
        </motion.div>
    );
}

export default QuickView;
