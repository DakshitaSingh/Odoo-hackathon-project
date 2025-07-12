// frontend/src/pages/DashboardPage.jsx
import React, { useEffect, useState } from 'react';
import UserProfile from '../components/UserProfile';
import ListingItem from '../components/ListingItem';
import SwapItem from '../components/SwapItem';
import UploadItems from '../components/UploadItems';
import axios from 'axios';

const DashboardPage = () => {
    const [userProfileData, setUserProfileData] = useState(null);
    const [myListings, setMyListings] = useState([]);
    const [mySwaps, setMySwaps] = useState([]);
    const [showUploadModal, setShowUploadModal] = useState(false);

    const [loadingProfile, setLoadingProfile] = useState(true);
    const [loadingListings, setLoadingListings] = useState(true);
    const [loadingSwaps, setLoadingSwaps] = useState(true);
    const [errorProfile, setErrorProfile] = useState(null);
    const [errorListings, setErrorListings] = useState(null);
    const [errorSwaps, setErrorSwaps] = useState(null);


    const fetchUserProfile = async () => {
        setLoadingProfile(true);
        setErrorProfile(null);
        try {
            const response = await axios.get('/api/user-profile');
            const profileData = response.data.data || response.data;
            setUserProfileData(profileData);
        } catch (error) {
            console.error("Error fetching user profile:", error);
            setErrorProfile('Failed to load profile. Please refresh.');
            setUserProfileData({
                avatar: 'https://via.placeholder.com/120/cccccc?text=User',
                name: 'Guest User',
                email: 'guest@example.com',
                location: 'Unknown',
                memberSince: 'N/A',
                pointsBalance: 0,
                totalSwapsCompleted: 0,
                itemsGiven: 0,
                itemsRedeemed: 0
            });
        } finally {
            setLoadingProfile(false);
        }
    };

    const fetchMyListings = async () => {
        setLoadingListings(true);
        setErrorListings(null);
        try {
            const response = await axios.get('/api/my-listings');
            const rawListings = response.data.data || response.data;
            if (Array.isArray(rawListings)) {
                setMyListings(rawListings);
            } else {
                console.error("API did not return an array for 'My Listings'. Received:", rawListings);
                setMyListings([]);
            }
        } catch (error) {
            console.error("Error fetching my listings:", error);
            setErrorListings('Failed to load your listings.');
            setMyListings([]);
        } finally {
            setLoadingListings(false);
        }
    };

    const fetchMySwaps = async () => {
        setLoadingSwaps(true);
        setErrorSwaps(null);
        try {
            const response = await axios.get('/api/my-swaps');
            const rawSwaps = response.data.data || response.data;
            if (Array.isArray(rawSwaps)) {
                setMySwaps(rawSwaps);
            } else {
                console.error("API did not return an array for 'My Swaps'. Received:", rawSwaps);
                setMySwaps([]);
            }
        } catch (error) {
            console.error("Error fetching my swaps:", error);
            setErrorSwaps('Failed to load your swaps.');
            setMySwaps([]);
        } finally {
            setLoadingSwaps(false);
        }
    };

    const refreshDashboardData = () => {
        fetchUserProfile();
        fetchMyListings();
        fetchMySwaps();
    };

    useEffect(() => {
        refreshDashboardData();
    }, []);

    return (
        <div className="container mx-auto p-6 bg-gradient-to-br from-purple-50 to-indigo-50 min-h-screen font-sans"> {/* Updated background and font */}
            {/* Header Section */}
            <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
                <h1 className="text-4xl font-extrabold text-indigo-700">ReWear Dashboard</h1> {/* Deeper color, larger font */}
                <div className="px-4 py-2 text-sm text-gray-600 rounded-full bg-white shadow-sm">My Hub</div> {/* More rounded, white background */}
            </header>

            {/* Main Content Area */}
            <div className="flex flex-col gap-8">
                {/* Top Section: User Profile & Details */}
                <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"> {/* More rounded, prominent shadow */}
                    <div className="flex flex-col md:flex-row items-start gap-8 w-full">
                        {loadingProfile ? (
                            <div className="flex items-center justify-center h-48 w-full text-gray-500">Loading Profile...</div>
                        ) : errorProfile ? (
                            <div className="flex items-center justify-center h-48 w-full text-red-500">{errorProfile}</div>
                        ) : (
                            <>
                                <UserProfile user={userProfileData} />
                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-auto">
                                    <div className="flex flex-col gap-3">
                                        <div className="bg-purple-50 h-12 rounded-lg border border-purple-100 flex items-center px-4 text-sm font-medium text-purple-700"> {/* Themed background */}
                                            Total Swaps Completed: <span className="font-bold ml-auto text-purple-800">{userProfileData?.totalSwapsCompleted || 0}</span>
                                        </div>
                                        <div className="bg-indigo-50 h-12 rounded-lg border border-indigo-100 flex items-center px-4 text-sm font-medium text-indigo-700"> {/* Themed background */}
                                            Items Listed: <span className="font-bold ml-auto text-indigo-800">{userProfileData?.itemsGiven || 0}</span>
                                        </div>
                                        <div className="bg-green-50 h-12 rounded-lg border border-green-100 flex items-center px-4 text-sm font-medium text-green-700"> {/* Themed background */}
                                            Items Redeemed: <span className="font-bold ml-auto text-green-800">{userProfileData?.itemsRedeemed || 0}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <div className="bg-gray-50 h-12 rounded-lg border border-gray-100 flex items-center px-4 text-sm text-gray-700">Joined: <span className="font-medium ml-auto">{userProfileData?.memberSince}</span></div>
                                        <div className="bg-gray-50 h-12 rounded-lg border border-gray-100 flex items-center px-4 text-sm text-gray-700">Location: <span className="font-medium ml-auto">{userProfileData?.location}</span></div>
                                        <div className="bg-gray-50 h-12 rounded-lg border border-gray-100 flex items-center px-4 text-sm text-gray-700">Messages: <span className="font-medium ml-auto">3 New</span></div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="mt-6 bg-gradient-to-r from-purple-100 to-indigo-100 min-h-[100px] rounded-lg border border-purple-200 p-4 text-indigo-800 flex items-center justify-center text-center"> {/* Themed background */}
                        <p className="text-md italic font-semibold">"Join ReWear to give your unused clothes a second life and contribute to sustainable fashion! Every swap makes a difference."</p>
                    </div>
                </section>

                {/* My Uploaded Items Overview Section */}
                <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"> {/* Consistent card styling */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">My Uploaded Items</h2>
                        <button
                            onClick={() => setShowUploadModal(true)}
                            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            + List New Item
                        </button>
                    </div>
                    {loadingListings ? (
                        <div className="flex items-center justify-center h-32 text-indigo-500 font-semibold text-lg">Loading your listings...</div>
                    ) : errorListings ? (
                        <div className="text-red-500 text-center p-4">{errorListings}</div>
                    ) : myListings.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                            {myListings.map(item => (
                                <ListingItem
                                    key={item.id}
                                    itemData={item}
                                    isHighlighted={item.isHighlighted}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-600 p-8 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50"> {/* Consistent card styling */}
                            <p className="mb-4 text-lg font-medium">You haven't listed any items yet.</p>
                            <button
                                onClick={() => setShowUploadModal(true)}
                                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                            >
                                Start Listing Now!
                            </button>
                        </div>
                    )}
                </section>

                {/* My Swaps (Ongoing and Completed) Section */}
                <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"> {/* Consistent card styling */}
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Swaps & Redeemed Items</h2>
                    {loadingSwaps ? (
                        <div className="flex items-center justify-center h-32 text-indigo-500 font-semibold text-lg">Loading your swaps...</div>
                    ) : errorSwaps ? (
                        <div className="text-red-500 text-center p-4">{errorSwaps}</div>
                    ) : mySwaps.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                            {mySwaps.map(item => (
                                <SwapItem
                                    key={item.id}
                                    itemData={item}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-600 p-8 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50"> {/* Consistent card styling */}
                            <p className="mb-4 text-lg font-medium">No ongoing or completed swaps/redemptions yet.</p>
                            <p className="text-sm">Browse items on the main page to start swapping or redeeming with points!</p>
                        </div>
                    )}
                </section>
            </div>

            {/* Upload Modal */}
            {showUploadModal && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in">
                    <UploadItems
                        onUploadSuccess={() => {
                            refreshDashboardData();
                        }}
                        onClose={() => setShowUploadModal(false)}
                    />
                    <button
                        onClick={() => setShowUploadModal(false)}
                        className="absolute top-4 right-4 text-white text-4xl font-bold p-2 rounded-full hover:bg-gray-800 transition-colors duration-200"
                    >
                        &times;
                    </button>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;