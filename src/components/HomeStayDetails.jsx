import React from 'react';
import { MapPin, Star } from 'lucide-react';



export const PropertyDetails = ({ amenities }) => {
    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Luxury Mountain View Villa</h1>
                    <div className="flex items-center space-x-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <span className="text-lg font-semibold">4.9</span>
                    </div>
                </div>
                <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base">123 Mountain View Road, Swiss Alps</span>
                </div>
            </div>

            <div className="border-t border-b py-4 sm:py-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        {amenity.icon}
                        <span className="text-sm sm:text-base text-gray-600">{amenity.name}</span>
                    </div>
                ))}
            </div>

            <div className="space-y-3 sm:space-y-4">
                <h2 className="text-xl sm:text-2xl font-semibold">About this place</h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Experience luxury living in this stunning mountain view villa. Nestled in the heart of the Swiss Alps,
                    this modern homestay offers breathtaking panoramic views and world-class amenities. Perfect for families
                    or groups looking for a peaceful retreat with easy access to skiing, hiking, and local attractions.
                </p>
            </div>
        </div>
    );
};