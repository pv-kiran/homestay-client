import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';

export default function SearchBar({ handleSearch }) {
    const [location, setLocation] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);
    const [activeInput, setActiveInput] = useState(null);

    const searchHomeStays = (e) => {
        e.preventDefault();
        // Handle search logic here
        handleSearch({
            location,
            checkIn,
            checkOut,
            guests
        })
    };

    return (
        <div className="w-full max-w-5xl mx-auto px-4 md:px-6 mt-4 ">
            <form onSubmit={searchHomeStays}>
                {/* Desktop and Tablet View */}
                <div className="hidden lg:block">
                    <div className="bg-white rounded-full shadow-lg divide-x divide-gray-200 flex items-center overflow-hidden transition-all duration-300 px-1">
                        {/* Location */}
                        <div className={`group flex-1 p-3 hover:bg-gray-200 hover:rounded-full transition-colors duration-200 cursor-pointer ${activeInput === 'location' ? 'bg-gray-200 rounded-full' : ''}`}>
                            <div className="px-2">
                                <div className="text-xs font-semibold text-gray-800">Location</div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Where to?"
                                        className="w-full bg-transparent border-none outline-none text-gray-600 placeholder-gray-400 text-sm focus:outline-none focus:ring-0 focus:border-none"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        onFocus={() => setActiveInput('location')}
                                        onBlur={() => setActiveInput(null)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Check-in */}
                        <div className={`group flex-1 p-3 hover:bg-gray-200 hover:rounded-full transition-colors duration-200 cursor-pointer ${activeInput === 'checkIn' ? 'bg-gray-200 rounded-full' : ''}`}>
                            <div className="px-2">
                                <div className="text-xs font-semibold text-gray-800">Check in</div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-gray-400" />
                                    <input
                                        type="date"
                                        className="w-full bg-transparent border-none outline-none text-gray-600 text-sm
                                        focus:outline-none focus:ring-0 focus:border-none"
                                        value={checkIn}
                                        onChange={(e) => setCheckIn(e.target.value)}
                                        onFocus={() => setActiveInput('checkIn')}
                                        onBlur={() => setActiveInput(null)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Check-out */}
                        <div className={`group flex-1 p-3 hover:bg-gray-200 hover:rounded-full transition-colors duration-200 cursor-pointer ${activeInput === 'checkOut' ? 'bg-gray-200 rounded-full' : ''}`}>
                            <div className="px-2">
                                <div className="text-xs font-semibold text-gray-800">Check out</div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-gray-400" />
                                    <input
                                        type="date"
                                        className="w-full bg-transparent border-none outline-none text-gray-600 text-sm
                                        focus:outline-none focus:ring-0 focus:border-none"
                                        value={checkOut}
                                        onChange={(e) => setCheckOut(e.target.value)}
                                        onFocus={() => setActiveInput('checkOut')}
                                        onBlur={() => setActiveInput(null)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Guests */}
                        <div className={`group flex-1 p-3 hover:bg-gray-200 hover:rounded-full transition-colors duration-200 cursor-pointer ${activeInput === 'guests' ? 'bg-gray-200 rounded-full' : ''}`}>
                            <div className="px-2">
                                <div className="text-xs font-semibold text-gray-800">Guests</div>
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4 text-gray-400" />
                                    <input
                                        type="number"
                                        min="1"
                                        max="16"
                                        className="w-20 bg-transparent border-none outline-none text-gray-600 text-sm
                                        focus:outline-none focus:ring-0 focus:border-none"
                                        value={guests}
                                        onChange={(e) => setGuests(parseInt(e.target.value))}
                                        onFocus={() => setActiveInput('guests')}
                                        onBlur={() => setActiveInput(null)}
                                    />
                                    <span className="text-sm text-gray-500">guests</span>
                                </div>
                            </div>
                        </div>

                        {/* Search Button */}
                        <div className="p-3">
                            <button
                                type="submit"
                                className=" bg-turquoise-500 hover:bg-turquoise-700 w-16 h-16 text-white px-6 py-3 rounded-[1000px] flex items-center gap-2 transition-colors duration-200 "
                            >
                                <Search className="h-4 w-4" />
                                {/* <span className="font-medium">Search</span> */}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile View */}
                <div className="lg:hidden space-y-4">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        {/* Location */}
                        <div className={`p-4 border-b border-gray-200 ${activeInput === 'location' ? 'bg-gray-200 rounded-full' : ''}`}>
                            <div className="text-xs font-semibold text-gray-800 mb-1">Location</div>
                            <div className="flex items-center gap-3">
                                <MapPin className="h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Where to?"
                                    className="w-full bg-transparent border-none outline-none text-gray-600 placeholder-gray-400
                                    focus:outline-none focus:ring-0 focus:border-none"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    onFocus={() => setActiveInput('location')}
                                    onBlur={() => setActiveInput(null)}
                                />
                            </div>
                        </div>

                        {/* Check-in */}
                        <div className={`p-4 border-b border-gray-200 ${activeInput === 'checkIn' ? 'bg-gray-200 rounded-full' : ''}`}>
                            <div className="text-xs font-semibold text-gray-800 mb-1">Check in</div>
                            <div className="flex items-center gap-3">
                                <Calendar className="h-5 w-5 text-gray-400" />
                                <input
                                    type="date"
                                    className="w-full bg-transparent border-none outline-none text-gray-600
                                    focus:outline-none focus:ring-0 focus:border-none"
                                    value={checkIn}
                                    onChange={(e) => setCheckIn(e.target.value)}
                                    onFocus={() => setActiveInput('checkIn')}
                                    onBlur={() => setActiveInput(null)}
                                />
                            </div>
                        </div>

                        {/* Check-out */}
                        <div className={`p-4 border-b border-gray-200 ${activeInput === 'checkOut' ? 'bg-gray-200 rounded-full' : ''}`}>
                            <div className="text-xs font-semibold text-gray-800 mb-1">Check out</div>
                            <div className="flex items-center gap-3">
                                <Calendar className="h-5 w-5 text-gray-400" />
                                <input
                                    type="date"
                                    className="w-full bg-transparent border-none outline-none text-gray-600
                                    focus:outline-none focus:ring-0 focus:border-none"
                                    value={checkOut}
                                    onChange={(e) => setCheckOut(e.target.value)}
                                    onFocus={() => setActiveInput('checkOut')}
                                    onBlur={() => setActiveInput(null)}
                                />
                            </div>
                        </div>

                        {/* Guests */}
                        <div className={`p-4 ${activeInput === 'guests' ? 'bg-gray-200 rounded-full' : ''}`}>
                            <div className="text-xs font-semibold text-gray-800 mb-1">Guests</div>
                            <div className="flex items-center gap-3">
                                <Users className="h-5 w-5 text-gray-400" />
                                <input
                                    type="number"
                                    min="1"
                                    max="16"
                                    className="w-20 bg-transparent border-none outline-none text-gray-600
                                    focus:outline-none focus:ring-0 focus:border-none"
                                    value={guests}
                                    onChange={(e) => setGuests(parseInt(e.target.value))}
                                    onFocus={() => setActiveInput('guests')}
                                    onBlur={() => setActiveInput(null)}
                                />
                                <span className="text-sm text-gray-500">guests</span>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Search Button */}
                    <button
                        type="submit"
                        className="w-full bg-turquoise-500 hover:bg-turquoise-700 text-white p-4 rounded-xl flex items-center justify-center gap-2 transition-colors duration-200"
                    >
                        <Search className="h-5 w-5" />
                        <span className="font-medium">Search Homestays</span>
                    </button>
                </div>
            </form>
        </div>
    );
}