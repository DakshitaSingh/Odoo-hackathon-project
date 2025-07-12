// frontend/src/components/UserProfile.jsx
import React from 'react';

const UserProfile = ({ user }) => {
    const defaultUser = {
        avatar: 'https://via.placeholder.com/120/a0a0a0/ffffff?text=User',
        name: 'Guest User',
        email: 'guest@example.com',
        location: 'Not Set',
        memberSince: 'N/A',
        pointsBalance: 0,
        totalSwapsCompleted: 0,
        itemsGiven: 0,
        itemsRedeemed: 0
    };

    const currentUser = user || defaultUser;

    return (
        <div className="flex items-center gap-5 p-4 bg-purple-50 rounded-lg shadow-inner border border-purple-200 flex-shrink-0"> {/* Themed background and border */}
            {/* User Avatar */}
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-indigo-400 shadow-md flex-shrink-0"> {/* Thicker, thematic border */}
                <img
                    src={currentUser.avatar}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                />
            </div>
            {/* User Info */}
            <div className="flex flex-col text-gray-800">
                <h3 className="text-3xl font-extrabold mb-1 text-indigo-800">{currentUser.name}</h3> {/* Thematic heading */}
                <p className="text-md text-gray-700">Email: <span className="font-semibold">{currentUser.email}</span></p>
                <p className="text-md text-gray-700">Location: <span className="font-semibold">{currentUser.location}</span></p>
                <p className="text-md text-gray-700">Member Since: <span className="font-semibold">{currentUser.memberSince}</span></p>
                <p className="text-xl text-purple-700 font-bold mt-3">Points Balance: <span className="text-2xl font-extrabold text-indigo-700">{currentUser.pointsBalance}</span></p> {/* Prominent points */}
            </div>
        </div>
    );
};

export default UserProfile;