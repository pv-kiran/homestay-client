import React from 'react';
import HomeStayCard from './common/HomeStayCard';

const homestays = [
    {
        id: 1,
        title: "Mountain View Cottage",
        location: "Swiss Alps",
        rating: 4.9,
        price: 150,
        image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070",
    },
    {
        id: 2,
        title: "Beachfront Villa",
        location: "Bali, Indonesia",
        rating: 4.8,
        price: 200,
        image: "https://images.unsplash.com/photo-1470165301023-58dab8118cc9?q=80&w=2070",
    },
    {
        id: 3,
        title: "Forest Treehouse",
        location: "Costa Rica",
        rating: 4.7,
        price: 180,
        image: "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?q=80&w=2070",
    },
    {
        id: 4,
        title: "Urban Loft",
        location: "Tokyo, Japan",
        rating: 4.9,
        price: 220,
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2070",
    },
];

export default function HomestayList() {
    return (
        <div className="py-12 px-4 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Featured Homestays</h2>
                <button className="text-indigo-600 hover:text-indigo-700 font-medium">
                    View all →
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {homestays.map((homestay) => (
                    <HomeStayCard key={homestay?.id} homestay={homestay} />
                ))}
            </div>
        </div>
    );
}