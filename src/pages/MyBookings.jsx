import React, { useEffect, useState } from 'react';
import userService from '../services/userServices';
import useApi from './../hooks/useApi';
import MyBookingCard from '../components/MyBookingsCard';
import NoBookings from '../components/NoBookings';
import { Loader } from '../components/common/Loader';
import { useSelector } from 'react-redux';

const MyBookings = () => {

    const [isShowLoading, setIsShowLoading] = useState(true);
    const { currency } = useSelector((store) => store?.currency);

    const {
        data,
        loading,
        execute: getMyBookings,
        reset,
        error,
    } = useApi(userService.userGetHomeStayBookings);

    useEffect(() => {
        getMyBookings(currency?.code);
    }, [currency])

    const handleLoading = () => {
        setIsShowLoading(false)
    }

    const getUpdatedBookings = () => {
        getMyBookings(currency?.code);
    }


    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-10">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Bookings</h1>

                {
                    (loading && isShowLoading) && <div className='mt-2 h-[55vh] flex items-center justify-center'>
                        <Loader />
                    </div>
                }

                {
                    data?.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {data?.map((booking) => (
                            <MyBookingCard
                                key={booking._id}
                                {...booking}
                                getMyBookings={getUpdatedBookings}
                                setLoading={handleLoading}
                            />
                        ))}
                    </div> :
                        <div>
                            {
                                !loading && <NoBookings />
                            }
                        </div>

                }
            </div>
        </div>
    );
}

export default MyBookings;
