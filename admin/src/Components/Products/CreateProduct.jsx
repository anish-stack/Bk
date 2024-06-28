import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageModal from './ImageModal';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast'
const CreateProduct = () => {
  const [load, setLoad] = useState(false)
  const [formdata, setFormdata] = useState({
    productName: '',
    sizes: [],
    discountPrice: '',
    StyleNo:'',
    NetQuantity:'',
    ProductDetail:'',
    mainPrice: '',
    percentage: '',
    collectionName: '',
    description: '',
    SKU: '',
    availability: true,
    categories: '',
    tags: '',

  });

  const [imagePreviews, setImagePreviews] = useState([]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    const previews = fileArray.map(file => URL.createObjectURL(file));

    setFormdata((prevProduct) => ({
      ...prevProduct,
      files: files
    }));

    setImagePreviews(previews);
  };
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'size' || name === 'discountPrice' || name === 'mainPrice') {
      const sizes = [...formdata.sizes];
      sizes[index][name] = value;
      setFormdata({
        ...formdata,
        sizes
      });
    } else if (name === 'file') {
      setFormdata({
        ...formdata,
        [name]: e.target.files[0]
      });
    } else {
      setFormdata({
        ...formdata,
        [name]: value
      });
    }
  };



  const handleAddSize = () => {
    setFormdata({
      ...formdata,
      sizes: [...formdata.sizes, { size: '', discountPrice: '', mainPrice: '', colors: [{ colorValue: '', stockNo: '' }] }]
    });
  };

  const handleRemoveSize = (index) => {
    const sizes = [...formdata.sizes];
    sizes.splice(index, 1);
    setFormdata({
      ...formdata,
      sizes
    });
  };
  // const handleFileChange = (e) => {
  //   const files = e.target.files;
  //   setFormdata((prevProduct) => ({
  //     ...prevProduct,
  //     files: files
  //   }));
  // };

  const handleDiscountChange = (index, discountPercent) => {
    // Check if discountPercent is a valid number
    if (!isNaN(discountPercent) && discountPercent !== '') {
      // Convert discountPercent to a number
      const discountPercentage = parseFloat(discountPercent);
      // Ensure discountPercentage is within valid range (0-100)
      if (discountPercentage >= 0 && discountPercentage <= 100) {
        const originalPrice = parseFloat(formdata.sizes[index].mainPrice);
        const discountedPrice = originalPrice - (originalPrice * discountPercentage / 100);
        const updatedSizes = [...formdata.sizes];
        updatedSizes[index].discountPrice = discountedPrice.toFixed(2);
        updatedSizes[index].discountPercent = discountPercentage;
        setFormdata({ ...formdata, sizes: updatedSizes });
      } else {
        // Handle invalid discount percentage (outside of range)
        // You can display a message or handle it based on your application's logic
        console.error('Discount percentage must be between 0 and 100.');
        const updatedSizes = [...formdata.sizes];
        updatedSizes[index].discountPrice = ''; // Clear discount price
        updatedSizes[index].discountPercent = ''; // Clear discount percent
        setFormdata({ ...formdata, sizes: updatedSizes });
      }
    } else {
      // Handle invalid discount percentage (not a number)
      // You can display a message or handle it based on your application's logic
      console.error('Invalid discount percentage.');
      const updatedSizes = [...formdata.sizes];
      updatedSizes[index].discountPrice = ''; // Clear discount price
      updatedSizes[index].discountPercent = ''; // Clear discount percent
      setFormdata({ ...formdata, sizes: updatedSizes });
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true)
    // console.log('forms-data',formdata)
    const sizesJSON = JSON.stringify(formdata.sizes);
    // Create a new FormData object
    const formData = new FormData();

    // Append other form data fields
    for (const key in formdata) {
      if (formdata.hasOwnProperty(key) && key !== 'sizes' && key !== 'files') {
        formData.append(key, formdata[key]);
      }
    }
    formData.append('sizes', sizesJSON);
    // Append files to the FormData object
    if (formdata.files) {
      Array.from(formdata.files).forEach((file, index) => {
        formData.append('images', file);
      });
    }

    try {
      // Make Axios request
      const response = await axios.post('http://localhost:4234/api/create-products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data); // Assuming you want to log the response
      toast.success('Product Added Successfully')
      setLoad(false)
    } catch (error) {
      console.error('Error:', error);
      toast.error("An Error Occurred")
      setLoad(false)

    }
  };
  const handleAddColor = (sizeIndex) => {
    const newSizes = formdata.sizes.map((size, index) => {
      if (index === sizeIndex) {
        return { ...size, colors: [...size.colors, { colorValue: '', stockNo: '' }] };
      }
      return size;
    });
    setFormdata({
      ...formdata,
      sizes: newSizes
    });
  };

  const handleRemoveColor = (sizeIndex, colorIndex) => {
    const newSizes = formdata.sizes.map((size, index) => {
      if (index === sizeIndex) {
        const newColors = [...size.colors];
        newColors.splice(colorIndex, 1);
        return { ...size, colors: newColors };
      }
      return size;
    });
    setFormdata({
      ...formdata,
      sizes: newSizes
    });
  };
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4234/api/get-tags');
        setTags(response.data.data);

      } catch (error) {
        console.error('Failed to fetch tags:', error);

      }
    };

    fetchData();
  }, []);
  const [categories, setCategories] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const handleSubChange = (e) => {
    setSelectedCat(e.target.value);
  };

  useEffect(() => {
    const fetchDataCat = async () => {
      try {
        const response = await axios.get('http://localhost:4234/api/get-all-main-category');
        console.log(response.data.data)
        setCategories(response.data.data);


        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setIsLoading(false); // Update loading state even if there's an error
      }
    };

    const handleClickCat = (item) => {
      console.log(item)
    }

    fetchDataCat();
  }, []);
  const fetchSubCat = async () => {
    try {
      setIsLoading(true); // Set loading state to true when fetching subcategories
      const response = await axios.get(`http://localhost:4234/api/get-title/${selectedCat}`);
      setSubCategories(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch subcategories:', error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (selectedCat) {
      fetchSubCat(); // Fetch subcategories when selected category changes
    }
  }, [selectedCat]);
  // useEffect(()=>{
  //   fetchSubCat()
  // },[categories])
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Create Product</h2>
      {/* <p>**For Create Banner First upload Images in Upload-Images Tab</p> */}
      {/* <Link to="/upload" className="text-blue-400 underline">Upload-images</Link> */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Information */}
        <div className='flex w-ful items-center justify-center\l gap-2'>

          <div className='w-1/2'>
            <input type="text" value={formdata.productName} onChange={handleChange} name="productName" placeholder="Product Name" className="block w-full border-[1px] p-2 mt-1 rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
          </div>

          <div className='w-1/2'>
            <select
              id="tags"
              name="tags"
              value={formdata.tags}
              onChange={handleChange}
              className="block w-full border-[1px] p-2 mt-1 rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            >
              <option value="">Select a tag</option>
              {tags.map(tag => (
                <option key={tag._id} value={tag.title}>{tag.title}</option>
              ))}
            </select>
          </div>

        </div>
        <div className="mb-4">
          {imagePreviews.length > 0 && (
            <div className="image-previews flex gap-2 items-start ">
              {imagePreviews.map((src, index) => (
                <img key={index} src={src} alt={`Preview ${index}`} className="w-24 h-24 object-cover mb-2 rounded-md" />
              ))}
            </div>
          )}
        </div>
        <div className="mb-4">
          <input type="file" name="images"
            multiple
            className="block w-full border-[1px] p-2 mt-1 rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            onChange={handleFileChange} />
        </div>
        <div className='flex gap-2'>
          <input type="text" name="percentage" value={formdata.percentage} placeholder='Percentage' onChange={handleChange} className="block w-full border-[1px] p-2 mt-1 rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
          <input type="text" name="collectionName" placeholder='Collection Name' value={formdata.collectionName} onChange={handleChange} className="block w-full border-[1px] p-2 mt-1 rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
        </div>
        <div className='flex gap-2'>
          <input type="text" name="StyleNo" value={formdata.StyleNo} placeholder='Style No' onChange={handleChange} className="block w-full border-[1px] p-2 mt-1 rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
          <input type="text" name="ProductDetail" placeholder='Product Details' value={formdata.ProductDetail} onChange={handleChange} className="block w-full border-[1px] p-2 mt-1 rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
        </div>
        <div className='flex gap-2'>
          <input type="text" name="NetQuantity" value={formdata.NetQuantity} placeholder='Net Quantity' onChange={handleChange} className="block w-full border-[1px] p-2 mt-1 rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
        </div>
        <div className='flex gap-2 justify-between'>

          <select onChange={handleSubChange} value={selectedCat} name="selectedCat" className='block w-[49%] border-[1px] p-2 mt-1 rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50' id="">
            <option value="">---select category---</option>
            {categories && categories.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>


          {/* <input type="text" name="categories" value={formdata.categories}} placeholder='Categories' className="block w-full border-[1px] p-2 mt-1 rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" /> */}
          <input type="text" value={formdata.SKU} onChange={handleChange} name="SKU" placeholder="SKU" className="block w-[49%] border-[1px] p-2 mt-1 rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
        </div>

        <select onChange={handleChange} value={formdata.categories} name="categories" className='block w-[100%] border-[1px] p-2 mt-1 rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50' id="">
          <option value="">---select Sub category---</option>
          {subCategories && subCategories.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <div className="mb-4">

          <div className="mb-4">
            <label className="capitalize block text-sm font-medium mb-1">Sizes:</label>
            {formdata.sizes.map((size, sizeIndex) => (
              <div key={sizeIndex} className="mb-4">
                <div className="flex gap-2 items-center mb-2">
                  <input
                    type="text"
                    name={`sizes[${sizeIndex}].size`}
                    value={size.size}
                    onChange={(e) =>
                      setFormdata((prevState) => ({
                        ...prevState,
                        sizes: prevState.sizes.map((s, i) =>
                          i === sizeIndex ? { ...s, size: e.target.value } : s
                        ),
                      }))
                    }
                    placeholder="Size"
                    className="block w-full border-[1px] p-2 mt-1 rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                  <input
                    type="text"
                    name={`sizes[${sizeIndex}].mainPrice`}
                    value={size.mainPrice}
                    onChange={(e) =>
                      setFormdata((prevState) => ({
                        ...prevState,
                        sizes: prevState.sizes.map((s, i) =>
                          i === sizeIndex ? { ...s, mainPrice: e.target.value } : s
                        ),
                      }))
                    }
                    placeholder="Main Price"
                    className="block w-full border-[1px] p-2 mt-1 rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                  <div className="w-1/2">

                    <input
                      type="text"
                      id={`discountPercent_${sizeIndex}`}
                      value={size.discountPercent}
                      onChange={(e) => handleDiscountChange(sizeIndex, e.target.value)}
                      name="percentage"
                      placeholder="percentage %"
                      className="w-32 block rounded-md border-gray-900 border-[1px] py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    />
                  </div>
                  <input
                    type="text"
                    name={`sizes[${sizeIndex}].discountPrice`}
                    value={size.discountPrice}
                    onChange={(e) =>
                      setFormdata((prevState) => ({
                        ...prevState,
                        sizes: prevState.sizes.map((s, i) =>
                          i === sizeIndex ? { ...s, discountPrice: e.target.value } : s
                        ),
                      }))
                    }
                    placeholder="Discount Price"
                    className="block w-full border-[1px] p-2 mt-1 rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />


                  <button
                    type="button"
                    onClick={() => handleRemoveSize(sizeIndex)}
                    className="bg-red-500 whitespace-nowrap text-white px-2 py-1 rounded"
                  >
                    Remove Size
                  </button>
                </div>

                <label className="capitalize block text-sm font-medium mb-1">Colors:</label>
                {size.colors.map((color, colorIndex) => (
                  <div key={colorIndex} className="flex gap-2 items-center mb-2">
                    <input
                      type="color"
                      name={`sizes[${sizeIndex}].colors[${colorIndex}].colorValue`}
                      value={color.colorValue}
                      onChange={(e) =>
                        setFormdata((prevState) => ({
                          ...prevState,
                          sizes: prevState.sizes.map((s, i) =>
                            i === sizeIndex
                              ? {
                                ...s,
                                colors: s.colors.map((c, j) =>
                                  j === colorIndex ? { ...c, colorValue: e.target.value } : c
                                ),
                              }
                              : s
                          ),
                        }))
                      }
                      placeholder="Color Value"
                      className="block w-16 h-16 border-[1px] p-2 mt-1 rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
                    <input
                      type="text"
                      name={`sizes[${sizeIndex}].colors[${colorIndex}].stockNo`}
                      value={color.stockNo}
                      onChange={(e) =>
                        setFormdata((prevState) => ({
                          ...prevState,
                          sizes: prevState.sizes.map((s, i) =>
                            i === sizeIndex
                              ? {
                                ...s,
                                colors: s.colors.map((c, j) =>
                                  j === colorIndex ? { ...c, stockNo: e.target.value } : c
                                ),
                              }
                              : s
                          ),
                        }))
                      }
                      placeholder="Stock No"
                      className="block w-full border-[1px] p-2 mt-1 rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveColor(sizeIndex, colorIndex)}
                      className="bg-red-500 whitespace-nowrap text-white px-2 py-1 rounded"
                    >
                      Remove Color
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddColor(sizeIndex)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mb-4"
                >
                  Add Color
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSize}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Add Size
            </button>
          </div>

        </div>
       
        <div>
          <textarea value={formdata.description} onChange={handleChange} name="description" placeholder="description" className="block w-full mt-1 rounded-md border-gray-900 border-[1px] p-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />

        </div>

        {/* <button type="button" onClick={addSize} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50">Add Size</button>
        <textarea value={formdata.Desc} onChange={handleChange} name="Desc" placeholder="Description" className="block w-full mt-1 rounded-md border-gray-900 border-[1px] p-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" /> */}

        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50">{load ? 'Please Wait' : 'submit'}</button>
      </form>
    </div>
  );
};

export default CreateProduct;
