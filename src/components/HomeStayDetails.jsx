import React, { useEffect, useState } from 'react';
import { MapPin, Star, Bed, Bath, Clock, ScrollText, ListCollapse, Blocks } from 'lucide-react';
import { Tooltip } from './common/Tooltip';
import useApi from '../hooks/useApi';
import userService from '../services/userServices';


function DetailCard({ icon, label, value }) {
    return (
        <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-3 rounded-full">
                    {icon}
                </div>
                <div>
                    <p className="text-gray-500 text-sm">{label}</p>
                    <p className="font-semibold text-gray-900">{value}</p>
                </div>
            </div>
        </div>
    );
}

export const PropertyDetails = ({
    name,
    amenities,
    address,
    description,
    rooms = 2,
    bathrooms = 2,
    policies = [],
    checkIn = "2:00 PM",
    checkOut = "11:00 AM",
    homeStayId
}) => {

    const [starRating, setStarRating] = useState([]);

    const {
        execute: getStarRating,
    } = useApi(userService.userGetHomestayReview);

    const handleStarRating = async () => {
        const response = await getStarRating({ homeStayId })
        setStarRating(response.data);
    }

    useEffect(() => {
        handleStarRating()
    }, [])

    const averageRating = starRating?.reduce((acc, curr) => acc + curr?.rating, 0) / starRating?.length;

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            {/* Header Section */}
            <div className="border-b pb-4">
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{name}</h1>
                    <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <span className="font-semibold">{averageRating ? averageRating : 1}</span>
                    </div>
                </div>
                <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-1" />
                    <span>{address?.district}, {address?.state}</span>
                </div>
            </div>

            {/* Room Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-6 border-b border-gray-200">
                <DetailCard
                    icon={<Bed className="w-6 h-6" />}
                    label="Bedrooms"
                    value={`${rooms} ${rooms === 1 ? 'Room' : 'Rooms'}`}
                />
                <DetailCard
                    icon={<Bath className="w-6 h-6" />}
                    label="Bathrooms"
                    value={`${bathrooms} ${bathrooms === 1 ? 'Bath' : 'Baths'}`}
                />
                <DetailCard
                    icon={<Clock className="w-6 h-6" />}
                    label="Check-in"
                    value={`${checkIn} PM`}
                />
                <DetailCard
                    icon={<Clock className="w-6 h-6" />}
                    label="Check-out"
                    value={`${checkOut} AM`}
                />
            </div>

            {/* Amenities */}
            <div className="py-4 border-b">
                <div className="flex items-center gap-2 mb-4">
                    <Blocks className="w-5 h-5 text-gray-600" />
                    <h2 className="text-xl font-semibold">Amenities</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {amenities.map((amenity) => (
                        <Tooltip key={amenity?._id} content={amenity?.description}>
                            <div className="flex items-center gap-2">
                                <img
                                    src={amenity?.iconUrl}
                                    alt={amenity?.amenityName}
                                    className="w-5 h-5"
                                />
                                <span className="text-gray-600">{amenity?.amenityName}</span>
                            </div>
                        </Tooltip>
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
                    <h2 className="text-xl font-semibold">Guest Policies</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                    {policies.map((policy, index) => (
                        <div
                            key={index}
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-md border border-gray-300"
                        >
                            {policy}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};