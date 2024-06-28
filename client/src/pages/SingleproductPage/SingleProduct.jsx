import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion';
import payment from '../../assets/payment.png';
import NewArrival from '../../components/Collections/New Arrival/NewArrival';
import QualityFooter from '../../components/Others/QualityFooter'
import CollectionWithBanner from '../../components/Collections/CollectionWithBanner/CollectionWithBanner'
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleData } from '../../store/slices/singleProductslice';
import axios from 'axios';
import { addItem } from '../../store/slices/CartSlice';
import toast from 'react-hot-toast';
const SingleProduct = () => {
    const { name, id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const dispatch = useDispatch()
    const fetchSingleProduct = useCallback(async () => {
        try {
            const response = await axios.get(`https://www.api.bkexporttradeco.store/api/get-products-name/${name}/${id}`);
            console.log(response.data);
            setProduct(response.data.data); // Assuming response.data is the product object
        } catch (error) {
            console.log(error);
        }
    }, [name, id]);

    useEffect(() => {
        fetchSingleProduct();
    }, [fetchSingleProduct]);
    useEffect(() => {

        window.scrollTo({
            top: "0",
            behavior: "smooth"
        })

    }, [id]);
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    let sliderRef1 = useRef(null);
    let sliderRef2 = useRef(null);
    const [sizesPrize, setSizePrize] = useState()
    const [sizesDPrize, setDSizePrize] = useState()

    const [selectedColorIndex, setSelectedColorIndex] = useState(null);
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedStock, setSelectedStock] = useState(null);
    const handleClickColor = (index, color) => {
        setSelectedColorIndex(index);
        setSelectedColor(color);

    };

    useEffect(() => {
        setNav1(sliderRef1);
        setNav2(sliderRef2);
    }, []);
    const handleSmallImageClick = (image) => {
        // Update the bigImage property with the clicked image path
        setProduct({ ...product, bigImage: image });
    };

    const handleClickSizes = (sizes) => {
        console.log("Size Click", sizes)
        setSelectedSize(sizes)
        setSizePrize(sizes)
        setDSizePrize(sizes.discountPrice)
        const stockNot = 0
        const stock = sizes.colors.find(color => color.stockNo)
        setSelectedStock(stock);
        // console.log("Stock", stock)
    }
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    const totalStock = 500; // Assuming total stock is 500 units
    const currentStock = sizesPrize ? sizesPrize.colors.stockNo || 0 : 0; // Current stock quantity
    const remainingStock = Math.max(0, totalStock - currentStock); // Calculate remaining stock
    const percentageRemaining = (remainingStock / totalStock) * 100;

    const handleAddToCartClick = () => {
        if (!sizesPrize) {
            // If no size is selected, default to the first size
            const selectedSize = product.sizes[0];
            handleAddToCart(selectedSize, selectedColor || 0); // Provide default value for color index
        } else {
            // If size is selected, call handleAddToCart with selected size and color
            handleAddToCart(sizesPrize, selectedColor || 0); // Provide default value for color index
        }
    };

    const handleAddToCart = (selectedSize, lastColor) => {
        // Check if size is selected
        if (!selectedSize) {
            return toast.error('Please Select Size');
        }

        // Check if color is selected
        if (!lastColor) {
            return toast.error('Please Select Color');
        }

        const selectedProduct = {
            ...product,
            size: selectedSize.size,
            price: sizesDPrize,
            color: selectedColor || selectedSize.colors.colorValue,
            quantity: quantity // Assuming quantity is already set elsewhere in your code
        };

        // Dispatch addItem action with the selected product to add to cart
        dispatch(addItem(selectedProduct));
    };
    const [lastColor, setLastColor] = useState('')

    useEffect(() => {
        const selectedSizeItem = selectedSize ? product.sizes.find(size => size.size === selectedSize.size) : null;
        const availableColors = selectedSizeItem && selectedSizeItem.colors ? selectedSizeItem.colors : [];
        setLastColor(availableColors)
        // console.log(availableColors)
    }, [selectedSize])
    return (
        <div className='w-full mt-5'>

            {/* Bread Crumbs */}
            <nav className="flex bg-gray-200 py-4" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                        <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                            <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                            </svg>
                            Home
                        </a>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <a href="/Shop" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Shop</a>
                        </div>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">{product ? product.collectionName || "s" : ""}</span>
                        </div>
                    </li>
                </ol>
            </nav>

            {/* main-single-product */}
            <div className='max-w-screen-xl  mx-auto py-3 px-3 min-h-screen'>
                {product ? (

                    <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
                        <div className='w-full md:w-[600px h-full] md:h-[600px] flex md:space-x-3'>
                            <div className='hidden md:block small-imgs mt-2 px-2'>
                                <div className='w-32 mb-2 cursor-pointer h-[8.8rem]'>
                                    <img
                                        onError={(e) => e.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"}
                                        onMouseEnter={() => handleSmallImageClick(product ? product.img : "")}
                                        src={product ? product.img : ""}
                                        className='w-full mb-2 h-full object-cover'
                                        alt=""
                                    />
                                </div>
                                <div className='w-32 mb-2 cursor-pointer h-[8.8rem]'>
                                    <img
                                        onError={(e) => e.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"}
                                        onMouseEnter={() => handleSmallImageClick(product ? product.secondImg : "")}
                                        src={product ? product.secondImg : ""}
                                        className='w-full mb-2 h-full object-cover'
                                        alt=""
                                    />
                                </div>
                                <div className='w-32 mb-2 cursor-pointer h-[8.8rem]'>
                                    <img
                                        onError={(e) => e.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"}
                                        onMouseEnter={() => handleSmallImageClick(product ? product.thirdImage : "")}
                                        src={product ? product.thirdImage : ""}
                                        className='w-full mb-2 h-full object-cover'
                                        alt=""
                                    />
                                </div>
                                <div className='w-32 mb-2 cursor-pointer h-[8.8rem]'>
                                    <img
                                        onError={(e) => e.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"}
                                        onMouseEnter={() => handleSmallImageClick(product ? product.fourthImage : "")}
                                        src={product ? product.fourthImage : ""}
                                        className='w-full mb-2 h-full object-cover'
                                        alt=""
                                    />
                                </div>
                            </div>
                            <motion.div
                                whileTap={{ scale: 0.9 }}
                                className='w-full relative bigimage  h-[450px] md:h-[600px] '
                            >
                                <img
                                    src={product && product.bigImage ? product.bigImage : (product && product.fourthImage ? product.img : "")}
                                    className='w-full h-full md:h-full object-cover object-center'
                                    alt=""
                                />

                                <div className='tag'>
                                    {product ? product.percentage : ""}%
                                </div>
                            </motion.div>
                        </div>
                        <div className=' md:hidden flex gap-2 small-imgs mt-2 px-2'>
                            <div className=' w-[4rem] h-[4rem] md:w-32 mb-2 cursor-pointer md:h-[8.8rem]'><img onError={(e) => e.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"} onMouseEnter={() => handleSmallImageClick(product ? product.img : "")}
                                src={product ? product.img : ""} className='w-full mb-2 h-full object-cover' alt="" /></div>
                            <div className=' w-[4rem] h-[4rem] md:w-32 mb-2 cursor-pointer md:h-[8.8rem]'><img onError={(e) => e.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"} onMouseEnter={() => handleSmallImageClick(product ? product.secondImg : "")}
                                src={product ? product.secondImg : ""} className='w-full mb-2 h-full object-cover' alt="" /></div>
                            <div className=' w-[4rem] h-[4rem] md:w-32 mb-2 cursor-pointer md:h-[8.8rem]'><img onError={(e) => e.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"} onMouseEnter={() => handleSmallImageClick(product ? product.thirdImage : "")}
                                src={product ? product.thirdImage : ""} className='w-full mb-2 h-full object-cover' alt="" /></div>
                            <div className=' w-[4rem] h-[4rem] md:w-32 mb-2 cursor-pointer md:h-[8.8rem]'><img onError={(e) => e.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"} onMouseEnter={() => handleSmallImageClick(product ? product.fourthImage : "")}
                                src={product ? product.fourthImage : ""} className='w-full mb-2 h-full object-cover' alt="" /></div>
                        </div>
                        <div className='w-full'>
                            <div className=' min-h-screen'>
                                <p className='text-4xl font-medium mb-2'>{product ? product.productName : ""}</p>
                                <h3 className='text-2xl mt-6 font-bold text-red-500'>
                                    <span className='text-gray-600'>Offer Price : </span>
                                    <del className='text-gray-500 font-medium'>
                                        {sizesPrize ? (
                                            sizesPrize.mainPrice !== undefined ? sizesPrize.mainPrice : (product && product.sizes && product.sizes[0] && product.sizes[0].mainPrice)
                                        ) : (product && product.sizes && product.sizes[0] && product.sizes[0].mainPrice)}
                                    </del>
                                    {' '}
                                    {sizesPrize ? (
                                        sizesPrize.discountPrice !== undefined ? sizesPrize.discountPrice : (product && product.sizes && product.sizes[0] && product.sizes[0].discountPrice)
                                    ) : (product && product.sizes && product.sizes[0] && product.sizes[0].discountPrice)}
                                </h3>
                                <div className='w-full '>
                                    <p className='text-lg text-pretty mt-4'> <b>Product Details</b> {product ? product.ProductDetail : ""}</p>
                                </div>
                                <div className='w-full '>
                                    <p className='text-lg text-pretty mt-1'> <b>Style No</b> {product ? product.StyleNo : ""}</p>
                                </div>
                                <div className='w-full '>
                                    <p className='text-lg text-pretty mt-1'> <b>Net Quantity</b> {product ? product.NetQuantity : ""}</p>
                                </div>
                               
                                <div className='w-full '>
                                    <p className='text-lg text-pretty mt-4'>{product ? product.description : ""}</p>
                                </div>
                                <div className='stock-bar w-full mt-5'>
                                    {/* <h2 className='font-bold text-2xl'>HURRY! ONLY {sizesPrize ? sizesPrize.colors.stockNo || product && product.sizes[0].colors.stockNo : product && product.sizes[0].colors.stockNo} LEFT IN STOCK.</h2> */}
                                    {/* <motion.div className="w-full bg-gray-200 mt-5 rounded-full h-2.5 dark:bg-gray-700">
                                    <motion.div
                                        className="bg-[#F88180] h-2.5 rounded-full"
                                        style={{ width: `${percentageRemaining - 10}%` }} // Set the width dynamically
                                    ></motion.div>
                                </motion.div> */}
                                </div>

                                <div className=''>
                                    <div className='pt-2 space-y-1'>
                                        {/* <h2 className='text-md capitalize'>Select Size</h2> */}
                                        <div className='flex items-center flex-wrap space-x-3'>
                                            {product.sizes.map((size, index) => {
                                                const isAvailable = size.colors.some(color => color.stockNo > 0);
                                                const isCurrentSelected = selectedSize === size;
                                                const isSelectedStockAvailable = selectedStock && selectedStock.stockNo > 0;
                                                const isDisabled = !isAvailable || (isCurrentSelected && !isSelectedStockAvailable);

                                                return (
                                                    <button
                                                        key={index}
                                                        disabled={isDisabled}
                                                        style={{
                                                            textDecoration: isDisabled ? 'line-through' : 'none',
                                                            pointerEvents: isDisabled ? 'none' : 'auto'
                                                        }}
                                                        className={`border px-4 py-2 hover:bg-gray-300 ${isCurrentSelected ? 'border-black border-2 ' : ''} ${isDisabled ? 'text-red-500 border-red-500 cursor-not-allowed' : ''}`}
                                                        onClick={() => handleClickSizes(size)}
                                                    >
                                                        {size.size}
                                                    </button>
                                                );
                                            })}
                                        </div>


                                    </div>

                                    <div className='pt-5 space-y-1'>
                                        <h2 className='text-md capitalize'>Select Color</h2>
                                        <div className='flex items-center space-x-2'>
                                            {lastColor && lastColor.map((color, index) => (
                                                <button
                                                    key={index}
                                                    style={{
                                                        textDecoration: selectedStock && selectedStock.stockNo <= 0 ? 'line-through' : 'none',
                                                        pointerEvents: selectedStock && selectedStock.stockNo <= 0 ? 'none' : 'auto'
                                                    }}
                                                    // disabled={color.stockNo === 0}
                                                    className={`border px-4 py-2 hover:bg-gray-300 ${selectedColorIndex === index ? 'border-black scale-105' : ''} ${color.stockNo === 0 ? 'text-red-500 border-red-500 cursor-not-allowed' : ''}`}
                                                    onClick={() => handleClickColor(index, color.colorValue)}
                                                >
                                                    {color.colorName}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                  

                                    {/* <div className='space-y-4'>
                                        <button className='bg-black w-full text-white py-2 px-6' onClick={handleAddToCartClick}>
                                            {product.sizes.some(size => size.colors.some(color => color.stockNo > 0)) ? (
                                                "Add to Cart"
                                            ) : (
                                                "Out of Stock"
                                            )}
                                        </button>
                                    </div> */}


                                </div>

                                <div className='flex  mt-5 items-start justify-between'>
                                    <div className="flex justify-between border-2 w-[40%]  rounded-[40px] border-black items-center">
                                        <button onClick={handleDecrement} className="  font-extrabold text-lg text-gray-900 px-5 py-1 rounded-md ml-2">-</button>
                                        <span className='text-lg font-bold'>{quantity}</span>
                                        <button onClick={handleIncrement} className="  font-extrabold text-lg text-gray-900 px-5 py-1 rounded-md mr-2">+</button>
                                    </div>
                                    <div className="flex border-2 w-[100%] rounded-[40px] border-white items-center">
                                        <button className='bg-black rounded-[40px] w-full text-white py-2 px-6' onClick={handleAddToCartClick}>
                                            {product.sizes.some(size => size.colors.some(color => color.stockNo > 0)) ? (
                                                "Add to Cart"
                                            ) : (
                                                "Out of Stock"
                                            )}
                                        </button>                       
                                                     </div>
                                </div>
                                <div className="otherdetails mt-6">
                                    <table className="border-collapse text-left border border-gray-300">
                                        <tbody>
                                            <tr className="border-b border-gray-300">
                                                <th className="border-r w-52 border-gray-300 text-gray-600 capitalize text-xl py-2 px-4">SKU:</th>
                                                <td className="py-2 px-4  w-52 text-gray-900 capitalize text-xl">{product && product.SKU ? product.SKU : ""}</td>
                                            </tr>
                                            <tr className="border-b border-gray-300">
                                                <th className="border-r  w-52 border-gray-300 text-gray-600 capitalize text-xl py-2 px-4">Availability:</th>
                                                <td className="py-2 px-4  w-52 text-gray-900 capitalize text-xl">{product && product.availability ? "In Stock" : "Out Of Stock"}</td>
                                            </tr>
                                            <tr className="border-b border-gray-300">
                                                <th className="border-r  w-52 border-gray-300 text-gray-600 capitalize text-xl py-2 px-4">Categories:</th>
                                                <td className="py-2 px-4  w-52 text-gray-900 capitalize text-xl">{product && product.categories ? product.categories : ""}</td>
                                            </tr>
                                           
                                        </tbody>
                                    </table>

                                </div>

                                <div className='payment-foot w-[100%] '>
                                    <img src={payment} className='w-full object-cover object-center' alt="" />
                                </div>

                            </div>
                        </div>

                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            {/* products */}
            <CollectionWithBanner />
            <NewArrival />
            <QualityFooter />

        </div>
    )
}

export default SingleProduct