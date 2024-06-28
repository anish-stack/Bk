import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import logo from './logosemaa.png'
import { useSelector } from 'react-redux'
import axios from 'axios'
const Header = () => {
    const [showMenu, setShowMenu] = useState(false)
    const [item, setItem] = useState()
    const [dropdown, setDropdown] = useState(null)

    const handleToggle = () => {
        setShowMenu(!showMenu)
    }
    const handleClose = () => {
        setShowMenu(false)
    }
    const cartItems = useSelector(state => state.cart);
    console.log(cartItems.items.length);
    const User = useSelector(state => state.register)

    const handleFetchMainCategorey = async () => {
        try {
            const res = await axios.get('https://www.api.bkexporttradeco.store/api/get-all-main-category')
            console.log(res.data.data)
            setItem(res.data.data)
        } catch (error) {
            console.log(`error`)
        }
    }
    const handleFetchSubCategory = async (item) => {
        try {
            const res = await axios.get(`https://www.api.bkexporttradeco.store/api/get-title/${item}`)
            console.log(res.data.data)
            setDropdown(res.data.data)
        } catch (error) {
            console.log(`${error}`)
        }
    }
    const handleRemoveSubCategory = () => {
        setDropdown(null)
    }
    const [hoveredIndex, setHoveredIndex] = useState(null);
    useEffect(() => {
        handleFetchMainCategorey()
        handleFetchSubCategory()
    }, [])
    return (
        <header className='bg-banner'>
            <div className="top-header">

                <div className="front whitespace-nowrap">
                    <span>Welcome to B & K EXPORT TRADE CO</span>
                    <span className=' hidden md:block'>Sign up and get 10% extra discount</span>

                </div>
                <div className="back  whitespace-nowrap">
                    <span className=' hidden md:block'>Free home delivery all over India,</span>
                    <span className=' hidden md:block'>Welcome to B & K EXPORT TRADE CO</span>
                    <span className=' hidden md:block'>Sign up and get 10% extra discount</span>
                    <span className=' hidden md:block'>Welcome to B & K EXPORT TRADE CO</span>

                </div>

            </div>
            {/* no touchable */}
            <div className='navbar flex items-center whitespace-nowrap  bg-white  shadow-md justify-between p-2 gap-2'>
                <Link to={'/'} className='navbar-brand py-4 w-32'>
                <h2 className='text-2xl font-bold'>B & K EXPORT TRADE CO</h2>
                    {/* <img src={logo} className='logo' alt="This is B & K EXPORT TRADE COs logo" /> */}
                </Link>
                <nav className={`${showMenu ? 'showNavBar' : ''}`}>
                    <ul className='flex  md:items-center md:space-x-6'>
                        <li onClick={handleClose} className='font-medium text-gray-900 text-lg '><Link to="/">Home</Link></li>
                        <li onClick={handleClose} className='font-medium text-gray-900 text-lg '><Link to="/Shop">Shop</Link></li>
                        {item && item.map((item, index) => (
                            
                            <Link to={`/Collection/${item}`}  onMouseEnter={() => handleFetchSubCategory(item)} className='font-medium leading-[4rem] md:leading-[0] cursor-pointer relative text-gray-900 text-lg ' key={index}>{item}</Link>
                            
                        ))}
                        

                    </ul>
                </nav>
                <div className='btns-ctas smhidden space-x-4'>
                    {User.token ? (
                        <Link onClick={handleClose} to={'/Profile'}>Profile</Link>
                    ) : (
                        <Link onClick={handleClose} to={'/sign-in'}>Sign In</Link>
                    )}

                    <Link onClick={handleClose} to={'/Shopping-Cart'} className='relative px-3'><i className="ri-shopping-bag-4-line"></i>

                        <span className='absolute count-number'>{cartItems.items.length || "0"}</span></Link>

                </div>
                <div className='mobile  md:hidden'>
                    <div className='btns-ctas space-x-4'>
                        {User.token ? (
                            <Link onClick={handleClose} to={'/Profile'}>Profile</Link>
                        ) : (
                            <Link onClick={handleClose} to={'/sign-in'}>Sign In</Link>
                        )}
                        <Link to={'/Shopping-Cart'} className='relative px-3'><i className="ri-shopping-bag-4-line"></i>

                            <span className='absolute count-number'>{cartItems.items.length || "0"}</span></Link>

                    </div>
                    <ul className='flex items-center transition-all duration-500 ease-in-out space-x-4'>
                        <li onClick={handleToggle}><i className={`ri-menu-3-fill text-xl transition-all duration-500 ease-in-out  ${showMenu ? 'hidden' : ''} font-extrabold`}></i></li>
                        <li onClick={handleToggle}><i className={`ri-close-fill text-xl transition-all duration-500 ease-in-out ${showMenu ? '' : 'hidden'} font-extrabold`}></i></li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header