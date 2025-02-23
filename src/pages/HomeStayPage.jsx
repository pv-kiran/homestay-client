import React, { useEffect, useState } from 'react';
import { ImageGallery } from '../components/ImageGallery';
import { PropertyDetails } from '../components/HomeStayDetails';
import { BookingCard } from '../components/BookingCard';
import { useParams } from 'react-router-dom';
import useApi from '../hooks/useApi';
import userService from '../services/userServices';
import { useDispatch, useSelector } from 'react-redux';
import MapView from '../components/MapView';
import { calculateDifferenceInDays } from '../utils/dateDifference';
import ReviewsSection from '../components/displayReview/ReviewsSection';
import { Loader } from '../components/common/Loader';
import AddonsSection from '../components/addons/AddonsSection';
import { setAddOns } from '../app/features/admin/addonSlice';


function HomeStayPage() {

    const { currency } = useSelector((store) => store?.currency);
    const { authState } = useSelector((store) => store?.userAuth);
    const { id } = useParams();
    const dispatch = useDispatch();



    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);
    const [guests, setGuests] = useState(1);

    const [isModalOpen, setIsModalOpen] = useState(false)


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

    useEffect(() => {
        if (homeStay?.data) {
            const { restaurants, otherservice, rides, roomservice, homelyfoods, entertainments } = homeStay?.data;
            dispatch(setAddOns({
                restaurants,
                otherservice,
                rides,
                roomservice,
                homelyfoods,
                entertainments
            }));
        }
    }, [homeStay]);

    return (
        <>
            {
                homeStayLoading && <div className='mt-[65px] h-[80vh] flex items-center justify-center'>
                    <Loader text="Loading your homestay..." />
                </div>
            }
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

                            <div className="hidden lg:block">
                                <BookingCard
                                    checkIn={checkIn}
                                    checkOut={checkOut}
                                    onCheckInChange={setCheckIn}
                                    onCheckOutChange={setCheckOut}
                                    price={homeStay?.data?.pricePerNight}
                                    insuranceDetails={
                                        {
                                            provider: homeStay?.data?.provider,
                                            insurancePercentage: homeStay?.data?.insuranceAmount,
                                            insuranceDescription: homeStay?.data?.insuranceDescription
                                        }
                                    }
                                    guests={guests}
                                    setGuests={setGuests}
                                    maxGuests={homeStay?.data?.maxGuests}
                                    setModal={setIsModalOpen}
                                />
                            </div>
                        </div>

                        {/* Addons */}
                        <div>
                            <AddonsSection />
                        </div>

                        <div className="block mb-4 lg:hidden">
                            <BookingCard
                                checkIn={checkIn}
                                checkOut={checkOut}
                                onCheckInChange={setCheckIn}
                                onCheckOutChange={setCheckOut}
                                price={homeStay?.data?.pricePerNight}
                                insuranceDetails={
                                    {
                                        provider: homeStay?.data?.provider,
                                        insurancePercentage: homeStay?.data?.insuranceAmount,
                                        insuranceDescription: homeStay?.data?.insuranceDescription
                                    }
                                }
                                guests={guests}
                                setGuests={setGuests}
                                maxGuests={homeStay?.data?.maxGuests}
                                setModal={setIsModalOpen}
                            />
                        </div>

                        {
                            (!isModalOpen && id) && <ReviewsSection homeStayId={id} />
                        }
                        {
                            (bookingStatus?.status && calculateDifferenceInDays(bookingStatus?.checkIn) <= 2) ?
                                <div>
                                    {
                                        !isModalOpen && <MapView
                                            position={
                                                [
                                                    homeStay?.data?.address?.coordinates?.latitude,
                                                    homeStay?.data?.address?.coordinates?.longitude
                                                ]}
                                            title={homeStay?.data?.title}
                                            address={homeStay?.data?.address}
                                        />
                                    }
                                </div> :
                                <div>
                                    {
                                        (homeStay?.data?.address?.coordinates?.nearByLatitude && homeStay?.data?.address?.coordinates?.nearByLongitude) &&
                                        <div>
                                            {
                                                !isModalOpen && <MapView
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
                                </div>
                        }
                    </main>
                </div> : null
            }
        </>
    );
}

export default HomeStayPage;