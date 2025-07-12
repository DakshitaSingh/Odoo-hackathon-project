// frontend/src/components/ListingItem.jsx
import React from 'react';
import { FaTag, FaMapMarkerAlt, FaExchangeAlt, FaRegClock } from 'react-icons/fa';

const ListingItem = ({ itemData }) => {
    if (!itemData) {
        return <div className="text-gray-500">No item data available.</div>;
    }

    const defaultImage = 'https://via.placeholder.com/150/f0f0f0?text=No+Image';

    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col items-center p-4"> {/* Card styling */}
            <div className="relative w-full flex justify-center items-center h-32 mb-3">
                {itemData.imageUrl ? (
                    <img
                        src={itemData.imageUrl}
                        alt={itemData.name}
                        className="w-28 h-28 object-cover rounded-lg mb-3 border-2 border-gray-200 shadow-sm"
                    />
                ) : (
                    <img
                        src={defaultImage}
                        alt="No Image"
                        className="w-28 h-28 object-cover rounded-lg mb-3 border-2 border-gray-200 shadow-sm"
                    />
                )}
            </div>
            <p className="font-bold text-center text-base sm:text-lg text-gray-800 mb-1 leading-tight">
                {itemData.name}
            </p>
            <p className="text-sm text-gray-500 text-center mb-3 line-clamp-2">
                {itemData.description}
            </p>

            <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-600 mb-4 w-full">
                {itemData.category && (
                    <span className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                        <FaTag className="mr-1" /> {itemData.category}
                    </span>
                )}
                {itemData.location && (
                    <span className="flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                        <FaMapMarkerAlt className="mr-1" /> {itemData.location}
                    </span>
                )}
                {itemData.swapPreference && (
                    <span className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full">
                        <FaExchangeAlt className="mr-1" /> {itemData.swapPreference}
                    </span>
                )}
                {itemData.postedDate && (
                    <span className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                        <FaRegClock className="mr-1" /> {itemData.postedDate}
                    </span>
                )}
            </div>

            <button className="mt-auto w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200 shadow-md">
                View Details
            </button>
        </div>
    );
};

export default ListingItem;