import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from '@react-pdf/renderer';

const AllCategoreybanner = () => {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Number of items per page

    useEffect(() => {
        fetchData();
    }, []);

    
    const fetchDataDelete = async (id) => {
        try {
            const response = await axios.delete(`https://www.api.bkexporttradeco.store/api/delete-redirect/${id}`);
            console.log(response.data)
            fetchData()
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchData = async () => {
        try {
            const response = await axios.get('https://www.api.bkexporttradeco.store/api/all-redirect');
            setCategories(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container p-5 mx-auto">
    <div className='flex items-center justify-between'>
    <h1 className="text-2xl font-bold mb-4">All Category Banners </h1>
    <h1 className="text-xl py-2 px-2 bg-purple-500 cursor-pointer font-bold mb-4"><a href={'/Create-Category-Banners'}>+ Create Category Banners</a></h1>
    </div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category Which Redirect</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {currentItems.map((category) => (
                        <tr key={category._id}>
                            <td className="px-6 py-4 whitespace-nowrap">{category.OneWhichCategoryRedirect}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{category.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <img src={category.CatImg} alt={category.title} className="h-10 w-10 object-cover rounded-full" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={() => fetchDataDelete(category._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav className="mt-4" aria-label="Pagination">
                <ul className="flex justify-center">
                    {Array.from({ length: Math.ceil(categories.length / itemsPerPage) }, (_, index) => (
                        <li key={index}>
                            <button
                                className={`${index + 1 === currentPage ? 'bg-indigo-500 text-white' : 'text-indigo-500'
                                    } hover:bg-indigo-700 hover:text-white font-medium py-2 px-4 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                                onClick={() => paginate(index + 1)}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default AllCategoreybanner;
