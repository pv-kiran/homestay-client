import React, { useEffect } from 'react';
import userService from '../services/userServices';
import useApi from './../hooks/useApi';
import MyBookingCard from '../components/MyBookingsCard';
import NoBookings from '../components/NoBookings';
const MyBookings = () => {
    const {
        data,
        loading,
        execute: getMyBookings,
        reset,
        error,
    } = useApi(userService.userGetHomeStayBookings);

    useEffect(() => {
        getMyBookings();
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-10">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Bookings</h1>
                {(data===null) ? (
                    <NoBookings/>
                ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {data?.map((booking) => (
                        <MyBookingCard key={booking._id} {...booking} getMyBookings={getMyBookings} getBookings={getMyBookings} />
                    ))}
                </div>
                )}
            </div>
        </div>
    );
}

export default MyBookings;
