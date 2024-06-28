import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AllImages = () => {
    const [fetchedImages, setFetchedImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const imagesPerPage = 10;

    const fetchImages = async () => {
        try {
            const response = await axios.get('http://localhost:4234/api/All-images');
            setFetchedImages(response.data.reverse());

        } catch (error) {
            console.error('Failed to fetch images:', error);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleDelete = async (albumId, imageId) => {
        try {
            console.log(imageId, albumId)
            // Send DELETE request to delete the image
            const res = await axios.delete(`http://localhost:4234/api/image/${imageId}`);
            // After successful deletion, update state to reflect changes
            console.log(res.data)
            toast.success('Image Deleted')
            fetchImages();
        } catch (error) {
            toast.error('Internal Error')
            console.error('Failed to delete image:', error);
        }
    };

    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    const currentImages = fetchedImages
        .slice(indexOfFirstImage, indexOfLastImage)
        .map((album) =>
            album.img.map((image) => (
                <div key={image._id} className="cursor-pointer relative">
                    <img
                        src={image.ImgUrl}
                        alt={image.Name}
                        className="rounded-lg h-32 object-cover transition-transform duration-300"
                    />
                    <button
                        onClick={() => handleDelete(album._id, image._id)}
                        className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md"
                    >
                        Delete
                    </button>
                </div>
            ))
        );

    const pageCount = Math.ceil(fetchedImages.length / imagesPerPage);

    const changePage = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {currentImages}
            </div>
            {pageCount > 1 && (
                <div className="mt-4 flex justify-center">
                    {[...Array(pageCount).keys()].map((page) => (
                        <button
                            key={page}
                            onClick={() => changePage(page + 1)}
                            className={`mx-1 px-3 py-1 rounded-md ${currentPage === page + 1 ? 'bg-gray-300' : 'bg-gray-200 hover:bg-gray-400'
                                }`}
                        >
                            {page + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllImages;
