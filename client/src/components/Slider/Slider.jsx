import React, { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { debounce } from 'lodash'; // Import debounce function from lodash
import './Slider.css';
import LapImage from './lycra banner mobile view_19_7_2022_767x430.jpg';
import LapImageSecond from './Seema Collection banner-2.png';
import LapImageThird from './Seema Collection banner-3.png';
import MobileImage from '../../assets/seema collection.jpg';
import MobileImageSecond from '../../assets/seema collection 3.jpg';
import MobileImageThird from '../../assets/seema collection 2.jpg';

const CustomSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [slide, setSlide] = useState([]);

    const LapData = [
        { img: LapImage },
        { img: LapImageSecond },
        { img: LapImageThird }
    ];

    const MobData = [
        { img: MobileImage },
        { img: MobileImageSecond },
        { img: MobileImageThird }
    ];

    const settings = {
        className: "w-full h-full",
        dots: true,
        infinite: true,
        slidesToShow: 1,
        autoplay: true,
        swipeToSlide: true,
        autoplaySpeed: 1500,
        fade: true,
        slidesToScroll: 1,
        adaptiveHeight: true,
        beforeChange: (oldIndex, newIndex) => {
            setCurrentSlide(newIndex);
        }
    };

    // Function to check if the screen is mobile-sized
    const checkIsMobile = () => {
        setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    // Debounced version of checkIsMobile
    const debouncedCheckIsMobile = debounce(checkIsMobile, 300);

    useEffect(() => {
        // Listen for window resize to update the screen size state
        window.addEventListener('resize', debouncedCheckIsMobile);

        // Initial check for mobile on component mount
        checkIsMobile();

        return () => {
            // Cleanup: remove event listener
            window.removeEventListener('resize', debouncedCheckIsMobile);
        };
    }, []);

    useEffect(() => {
        const sliderData = isMobile ? MobData : LapData;
        setSlide(sliderData);
    }, [isMobile]);

    return (
        <div className='max-w-[1600px]'>
            <Slider {...settings}>
                {slide.map((slide, index) => (
                    <div
                        key={index}
                        style={{ backgroundImage: `url(${slide.img})` }}
                        className=''
                    >
                        {/* Optionally, you can use an img element */}
                        <img src={slide.img} alt={`Slide ${index}`} className="w-full h-full object-cover" />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default CustomSlider;
