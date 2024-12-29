import React, { useEffect, useState } from 'react';
import { ImageGallery } from '../components/ImageGallery';
import { PropertyDetails } from '../components/HomeStayDetails';
import { BookingCard } from '../components/BookingCard';
import { useParams } from 'react-router-dom';
import useApi from '../hooks/useApi';
import userService from '../services/userServices';
import { useSelector } from 'react-redux';
import MapView from '../components/MapView';
import { calculateDifferenceInDays } from '../utils/dateDifference';
import ReviewsSection from '../components/displayReview/ReviewsSection';


function HomeStayPage() {

    const { currency } = useSelector((store) => store?.currency);
    const { authState } = useSelector((store) => store?.userAuth);
    const { id } = useParams();



    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);
    const [guests, setGuests] = useState(1);


    const {
        data: homeStay,
        loading: homeStayLoading,
        execute: getHomeStayById,
        reset,
        error: getHomeStayError,
    } = useApi(userService.userGetHomeStayById);

    const {
        data: bookingStatus,
        loading: bookingStatusLoading,
        execute: getbookingStatus,
        reset: bookingStatusReset,
        error: getbookingStatusError,
    } = useApi(userService.userGetHomeStayBookingStatus);


    // const nextImage = () => {
    //     setCurrentImageIndex((prev) => (prev + 1) % homeStay?.data?.images?.length);
    // };

    // const prevImage = () => {
    //     setCurrentImageIndex((prev) => (prev - 1 + homeStay?.data?.images?.length) % homeStay?.data?.images?.length);
    // };

    const nextImage = () => {
        if (homeStay?.data?.images?.length > 2) {
            setCurrentImageIndex((prev) => (prev + 1) % homeStay.data.images.length);
        }
    };

    const prevImage = () => {
        if (homeStay?.data?.images?.length > 2) {
            setCurrentImageIndex((prev) => (prev - 1 + homeStay.data.images.length) % homeStay.data.images.length);
        }
    };


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        getHomeStayById({ id, currency: JSON.parse(localStorage.getItem('currency')).code });
    }, [id, currency])

    useEffect(() => {
        if (authState) {
            getbookingStatus({ homeStayId: id })
        }
    }, [])



    return (
        <>
            {
                homeStay?.data ? <div className="min-h-screen mt-[65px] bg-gray-50">
                    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
                        <ImageGallery
                            images={homeStay?.data?.images}
                            currentIndex={currentImageIndex}
                            onNext={nextImage}
                            onPrev={prevImage}
                        />

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                            <div className="lg:col-span-2">
                                <PropertyDetails
                                    name={homeStay?.data?.title}
                                    address={homeStay?.data?.address}
                                    amenities={homeStay?.data?.amenities}
                                    description={homeStay?.data?.description}
                                    policies={
                                        homeStay?.data?.hotelPolicies?.guestPolicies
                                    }
                                    checkIn={homeStay?.data?.hotelPolicies?.checkInTime}
                                    checkOut={homeStay?.data?.hotelPolicies?.checkOutTime}
                                    homeStayId={id}
                                />
                            </div>

                            <div>
                                <BookingCard
                                    checkIn={checkIn}
                                    checkOut={checkOut}
                                    onCheckInChange={setCheckIn}
                                    onCheckOutChange={setCheckOut}
                                    price={homeStay?.data?.pricePerNight}
                                    guests={guests}
                                    setGuests={setGuests}
                                />
                            </div>
                        </div>
                        <ReviewsSection homeStayId= {id}/>
                        {
                            (bookingStatus?.status && calculateDifferenceInDays(bookingStatus?.checkIn) <= 2) ? <div>
                                <MapView
                                    position={
                                        [
                                            homeStay?.data?.address?.coordinates?.latitude,
                                            homeStay?.data?.address?.coordinates?.longitude
                                        ]}
                                    title={homeStay?.data?.title}
                                    address={homeStay?.data?.address}
                                />
                            </div> : <div>
                                {
                                    (homeStay?.data?.address?.coordinates?.nearByLatitude && homeStay?.data?.address?.coordinates?.nearByLongitude) && <MapView
                                        position={
                                            [
                                                homeStay?.data?.address?.coordinates?.nearByLatitude,
                                                homeStay?.data?.address?.coordinates?.nearByLongitude
                                            ]
                                        }
                                        title={homeStay?.data?.title}
                                        address={homeStay?.data?.address}
                                    />
                                }
                            </div>
                        }


                    </main>
                </div> : null
            }
        </>
    );
}

export default HomeStayPage;