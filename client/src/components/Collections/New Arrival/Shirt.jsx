import React, { useEffect, useState } from 'react'
import './NewArrival.css'
import QucikView from './QucikView'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import { fetchData } from '../../../store/slices/product.slice'
const Shirt = () => {
    const dispatch = useDispatch();
    const [showQuickView, setShowQucikView] = useState(false)
    const [items, setItems] = useState(false)
    const { data, status, error } = useSelector((state) => state.product);


    useEffect(() => {
        // Dispatch the fetchData thunk when the component mounts
        dispatch(fetchData());
    }, [dispatch]);

    const handleShowQuickView = (item, index) => {
        setShowQucikView(true)
        console.log("Item", item)
        console.log("index", index)
        setItems(item)

    }
    const handleClose = () => {
        setShowQucikView(false)
    }

    const Data = [
        {
            id: 1,
            img: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Alala-fast-track-pant-1_1.jpg?v=1700193822&width=600",


            secondImg: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Alala-fast-track-pant-2_1.jpg?v=1700193822&width=600",
            thirdimage: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Alala-fast-track-pant-3_1.jpg?v=1700193822&width=600",
            fourthImage: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Alala-fast-track-pant-4_1.jpg?v=1700193822&width=600",
            dicountPrice: "$20",
            MainPrice: "$30",
            percentage: "25%",
            collectionName: "Tops",
            description: "Keep your little one stylish and comfortable with our Girls' Floral Print Tee. Crafted from soft and breathable cotton fabric, this tee features a vibrant floral print that adds a pop of color to her everyday look. The relaxed fit and crew neckline ensure all-day comfort, while the short sleeves make it perfect for layering or wearing alone during warmer weather. Pair it with jeans, shorts, or a skirt for versatile styling options.",
            color: ["Blue", "Silver", "Black"],
            SKU: "yoga1",
            availability: "In Stock",
            categories: "Girls' Fashion",
            tags: ["Girls' Clothing", "Tops", "Floral Print"]
        },
        {
            id: 2,
            img: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Alala-serene-bra-1_1.jpg?v=1700194727&width=600",


            secondImg: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Alala-serene-bra-2.jpg?v=1700194728&width=600",
            thirdimage: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Alala-serene-bra-3_1.jpg?v=1700194727&width=600",
            fourthImage: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Alala-serene-bra-4_1.jpg?v=1700194727&width=600",
            dicountPrice: "$25",
            MainPrice: "$40",
            percentage: "20%",
            collectionName: "Matching Sets",
            description: "Elevate her everyday wardrobe with our Girls' Floral Matching Set. This set includes a comfortable short-sleeve top and coordinating shorts, both adorned with a vibrant floral print for a playful touch. The soft and stretchy fabric ensures all-day comfort and freedom of movement, while the elastic waistband on the shorts provides a secure fit. Mix and match these pieces with other items in her closet for versatile styling options.",
            color: ["Pink", "White", "Yellow"],
            SKU: "yoga2",
            availability: "In Stock",
            categories: "Girls' Fashion",
            tags: ["Girls' Clothing", "Matching Set", "Floral Print"]
        },
        {
            id: 3,
            img: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Alala-set-skort-1_1.jpg?v=1700194998&width=600",


            secondImg: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Alala-set-skort-2_1.jpg?v=1700194998&width=600",
            thirdimage: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Alala-set-skort-3_1.jpg?v=1700194998&width=600",
            fourthImage: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Alala-set-skort-4_1.jpg?v=1700194998&width=600",
            dicountPrice: "$15",
            MainPrice: "$28",
            percentage: "30%",
            collectionName: "Bottoms",
            description: "Add a touch of style to her wardrobe with our Girls' Denim Shorts. These classic denim shorts feature a versatile design that pairs effortlessly with a variety of tops and shoes. The soft and stretchy fabric ensures a comfortable fit, while the adjustable waistband allows for a customizable fit as she grows. Perfect for everyday wear or casual outings, these denim shorts will become a staple in her warm-weather wardrobe.",
            color: ["Denim Blue"],
            SKU: "yoga3",
            availability: "In Stock",
            categories: "Girls' Fashion",
            tags: ["Girls' Clothing", "Bottoms", "Denim Shorts"]
        },
        {
            id: 4,
            img: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Eco-friendlyNon-SlipExercise1-1.jpg?v=1700203068&width=600",
            secondImg: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Eco-friendlyNon-SlipExercise1-2.jpg?v=1700203068&width=600",
            thirdimage: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Eco-friendlyNon-SlipExercise1-3.jpg?v=1700203068&width=600",
            fourthImage: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Eco-friendlyNon-SlipExercise1-4.jpg?v=1700203068&width=600",
            dicountPrice: "$10",
            MainPrice: "$18",
            percentage: "45%",
            collectionName: "Accessories",
            description: "Complete her look with our Girls' Bow Headband Set. This set includes three adorable headbands, each featuring a different bow design for versatile styling options. Made from soft and stretchy fabric, these headbands are gentle on her hair and comfortable to wear all day long. Whether she's dressing up for a special occasion or adding a cute accent to her everyday outfit, these bow headbands are the perfect accessory.",
            color: ["Pink", "Purple", "White"],
            SKU: "yoga4",
            availability: "In Stock",
            categories: "Girls' Fashion",
            tags: ["Girls' Accessories", "Headbands", "Bow Design"]
        },
        {
            id: 5,
            img: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Alala-fast-track-pant-1_1.jpg?v=1700193822&width=600",


            secondImg: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Alala-fast-track-pant-2_1.jpg?v=1700193822&width=600",
            thirdimage: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Alala-fast-track-pant-3_1.jpg?v=1700193822&width=600",
            fourthImage: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Alala-fast-track-pant-4_1.jpg?v=1700193822&width=600",
            dicountPrice: "$20",
            MainPrice: "$30",
            percentage: "25%",
            collectionName: "Tops",
            description: "Keep your little one stylish and comfortable with our Girls' Floral Print Tee. Crafted from soft and breathable cotton fabric, this tee features a vibrant floral print that adds a pop of color to her everyday look. The relaxed fit and crew neckline ensure all-day comfort, while the short sleeves make it perfect for layering or wearing alone during warmer weather. Pair it with jeans, shorts, or a skirt for versatile styling options.",
            color: ["Blue", "Silver", "Black"],
            SKU: "yoga1",
            availability: "In Stock",
            categories: "Girls' Fashion",
            tags: ["Girls' Clothing", "Tops", "Floral Print"]
        },
        {
            id: 6,
            img: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Alala-serene-bra-1_1.jpg?v=1700194727&width=600",


            secondImg: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Alala-serene-bra-2.jpg?v=1700194728&width=600",
            thirdimage: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Alala-serene-bra-3_1.jpg?v=1700194727&width=600",
            fourthImage: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Alala-serene-bra-4_1.jpg?v=1700194727&width=600",
            dicountPrice: "$25",
            MainPrice: "$40",
            percentage: "20%",
            collectionName: "Matching Sets",
            description: "Elevate her everyday wardrobe with our Girls' Floral Matching Set. This set includes a comfortable short-sleeve top and coordinating shorts, both adorned with a vibrant floral print for a playful touch. The soft and stretchy fabric ensures all-day comfort and freedom of movement, while the elastic waistband on the shorts provides a secure fit. Mix and match these pieces with other items in her closet for versatile styling options.",
            color: ["Pink", "White", "Yellow"],
            SKU: "yoga2",
            availability: "In Stock",
            categories: "Girls' Fashion",
            tags: ["Girls' Clothing", "Matching Set", "Floral Print"]
        },
        {
            id: 7,
            img: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Alala-set-skort-1_1.jpg?v=1700194998&width=600",


            secondImg: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Alala-set-skort-2_1.jpg?v=1700194998&width=600",
            thirdimage: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Alala-set-skort-3_1.jpg?v=1700194998&width=600",
            fourthImage: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Alala-set-skort-4_1.jpg?v=1700194998&width=600",
            dicountPrice: "$15",
            MainPrice: "$28",
            percentage: "30%",
            collectionName: "Bottoms",
            description: "Add a touch of style to her wardrobe with our Girls' Denim Shorts. These classic denim shorts feature a versatile design that pairs effortlessly with a variety of tops and shoes. The soft and stretchy fabric ensures a comfortable fit, while the adjustable waistband allows for a customizable fit as she grows. Perfect for everyday wear or casual outings, these denim shorts will become a staple in her warm-weather wardrobe.",
            color: ["Denim Blue"],
            SKU: "yoga3",
            availability: "In Stock",
            categories: "Girls' Fashion",
            tags: ["Girls' Clothing", "Bottoms", "Denim Shorts"]
        },
        {
            id: 8,
            img: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Eco-friendlyNon-SlipExercise1-1.jpg?v=1700203068&width=600",
            secondImg: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Eco-friendlyNon-SlipExercise1-2.jpg?v=1700203068&width=600",
            thirdimage: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Eco-friendlyNon-SlipExercise1-3.jpg?v=1700203068&width=600",
            fourthImage: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Eco-friendlyNon-SlipExercise1-4.jpg?v=1700203068&width=600",
            dicountPrice: "$10",
            MainPrice: "$18",
            percentage: "45%",
            collectionName: "Accessories",
            description: "Complete her look with our Girls' Bow Headband Set. This set includes three adorable headbands, each featuring a different bow design for versatile styling options. Made from soft and stretchy fabric, these headbands are gentle on her hair and comfortable to wear all day long. Whether she's dressing up for a special occasion or adding a cute accent to her everyday outfit, these bow headbands are the perfect accessory.",
            color: ["Pink", "Purple", "White"],
            SKU: "yoga4",
            availability: "In Stock",
            categories: "Girls' Fashion",
            tags: ["Girls' Accessories", "Headbands", "Bow Design"]
        },
        {
            id: 9,
            img: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Alala-fast-track-pant-1_1.jpg?v=1700193822&width=600",


            secondImg: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Alala-fast-track-pant-2_1.jpg?v=1700193822&width=600",
            thirdimage: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Alala-fast-track-pant-3_1.jpg?v=1700193822&width=600",
            fourthImage: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Alala-fast-track-pant-4_1.jpg?v=1700193822&width=600",
            dicountPrice: "$20",
            MainPrice: "$30",
            percentage: "25%",
            collectionName: "Tops",
            description: "Keep your little one stylish and comfortable with our Girls' Floral Print Tee. Crafted from soft and breathable cotton fabric, this tee features a vibrant floral print that adds a pop of color to her everyday look. The relaxed fit and crew neckline ensure all-day comfort, while the short sleeves make it perfect for layering or wearing alone during warmer weather. Pair it with jeans, shorts, or a skirt for versatile styling options.",
            color: ["Blue", "Silver", "Black"],
            SKU: "yoga1",
            availability: "In Stock",
            categories: "Girls' Fashion",
            tags: ["Girls' Clothing", "Tops", "Floral Print"]
        },
        {
            id: 10,
            img: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Alala-serene-bra-1_1.jpg?v=1700194727&width=600",


            secondImg: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Alala-serene-bra-2.jpg?v=1700194728&width=600",
            thirdimage: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Alala-serene-bra-3_1.jpg?v=1700194727&width=600",
            fourthImage: "https://cdn.shopify.com/s/files/1/0561/1270/9761/files/Alala-serene-bra-4_1.jpg?v=1700194727&width=600",
            dicountPrice: "$25",
            MainPrice: "$40",
            percentage: "20%",
            collectionName: "Matching Sets",
            description: "Elevate her everyday wardrobe with our Girls' Floral Matching Set. This set includes a comfortable short-sleeve top and coordinating shorts, both adorned with a vibrant floral print for a playful touch. The soft and stretchy fabric ensures all-day comfort and freedom of movement, while the elastic waistband on the shorts provides a secure fit. Mix and match these pieces with other items in her closet for versatile styling options.",
            color: ["Pink", "White", "Yellow"],
            SKU: "yoga2",
            availability: "In Stock",
            categories: "Girls' Fashion",
            tags: ["Girls' Clothing", "Matching Set", "Floral Print"]
        }


    ];


    return (
        <div className='w-full mt-12'>
            <div className='text-center py-2 md:py-5'>
                <h1 className='md:text-3xl text-pretty mb-2 text-2xl font-bold'>Shirt Collection</h1>
                {/* <p className='md:tracking-wide font-meduim text-base md:text-xl	'>Shop the trending products and most buy of the week</p> */}
            </div>
            <div className='mt-5 p-2'>
                <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 space-x-3 gap-2'>
                    {data && data.map((item, index) => (
                         item.categories === "Shirt" ||  item.categories === "Shirt" ? (
                        <div className=' p-1 md:p-2' key={index}>
                            <div className='relative first-img '>
                                <Link className='relative first-img' to={`/single-product/${item._id}/${item.productName}`}>

                                    <img src={item.img} className='w-full relative transition-all duration-500 ease-linear  h-64 md:h-[23rem] object-cover object-center' alt={item.collectionName} />
                                    <img src={item.secondImg} className='w-full transition-all duration-500 ease-linear  second-img absolute top-0 opacity-0 h-64 md:h-[23rem] object-cover object-center' alt={item.secondImg} />
                                </Link>
                                <div className='buttons'>
                                    <ul>
                                        <li onClick={() => handleShowQuickView(item, index)}><i className="ri-eye-fill"></i></li>
                                        <li><i className="ri-shopping-bag-4-line"></i></li>
                                        <li><i className="ri-heart-fill"></i></li>

                                    </ul>
                                </div>
                                <div className='product-information text-center'>
                                    <p className='text-xl font-medium mb-2'>{item.productName}</p>
                                    <div className='prices'>
                                        <p className='text-base font-semibold text-[#E51515]'><del className='text-gray-500'>{item.sizes[0].mainPrice}</del> {item.sizes[0].discountPrice}</p>
                                    </div>
                                </div>
                                {/* <h3 className='text-xl font-bold text-red-500'>
                                    <del className='text-gray-300 font-thin'>{item.sizes[0].mainPrice}</del> {item.sizes[0].discountPrice}
                                </h3> */}
                                <div className='tag'>
                                    {item.percentage}%
                                </div>
                            </div>
                        </div>
                 
                ):null

            ))}
                </div>
            </div>
            <QucikView showQuickView={showQuickView} handleClose={handleClose} item={items} />
        </div>)
}

export default Shirt