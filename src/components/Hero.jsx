import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import SearchBar from './SearchBar';

function Hero() {

    const handleSearch = (searchParams) => {
        // Handle search logic here
        console.log(searchParams);
    };

    return (
        <div className="relative min-h-screen">
            {/* Hero Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                }}
            >
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content */}
            <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-32 pb-16 min-h-screen flex flex-col items-center">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-md  sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        Find Your Perfect Home Away From Home
                    </h1>
                    <p className="text-xl text-gray-200">
                        Discover unique homestays that feel just like home, with local experiences and authentic hospitality
                    </p>
                </div>

                {/* Search Form */}
                <SearchBar handleSearch={handleSearch} />

            </div>
        </div>
    );
}

export default Hero;