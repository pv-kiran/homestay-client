import React from 'react';
import { MapPin, Star, Bed, Bath, Clock, ScrollText, ListCollapse, Blocks } from 'lucide-react';

export const PropertyDetails = ({
    name,
    amenities,
    address,
    description,
    rooms = 2,
    bathrooms = 2,
    policies = [],
    checkIn = "2:00 PM",
    checkOut = "11:00 AM"
}) => {
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            {/* Header Section */}
            <div className="border-b pb-4">
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{name}</h1>
                    <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <span className="font-semibold">3.9</span>
                    </div>
                </div>
                <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-1" />
                    <span>{address?.street}, {address?.district}, {address?.state}</span>
                </div>
            </div>

            {/* Room Info */}
            <div className="flex flex-wrap gap-8 py-4 border-b">
                <div className="flex items-center gap-2">
                    <Bed className="w-5 h-5 text-gray-600" />
                    <span>{rooms} Bedrooms</span>
                </div>
                <div className="flex items-center gap-2">
                    <Bath className="w-5 h-5 text-gray-600" />
                    <span>{bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <span>Check-in: {checkIn}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <span>Check-out: {checkOut}</span>
                </div>
            </div>

            {/* Amenities */}
            <div className="py-4 border-b">
                <div className="flex items-center gap-2 mb-4">
                    <Blocks className="w-5 h-5 text-gray-600" />
                    <h2 className="text-xl font-semibold">Amenities</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {amenities.map((amenity) => (
                        <div key={amenity?._id} className="flex items-center gap-2">
                            <img
                                src={amenity?.iconUrl}
                                alt={amenity?.amenityName}
                                className="w-5 h-5"
                            />
                            <span className="text-gray-600">{amenity?.amenityName}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Description */}
            <div className="py-4 border-b">
                <div className="flex items-center gap-2 mb-4">
                    <ListCollapse className="w-5 h-5 text-gray-600" />
                    <h2 className="text-xl font-semibold">About this place</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>

            {/* Policies */}
            <div className="py-4">
                <div className="flex items-center gap-2 mb-4">
                    <ScrollText className="w-5 h-5 text-gray-600" />
                    <h2 className="text-xl font-semibold">Hotel Policies</h2>
                </div>
                <ul className="space-y-2">
                    {policies.map((policy, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-600">
                            <span className="w-1 h-1 bg-gray-400 rounded-full" />
                            {policy}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};