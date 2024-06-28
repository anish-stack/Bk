import axios from 'axios';
import React, { useState } from 'react'

function ShipLogin() {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4234/api/Ship-Rocket-login', {
                email: Email,
                password: Password
            });
            console.log(response.data.data)

            const Auth = response.data.data.token
            sessionStorage.setItem('S-token', Auth)
            const check = sessionStorage.getItem('order-change')
            if (check) {
                window.location.href = `/Change-Order-Status/${check}`
            }
            else {

                window.location.href = "/Orders"
            }

        } catch (error) {
            console.error('Error logging in:', error);
            // toast.error("Error logging in. Please try again later")
        }
    };
    return (
        <div className=' w-full '>
            <div className=' max-w-[1920px] my-0 mx-auto py-1 flex flex-col gap-10'>
                <div className=' w-full text-center'>
                    <h2 className=' font-semibold text-2xl text-black'>Ship Rocket Login</h2>
                </div>
                <div className=' w-full flex items-center justify-center'>
                    <form onSubmit={handleLogin} className=' w-[60%]'>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={Email}
                                name='Email'
                                onChange={(e) => setEmail(e.target.value)}
                                className="border rounded w-full p-2"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={Password}
                                name='Password'
                                onChange={(e) => setPassword(e.target.value)}
                                className="border rounded w-full p-2"
                                required
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ShipLogin
