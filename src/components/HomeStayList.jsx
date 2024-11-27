import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import HomeStayCard from './common/HomeStayCard';
import { MoveRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import useApi from '../hooks/useApi';
import userService from '../services/userServices';
import HomestayCardSkeleton from './HomestayCardSkeleton';

export default function HomestayList() {
    const {
        data,
        execute: getAllHomeStays,
    } = useApi(userService.userGetAllHomestays);

    const { currency } = useSelector((state) => state?.currency);
    const navigate = useNavigate();

    useEffect(() => {
        getAllHomeStays({ currency });
    }, [currency])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="py-8 px-4 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl pb-1 md:text-4xl font-bold text-black 
                        bg-gradient-to-r from-turquoise-600 to-black text-transparent 
                        bg-clip-text animate-pulse"
                >Featured Homestays</h2>
                <button
                    className="group inline-flex items-center gap-2 px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-turquoise-400 to-turquoise-500 rounded-full transition-all duration-300 hover:from-turquoise-500 hover:to-turquoise-600 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-turquoise-400 focus:ring-offset-2"
                    onClick={() => navigate('/homestays/all')}
                >
                    <span>View all </span>
                    <MoveRight size={24} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {
                    data ?
                        data?.data?.slice(0, 8)?.map((homestay) => (
                            <HomeStayCard key={homestay?._id} homestay={homestay} />
                        )) : [...Array(4)].map((_, index) => (
                            <HomestayCardSkeleton key={index} />
                        ))
                }
            </div>
        </div>
    );
}