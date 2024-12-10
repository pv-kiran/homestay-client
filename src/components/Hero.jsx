import React from 'react';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

function Hero() {

    const navigate = useNavigate();

    const handleSearch = ({ location, checkIn, checkOut, guests }) => {
        const queryParams = new URLSearchParams();

        // Add query parameters only if they exist
        if (location?.city) queryParams.append('city', location.city);
        if (checkIn) queryParams.append('checkIn', dayjs(checkIn).format('YYYY-MM-DD'));
        if (checkOut) queryParams.append('checkOut', dayjs(checkOut).format('YYYY-MM-DD'));
        if (guests) queryParams.append('guests', guests);

        // Navigate to the constructed URL
        const queryString = queryParams.toString(); // Generates the query string
        navigate(`/homestays/all${queryString ? `?${queryString}` : ''}`);
    };

    return (
        <div className="relative min-h-screen">
            {/* Hero Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: 'url("https://res.cloudinary.com/djd2rpgil/image/upload/v1732096382/homestay-landing_bg/behju08tspxntnqrdvpt.jpg")',
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