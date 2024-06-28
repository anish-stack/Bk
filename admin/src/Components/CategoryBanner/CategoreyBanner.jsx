import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";

const CreateCategoryFormBanner = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        OneWhichCategoryRedirect: "",
        title: "",

        image: null, // Add file property to formData
    });
    const [message, setMessage] = useState("");
    const [cat, setCat] = useState([]);


    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Get the first file from the input
        setFormData((prevData) => ({
            ...prevData,
            file: file, // Update file property
        }));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    const fetchCat = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get('http://localhost:4234/api/get-category')
            console.log(response.data.data)
            const datas = response.data.data.map((item) => (item.title))

            setCat(datas)
            setIsLoading(false)

        } catch (error) {
            console.log(error)
            setIsLoading(false)

        }
    }
    useEffect(() => {
        fetchCat()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formData)
        try {
            const formDataToSend = new FormData(); // Create a new FormData object
            formDataToSend.append('title', formData.title); // Append title
            formDataToSend.append('image', formData.file); // Append file
            formDataToSend.append('OneWhichCategoryRedirect', formData.OneWhichCategoryRedirect); // Append file

            console.log(formDataToSend)
            const response = await axios.post(
                "http://localhost:4234/api/create-redirect",
                formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            );
            toast.success('Category Created')
            console.log(response.data);
            setMessage("Category created successfully!");

        } catch (error) {
            toast.error('Internal Error')
            console.error("Error creating banner:", error);
            setMessage("Error creating banner. Please try again.");
        }
    };

    return (
        <div className="max-w-2xl p-5 min-h-[7vhh] border-2 mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Create Banner Category</h1>
            {/* <Link to="/upload" className="text-blue-400 underline">Upload-images</Link> */}
            <form onSubmit={handleSubmit} className="space-y-4 mt-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category Which Redirect</label>
                    <select
                        onChange={handleChange}
                        value={formData.OneWhichCategoryRedirect}
                        id=""
                        name="OneWhichCategoryRedirect"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >

                        <option value="">---Select Category---</option>
                        {cat && cat.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                </div>




                <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                />

                <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    {isLoading ? 'Please Wait' : 'Create Category'}
                </button>
            </form>
            {message && <p className="mt-4 text-green-600">{message}</p>}
        </div>
    );
};

export default CreateCategoryFormBanner;
