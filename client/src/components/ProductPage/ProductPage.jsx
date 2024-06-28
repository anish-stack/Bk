import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import QuickView from '../Collections/New Arrival/QucikView';

function ProductPage() {
  const { drop } = useParams();
  const [showQuickView, setShowQuickView] = useState(false);
  const [data, setData] = useState([]);
  const [items, setItems] = useState(null); // Add this line to declare the 'items' state variable

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://www.api.bkexporttradeco.store/api/getProductByCategoreies/${drop}`);
        console.log(response.data.data);
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [drop]);

  const handleShowQuickView = (item, index) => {
    setShowQuickView(true);
    setItems(item);
  };

  const handleClose = () => {
    setShowQuickView(false);
  };

  return (
    <div className='w-full mt-12'>
      <div className='text-center py-2 md:py-5'>
        <h1 className='md:text-3xl text-pretty mb-2 text-2xl font-bold'>{drop} Collection</h1>
      </div>
      <div className='mt-5 p-2'>
        <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 space-x-3 gap-2'>
          {data.map((item, index) => (
            <div className='p-1 md:p-2' key={index}>
              <div className='relative first-img '>
                <Link className='relative first-img' to={`/single-product/${item._id}/${item.productName}`}>
                  <img src={item.img} className='w-full relative transition-all duration-500 ease-linear h-64 md:h-[23rem] object-cover object-center' alt={item.collectionName} />
                  <img src={item.secondImg} className='w-full transition-all duration-500 ease-linear second-img absolute top-0 opacity-0 h-64 md:h-[23rem] object-cover object-center' alt={item.secondImg} />
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
                <div className='tag'>
                  {item.percentage}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <QuickView showQuickView={showQuickView} handleClose={handleClose} item={items} />
    </div>
  );
}

export default ProductPage;
