import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Noproduct from './no_product_5.png'
const DynamicCollections = () => {
    const { Collection } = useParams();
    const [categoryImage, setCategoryImage] = useState([]);
    const [breadcrumb, setBreadcrumb] = useState([]);

    const fetchCategory = async () => {
        try {
            const res = await axios.get(`https://www.api.bkexporttradeco.store/api/get-category`);
            const dataOfRes = res.data.data;
            const filterRes = dataOfRes.filter(item => item.MainCategory === Collection);
            console.log(filterRes)
            setCategoryImage(filterRes);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, [Collection]);

    useEffect(() => {
        setBreadcrumb([
            { name: 'Home', link: '/' },
            { name: 'Shop', link: '/Shop' },
            { name: Collection, link: `/Collection/${Collection}` }
        ]);
    }, [Collection]);

    return (
        <div className='container mx-auto'>
            {/* Breadcrumbs */}
            <nav className="flex bg-gray-900 h-52 my-4">

                <ol className="flex w-full justify-center text-center items-center space-x-2">

                    {breadcrumb.map((crumb, index) => (
                        <li className='text-center' key={index}>
                            <Link to={crumb.link} className="text-white text-sm md:text-xl hover:underline">
                                {crumb.name}
                            </Link>
                            {index !== breadcrumb.length - 1 && <span className=" text-red-400 mx-2">/</span>}
                        </li>
                    ))}
                </ol>
            </nav>

            {/* Category images */}
            <div>
            {categoryImage && categoryImage.length === 0 ? (
                <div className=''>
                    <div>
                        <img className='h-64 md:h-full' src={Noproduct} alt="" />
                    </div>
                     {/* <p>No products in {Collection}</p> */}
                </div>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {categoryImage && categoryImage.map((item, index) => (
                        <div key={index} className='card relative overflow-hidden rounded-lg'>
                            <img src={item.CatImg} alt={item.title} className='w-full h-auto transition duration-300 transform hover:scale-105' />
                            <div className='absolute inset-0 flex justify-center items-center opacity-0 bg-black bg-opacity-50 hover:opacity-100 transition-opacity'>
                                <Link to={`/Product-page/${item.title}`} className='bg-blue-500 text-white py-2 px-4 rounded-lg'>
                                    {item.title}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

        </div>
    );
};

export default DynamicCollections;
