import React, { useEffect, useState } from 'react';
import { ImageGallery } from '../components/ImageGallery';
import { PropertyDetails } from '../components/HomeStayDetails';
import { BookingCard } from '../components/BookingCard';
import { useParams } from 'react-router-dom';
import useApi from '../hooks/useApi';
import userService from '../services/userServices';
import { useDispatch, useSelector } from 'react-redux';
import MapView from '../components/MapView';
import ReviewsSection from '../components/displayReview/ReviewsSection';
import { Loader } from '../components/common/Loader';
import AddonsSection from '../components/addons/AddonsSection';
import { setAddOns } from '../app/features/admin/addonSlice';
import { PaymentProcessing } from '../components/PaymentProcessing';
import CancellationPolicy from '../components/CancellationPolicy';

function HomeStayPage() {

    const { currency } = useSelector((store) => store?.currency);
    const { id } = useParams();
    const dispatch = useDispatch();
    const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);


    const [initialLoad, setIsInitialLoad] = useState(true);
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

    const initiatePayment = () => {
        setIsPaymentProcessing(true)
    }

    const completePayment = () => {
        setIsPaymentProcessing(false)
    }


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        getHomeStayById({ id, currency: JSON.parse(localStorage.getItem('currency')).code, setLoading: setIsInitialLoad });
    }, [id, currency])



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

    if (isPaymentProcessing) {
        return <PaymentProcessing />
    }
    return (
        <section>
            {
                (homeStayLoading && initialLoad) && <div className='mt-[65px] h-[80vh] flex items-center justify-center'>
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
                                    gst={homeStay?.data?.gst}
                                    guests={guests}
                                    setGuests={setGuests}
                                    maxGuests={homeStay?.data?.maxGuests}
                                    setModal={setIsModalOpen}
                                    initiatePayment={initiatePayment}
                                    completePayment={completePayment}
                                />
                                {Array.isArray(homeStay?.data?.cancellationPolicy) && homeStay.data.cancellationPolicy.length > 0 && (
                                    <div className="mt-8 mb-6">
                                        <CancellationPolicy cancPolicy={homeStay?.data?.cancellationPolicy} />
                                    </div>
                                )}
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
                                gst={homeStay?.data?.gst}
                                guests={guests}
                                setGuests={setGuests}
                                maxGuests={homeStay?.data?.maxGuests}
                                setModal={setIsModalOpen}
                                initiatePayment={initiatePayment}
                                completePayment={completePayment}
                            />
                            <div className="mt-8 mb-6">
                                <CancellationPolicy cancPolicy={homeStay?.data?.cancellationPolicy} />
                            </div>
                        </div>

                        {
                            (!isModalOpen && id) && <ReviewsSection homeStayId={id} />
                        }
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
                    </main>
                </div> : null
            }
        </section>
    );
}

export default HomeStayPage;