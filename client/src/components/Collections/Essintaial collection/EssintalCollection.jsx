import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';

import './collection.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const EssentialCollection = () => {
    const [ex, setEx] = useState([]);

    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:4234/api/all-redirect');
            setEx(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="w-full mt-12">
              {ex.length === 0 ? (
                null
            ) : (
                <>
                
               
            <div className="text-center py-2 md:py-5">
                <h1 className="md:text-3xl text-pretty mb-2 text-2xl font-bold">The Essential Collection</h1>
                <p className="md:tracking-wide font-medium text-base md:text-xl">Shop the latest products from the most popular collections</p>
            </div>
            <div className="mt-5">
                <Swiper
                    spaceBetween={30}
                    slidesPerView={2}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Autoplay, Pagination, Navigation]}
                    autoplay={{
                        delay: 800,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{

                        640: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 50,
                        },
                    }}
                    loop={true}
                    className="mySwiper"
                >
                    {ex.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="p-1 md:p-2">
                                <Link to={`/Product-page/${item.OneWhichCategoryRedirect}`} className="flex items-center justify-center relative">
                                    <img src={item.CatImg} className="w-full imgs-collections h-64 md:h-96 object-cover object-top" alt={item.title} />
                                    <button className="whitespace-nowrap collectionbtns">{item.title}</button>
                                </Link>
                            </div>
                        </SwiperSlide>  

                    ))}
                </Swiper>

            </div>
            </>
            )}
        </div>
    );
};

export default EssentialCollection;
