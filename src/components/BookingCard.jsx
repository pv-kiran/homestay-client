import React from 'react';



export const BookingCard = ({ checkIn, checkOut, onCheckInChange, onCheckOutChange }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 sticky top-[88px]">
            <div className="mb-4 sm:mb-6">
                <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    $299 <span className="text-base sm:text-lg font-normal text-gray-600">/ night</span>
                </div>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                        <input
                            type="date"
                            value={checkIn}
                            onChange={(e) => onCheckInChange(e.target.value)}
                            className="w-full px-2 sm:px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                        <input
                            type="date"
                            value={checkOut}
                            onChange={(e) => onCheckOutChange(e.target.value)}
                            className="w-full px-2 sm:px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                    <select className="w-full px-2 sm:px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option>1 guest</option>
                        <option>2 guests</option>
                        <option>3 guests</option>
                        <option>4 guests</option>
                    </select>
                </div>

                <button className="w-full bg-blue-600 text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base">
                    Reserve Now
                </button>

                <div className="text-center text-xs sm:text-sm text-gray-500">
                    You won't be charged yet
                </div>
            </div>

            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t text-sm sm:text-base">
                <div className="flex justify-between mb-2">
                    <span className="text-gray-600">$299 × 5 nights</span>
                    <span>$1,495</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Cleaning fee</span>
                    <span>$85</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Service fee</span>
                    <span>$95</span>
                </div>
                <div className="flex justify-between pt-4 border-t font-semibold">
                    <span>Total</span>
                    <span>$1,675</span>
                </div>
            </div>
        </div>
    );
};