// frontend/src/components/UploadItems.jsx
import React, { useState } from 'react';
import axios from 'axios';
import {BASE_URL} from "../config"
import { toast } from 'react-toastify';


const UploadItems = ({ onUploadSuccess, onClose }) => {
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemCategory, setItemCategory] = useState('');
    const [itemType, setItemType] = useState('');
    const [itemSize, setItemSize] = useState('');
    const [itemCondition, setItemCondition] = useState('');
    const [itemTags, setItemTags] = useState('');
    const [itemPoints, setItemPoints] = useState('');
    const [itemImage, setItemImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setItemImage(file);
            setPreviewImage(URL.createObjectURL(file));
            setError(null);
        } else {
            setItemImage(null);
            setPreviewImage(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        if (!itemName || !itemImage || !itemCategory || !itemType || !itemSize || !itemCondition || !itemPoints) {
            setError('Please fill in all required fields (Name, Category, Type, Size, Condition, Points, and select an Image).');
            setLoading(false);
            return;
        }
        if (isNaN(parseInt(itemPoints)) || parseInt(itemPoints) <= 0) {
            setError('Points must be a positive number.');
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('name', itemName);
        formData.append('description', itemDescription);
        formData.append('category', itemCategory);
        formData.append('type', itemType);
        formData.append('size', itemSize);
        formData.append('condition', itemCondition);
        formData.append('tags', itemTags);
        formData.append('points', itemPoints);
        formData.append('itemImage', itemImage);

        try {
            const response = await axios.post(`${BASE_URL}/api/upload-item`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`

                },
            });
            console.log('Item uploaded:', response.data);
            toast.success('Item listed successfully! ✅');

            setSuccessMessage('Item listed successfully! Your points balance has been updated.'); // More descriptive message
            if (onUploadSuccess) {
                onUploadSuccess();
            }
            // Clear form
            setItemName('');
            setItemDescription('');
            setItemCategory('');
            setItemType('');
            setItemSize('');
            setItemCondition('');
            setItemTags('');
            setItemPoints('');
            setItemImage(null);
            setPreviewImage(null);

            setTimeout(() => {
                if (onClose) onClose();
            }, 1800); // Slightly longer delay for message to be read
        } catch (err) {
            console.error('Error uploading item:', err.response ? err.response.data : err.message);
            toast.error(err.response?.data?.message || 'Failed to list item. Please try again. ❌');

            setError(err.response?.data?.message || 'Failed to list item. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const categories = ['Tops', 'Bottoms', 'Outerwear', 'Dresses', 'Accessories', 'Footwear', 'Traditional', 'Sportswear', 'Other'];
    const types = ['T-Shirt', 'Shirt', 'Jeans', 'Pants', 'Jacket', 'Coat', 'Sweater', 'Dress', 'Skirt', 'Shoes', 'Hat', 'Scarf', 'Bag', 'Jewelry', 'Kurta', 'Saree', 'Lehenga', 'Tracksuit', 'Shorts', 'Socks', 'Gloves'];
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size', 'Kids 2T', 'Kids 4T', 'Kids 6T'];
    const conditions = ['New with Tags', 'New without Tags', 'Excellent Used', 'Good Used', 'Fair Used', 'Poor (for Upcycling)'];

    return (
        <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-100 w-full max-w-lg mx-auto relative overflow-y-auto max-h-[90vh] animate-scale-in"> {/* Larger padding, more prominent shadow, scale-in animation */}
            <h3 className="text-3xl font-extrabold mb-6 text-indigo-700 text-center">List Your Item for ReWear</h3> {/* Larger, thematic title */}
            <form onSubmit={handleSubmit} className="space-y-5"> {/* Increased spacing */}
                <div>
                    <label htmlFor="itemName" className="block text-sm font-semibold text-gray-700 mb-1">Item Name</label>
                    <input
                        type="text"
                        id="itemName"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="e.g., Blue Denim Jacket"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="itemDescription" className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                    <textarea
                        id="itemDescription"
                        value={itemDescription}
                        onChange={(e) => setItemDescription(e.target.value)}
                        rows="3"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Provide a detailed description of the item, including any flaws or unique features."
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="itemCategory" className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                    <select
                        id="itemCategory"
                        value={itemCategory}
                        onChange={(e) => setItemCategory(e.target.value)}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="itemType" className="block text-sm font-semibold text-gray-700 mb-1">Type</label>
                    <select
                        id="itemType"
                        value={itemType}
                        onChange={(e) => setItemType(e.target.value)}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
                        required
                    >
                        <option value="">Select Type</option>
                        {types.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="itemSize" className="block text-sm font-semibold text-gray-700 mb-1">Size</label>
                    <select
                        id="itemSize"
                        value={itemSize}
                        onChange={(e) => setItemSize(e.target.value)}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
                        required
                    >
                        <option value="">Select Size</option>
                        {sizes.map(size => <option key={size} value={size}>{size}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="itemCondition" className="block text-sm font-semibold text-gray-700 mb-1">Condition</label>
                    <select
                        id="itemCondition"
                        value={itemCondition}
                        onChange={(e) => setItemCondition(e.target.value)}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
                        required
                    >
                        <option value="">Select Condition</option>
                        {conditions.map(cond => <option key={cond} value={cond}>{cond}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="itemPoints" className="block text-sm font-semibold text-gray-700 mb-1">Points Value (how many points is this item worth?)</label>
                    <input
                        type="number"
                        id="itemPoints"
                        value={itemPoints}
                        onChange={(e) => setItemPoints(e.target.value)}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="e.g., 100"
                        min="1"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="itemTags" className="block text-sm font-semibold text-gray-700 mb-1">Tags (comma-separated)</label>
                    <input
                        type="text"
                        id="itemTags"
                        value={itemTags}
                        onChange={(e) => setItemTags(e.target.value)}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="e.g., casual, summer, floral"
                    />
                </div>

                <div>
                    <label htmlFor="itemImage" className="block text-sm font-semibold text-gray-700 mb-1">Item Image</label>
                    <input
                        type="file"
                        id="itemImage"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="mt-1 block w-full text-sm text-gray-500
                                   file:mr-4 file:py-2 file:px-4
                                   file:rounded-md file:border-0
                                   file:text-sm file:font-semibold
                                   file:bg-indigo-100 file:text-indigo-700
                                   hover:file:bg-indigo-200" // Themed file input
                        required
                    />
                    {previewImage && (
                        <div className="mt-4 flex justify-center">
                            <img src={previewImage} alt="Image Preview" className="w-40 h-40 object-cover rounded-lg border-2 border-indigo-200 shadow-md" /> {/* Larger preview, thematic border */}
                        </div>
                    )}
                </div>

                {error && <p className="text-red-600 text-sm mt-3 font-medium text-center">{error}</p>} {/* More prominent error */}
                {successMessage && <p className="text-green-700 text-sm mt-3 font-medium text-center">{successMessage}</p>} {/* More prominent success */}

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-full hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all duration-200" // Themed submit button
                    disabled={loading}
                >
                    {loading ? 'Listing Item...' : 'List Item for ReWear'}
                </button>
            </form>
        </div>
    );
};

export default UploadItems;