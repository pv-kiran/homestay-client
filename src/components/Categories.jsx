import React from 'react';
import { Mountain, Palmtree, Building, Tent } from 'lucide-react';

const categories = [
    {
        name: 'Mountain Retreats',
        icon: Mountain,
        description: 'Escape to serene heights and experience breathtaking views',
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80',
        gradient: 'from-blue-900/80 to-blue-900/90'
    },
    {
        name: 'Beach Paradise',
        icon: Palmtree,
        description: 'Relax by crystal waters with perfect sandy beaches',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80',
        gradient: 'from-orange-900/80 to-orange-900/90'
    },
    {
        name: 'Urban Explorer',
        icon: Building,
        description: 'Discover city adventures and cultural experiences',
        image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80',
        gradient: 'from-gray-900/80 to-gray-900/90'
    },
    {
        name: 'Camping Adventure',
        icon: Tent,
        description: 'Connect with nature in the most authentic way',
        image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80',
        gradient: 'from-green-900/80 to-green-900/90'
    },
    // {
    //     name: 'Forest Hideaway',
    //     icon: Trees,
    //     description: 'Find peace in the woods surrounded by nature',
    //     image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80',
    //     gradient: 'from-emerald-900/80 to-emerald-900/90'
    // },
    // {
    //     name: 'Coastal Living',
    //     icon: Waves,
    //     description: 'Experience oceanfront views and sea breezes',
    //     image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80',
    //     gradient: 'from-cyan-900/80 to-cyan-900/90'
    // },
];

export default function Categories() {
    return (
        <section className="py-10 px-4 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold text-left text-gray-900">
                        Discover Your Perfect Stay
                    </h2>
                    {/* <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Explore our curated collection of unique accommodations for every type of adventure
                    </p> */}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <button
                            key={category.name}
                            className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-b ${category.gradient} mix-blend-multiply`} />
                            </div>

                            <div className="relative p-8 h-full flex flex-col items-center text-center min-h-[320px]">
                                {/* Icon Container */}
                                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                    <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm border border-white/30">
                                        <category.icon className="w-10 h-10 text-white" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-white tracking-wide group-hover:scale-105 transition-transform duration-300">
                                        {category.name}
                                    </h3>

                                    <p className="text-white/90 text-sm leading-relaxed">
                                        {category.description}
                                    </p>
                                </div>

                                {/* Explore Button */}
                                <div className="mt-auto pt-6">
                                    <span className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-white/20 rounded-full backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-300 group-hover:scale-105">
                                        Explore →
                                    </span>
                                </div>
                            </div>

                            {/* Overlay Gradient for Text Readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-60" />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}