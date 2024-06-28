import React, { useState } from 'react';
import axios from 'axios';
import logo from './logo.png';
import toast from 'react-hot-toast'
const Logins = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [notAuthorized, setNotAuthorized] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://www.api.bkexporttradeco.store/api/login', {
        email: Email,
        password :Password
      });
      console.log(response.data)

        const Auth = response.data.token
        sessionStorage.setItem('token',Auth)
        window.location.href="All Products"
      
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error("Error logging in. Please try again later")

      setError('Error logging in. Please try again later.');
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="flex justify-center mb-4">
            {/* <img src={logo} alt="Logo" className="h-16 w-auto" /> */}
            <h2 className='text-4xl font-bold'>Admin Login</h2>
          </div>
          {/* <h1 className="text-3xl font-bold mb-4 text-center">Login</h1> */}
          <form onSubmit={handleLogin}>
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
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {notAuthorized && <div className="text-red-500 mb-4">You are not authorized to access this portal.</div>}
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Logins;
