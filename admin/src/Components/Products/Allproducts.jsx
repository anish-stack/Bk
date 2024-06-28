import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Allproducts = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(7);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4234/api/get-products"
        );
        setProducts(response.data.data.reverse());
        console.log(response.data.data);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:4234/api/delete-products/${id}`)
      console.log(res.data)
      setProducts(products.filter(products => products._id !== id));
      toast.success('Product Deleted')
    } catch (error) {
      console.log(error)
      toast.error('Internal Error')
    }
  }
  // Logic to paginate products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const truncateDescription = (desc) => {
    const words = desc.split(' ');
    if (words.length <= 5) {
      return desc;
    }
    return words.slice(0, 5).join(' ') + '...';
  };
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full overflow-scroll p-2">
      <h1 className="text-2xl text-black font-bold mb-4">Product List</h1>
      <table className="w-[1400px] border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border text-black border-gray-300 px-2 ">Image</th>
            <th className="border text-black border-gray-300 px-2 ">Product Name</th>
            {/* <th className="border text-black border-gray-300 px-2 ">Original Price</th> */}
            <th className="border text-black border-gray-300 px-2 ">Percentage</th>
            <th className="border text-black border-gray-300 px-2 ">Collection Name</th>
            <th className="border text-black border-gray-300 px-2 ">Description</th>
            <th className="border text-black border-gray-300 px-2 ">Availability</th>
            <th className="border text-black border-gray-300 px-2 ">SKU</th>
            <th className="border text-black border-gray-300 px-2 ">Category</th>
            <th className="border text-black border-gray-300 px-2 ">Tags</th>
            <th className="border text-black border-gray-300 px-2 ">Action</th>



          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product._id}>
              <td className="border text-black border-gray-300 w-16 h-16 px-2 py-2">

                <img src={product.img} alt={product.productName} className=" h-ful w-full object-cover" />

              </td>
              <td className="border w-[150px] text-blue-400 underline  border-gray-300 px-2 "><Link to={`/EditProducts/${product.collectionName}/${product._id}`}>{product.productName}</Link></td>
              {/* <td className="border  w-[80px]  text-black  border-gray-300 px-2">{product.mainPrice}</td> */}
              <td className="border text-black w-[80px]    border-gray-300 px-2">{product.percentage}</td>
              <td className="border w-20 text-nowrap text-black  border-gray-300 px-2">{product.collectionName}</td>
              <td className="border text-black  border-gray-300  w-20 px-2">{truncateDescription(product.description)}</td>
              <td className="border w-16 text-black  border-gray-300 px-2">{product.availability ? 'Available' : 'Not Available'}</td>
              <td className="border text-black w-20 h-16 overflow-hidden border-gray-300 text-nowrap px-2 ">  {product.SKU}</td>
              <td className="border text-black w-20 h-16 overflow-hidden border-gray-300 text-nowrap px-2 ">{product.categories}</td>
              <td className="border w-16 text-nowrap text-black border-gray-300 px-2">{product.tags || "N.A"}</td>
              <td onClick={() => handleDelete(product._id)} className="border w-[120px] text-black border-gray-300 px-2 cursor-pointer hover:bg-gray-200 transition-colors duration-300">
                <button className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded">
                  Delete Product
                </button>
              </td>

              {/* Render only the first image */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, i) => (
          <button
            key={i}
            className={`mx-1 px-3 py-1 bg-red-400 hover:bg-red-300 rounded-full ${currentPage === i + 1 && 'bg-gray-400'}`}
            onClick={() => paginate(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Allproducts;
