import React, { useEffect, useState } from 'react';
import useApi from '../hooks/useApi';
import userService from '../services/userServices';
import CategorySkeleton from './CategorySkeleton';

const categories = [
    {
        description: 'Escape to serene heights and experience breathtaking views',
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80',
        gradient: 'from-blue-900/80 to-blue-900/90'
    },
    {
        description: 'Relax by crystal waters with perfect sandy beaches',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80',
        gradient: 'from-orange-900/80 to-orange-900/90'
    },
    {
        description: 'Discover city adventures and cultural experiences',
        image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80',
        gradient: 'from-gray-900/80 to-gray-900/90'
    },
    {
        description: 'Connect with nature in the most authentic way',
        image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80',
        gradient: 'from-green-900/80 to-green-900/90'
    }
];

export default function Categories() {
    const [listCategory, setListCategory] = useState([]);
    const {
        data,
        execute: getAllCategories,
        error
    } = useApi(userService.userGetAllCategory);


    useEffect(() => {
        if (error) {
            toast.error(error?.message);
        }
    }, [
        error
    ]);

    useEffect(() => {
        getAllCategories();
    }, [])

    useEffect(() => {
        if (data) {
            const combined = data?.data?.map((category, index) => ({
                ...category,
                ...(categories[index] || {}) // Merge corresponding data if exists
            }));
            setListCategory(combined)
        }

    }, [data])
    return (
        <section className="py-10 px-4 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-left mb-5">
                    <h2 className="text-3xl pb-1 md:text-4xl font-bold text-turquoise-400 
                                    bg-gradient-to-r from-turquoise-600 to-black text-transparent 
                                    bg-clip-text animate-pulse">
                        Discover Your Perfect Stay
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {
                        listCategory.length > 0 ? listCategory?.map((category) => (
                            <button
                                key={category._id}
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
                                            <img src={category?.iconUrl} alt="text" className='h-10 w-10' />
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
                        )) : [...Array(4)].map((_, index) => (
                            <CategorySkeleton key={index} />
                        ))
                    }
                </div>
            </div>
        </section>
    );
}