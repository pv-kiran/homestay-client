import React from 'react';
import { Star } from 'lucide-react';

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
                    <div key={homestay.id} className="group">
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                            <img
                                src={homestay.image}
                                alt={homestay.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                            />
                        </div>
                        <div className="mt-3">
                            <div className="flex justify-between items-start">
                                <h3 className="font-medium text-lg">{homestay.title}</h3>
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                                    <span className="text-sm">{homestay.rating}</span>
                                </div>
                            </div>
                            <p className="text-gray-600">{homestay.location}</p>
                            <p className="mt-1">
                                <span className="font-medium">${homestay.price}</span>
                                <span className="text-gray-600"> / night</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}