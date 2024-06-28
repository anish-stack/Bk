import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    try {
      const response = await axios.get('https://www.api.bkexporttradeco.store/api/get-category');

      setCategories(response.data.data);


      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      setIsLoading(false); // Update loading state even if there's an error
    }
  };
  useEffect(() => {


    fetchData();
  }, []);


  const handleEditCategory = (categoryId) => {
    // Implement edit category functionality
    console.log('Edit category:', categoryId);
  };

  const handleDeleteCategory = async (id) => {
    try {
      const response = await axios.delete(`https://www.api.bkexporttradeco.store/api/delete-category/${id}`);
      console.log('Category deleted successfully:', id);
      console.log(response.data);
      fetchData();
      toast.success('Category Deleted')
      // Implement any additional actions after successful deletion
    } catch (error) {
      toast.error('Internal Error')
      console.error('Error deleting category:', error);
      // Implement error handling, such as displaying an error message to the user
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Categories</h2>
        <Link to="/Create-Categories" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          + Add Category
        </Link>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : categories.length === 0 ? (
        <p>No categories available.</p>
      ) : (
        <table className="w-full text-center">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Main Category</th>

              <th className="border border-gray-400 px-4 py-2">Sub-Category</th>
              <th className="border border-gray-400 px-4 py-2">Category Image</th>
              <th className="border border-gray-400 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories && categories.map((category) => (
              <tr key={category._id}>
                <td className="border border-gray-400 px-4 py-2">{category.MainCategory}</td>

                <td className="border border-gray-400 px-4 py-2">{category.title}</td>
                <td className="border flex items-center justify-center border-gray-400 px-4 py-2">
                  <img src={category.CatImg} alt={category.title} className="w-12 h-12 object-cover rounded-full" />
                </td>
                <td className="border border-gray-400 px-4 py-2">

                  <button onClick={() => handleDeleteCategory(category._id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllCategories;
