import React from 'react'
import { CalendarX2, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


function NoBookings() {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 py-3 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex items-center justify-center">
                <div className="flex flex-col items-center justify-center min-h-[500px] max-w-[500px] p-12 bg-white rounded-2xl shadow-lg relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                <div className="absolute -right-8 -top-8 w-64 h-64 rounded-full border-[32px] border-black"></div>
                <div className="absolute -left-8 -bottom-8 w-64 h-64 rounded-full border-[32px] border-[#14b8a6]"></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center">
                {/* Icon Container */}
                <div className="relative mb-8">
                    <div className="absolute -left-6 -top-6 text-[#14b8a6] opacity-20">
                    <Building2 size={100} />
                    </div>
                    <div className="text-[#14b8a6]">
                    <CalendarX2 size={88} strokeWidth={1.5} />
                    </div>
                </div>
                
                {/* Text Content */}
                <h2 className="text-3xl font-bold text-black mb-4 text-center">
                    No Bookings Yet
                </h2>
                
                <p className="text-gray-600 text-center max-w-md mb-10 text-lg">
                    Your travel story is waiting to begin. Discover perfect stays from our curated collection of homestays.
                </p>
                
                {/* Button */}
                <button 
                    onClick={() => navigate('/homestays/all')}
                    className="px-8 py-4 bg-[#14b8a6] text-white rounded-xl font-semibold text-lg
                    hover:bg-[#2AC0B5] transform hover:-translate-y-0.5 transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:ring-offset-2
                    shadow-lg hover:shadow-xl"
                >
                    Explore Homestays
                </button>
                
                {/* Divider with Text */}
                <div className="mt-10 flex items-center gap-4">
                    <span className="w-16 h-[1px] bg-gray-200"></span>
                    <span className="text-gray-400 font-medium">Special Offers Available</span>
                    <span className="w-16 h-[1px] bg-gray-200"></span>
                </div>
                </div>
                </div>
            </div>
        </div>

    )
}

export default NoBookings