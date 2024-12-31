
import React, { useState } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import BookingButtons from './BookingButtons';
import useApi from '../hooks/useApi';
import userService from '../services/userServices';
import { toast } from 'react-toastify';
import { Modal } from './common/Modal';
import ReviewForm from './reviewModal/ReviewForm';


const MyBookingCard = ({
    _id,
    checkIn,
    checkOut,
    paymentId,
    amount,
    homestayName,
    homestayImage,
    homestayAddress,
    createdAt,
    getMyBookings,
    isCheckedIn,
    isCheckedOut,
    isCancelled,
    homestayId
}) => {

    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    const {
        loading: checkInLoading,
        execute: checkInInitiate,
        error: checkInError,
        success: checkInSuccess
    } = useApi(userService.userGetHomeStayCheckIn);

    const {
        loading: checkOutLoading,
        execute: checkOutInitiate,
        error: checkOutError,
        success: checkOutSuccess
    } = useApi(userService.userGetHomeStayCheckOut);

    const {
        loading: cancelLoading,
        execute: cancelInitiate,
        error: cancelError,
        success: cancelSuccess
    } = useApi(userService.userGetHomeStayCancel);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    const formatAmount = (amount) => {
        if (!amount) return '';
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const handleCheckIn = async () => {
        const response = await checkInInitiate({ bookingId: _id });
        if (response.success) {
            toast.success(response.message);
            getMyBookings();
            toast.success("Checkin is Sucessfull");
        }
    };

    const handleCheckOut = async () => {
        const response = await checkOutInitiate({ bookingId: _id });
        if (response.success) {
            toast.success("Checkout is Sucessfull");
            getMyBookings();
            setTimeout(() => {
                setIsReviewModalOpen(true);
            }, 300);
        }
    };

    const handleCancel = async () => {
        const response = await cancelInitiate({ bookingId: _id });
        if (response.success) {
            toast.success(response.message);
            getMyBookings();
            toast.success("Cancellation is Sucessfull");
        }
    };






    const handleClose = () => {
        setIsReviewModalOpen(false);
    }

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Image Section */}
            <div className="relative h-48">
                <img
                    src={homestayImage}
                    alt={homestayName}
                    className="w-full h-full object-cover"
                />
                {amount && (
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                        <span className="text-emerald-600 font-semibold">{formatAmount(amount)}</span>
                    </div>
                )}
            </div>

            {/* Details Section */}
            <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{homestayName}</h3>
                    {paymentId && (
                        <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                            Paid
                        </span>
                    )}
                </div>

                <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="text-sm line-clamp-1">
                            {homestayAddress.street}, {homestayAddress.city}
                        </span>
                    </div>

                    <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="text-sm">
                            {formatDate(checkIn)} - {formatDate(checkOut)}
                        </span>
                    </div>

                    <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="text-sm">Booked on {formatDate(createdAt)}</span>
                    </div>
                </div>

                {paymentId && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-xs text-gray-500">
                            Payment ID: {paymentId}
                        </p>
                    </div>
                )}
                <BookingButtons
                    checkIn={checkIn}
                    checkOut={checkOut}
                    onCheckIn={handleCheckIn}
                    onCheckOut={handleCheckOut}
                    onCancel={handleCancel}
                    isCheckedIn={isCheckedIn}
                    isCheckedOut={isCheckedOut}
                    isCancelled={isCancelled}
                />
                <Modal
                    isOpen={isReviewModalOpen}
                    onClose={handleClose}
                    title={"Rate your stay"}
                >
                    <ReviewForm
                        stayName={homestayName}
                        homestayId={homestayId}
                        onClose={handleClose}
                    />
                </Modal>
            </div>
        </div>
    );
};

export default MyBookingCard;