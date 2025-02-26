import React from 'react';
import { LogIn, LogOut, X, Check } from 'lucide-react';

const BookingButtons = ({
    checkIn,
    checkOut,
    onCheckIn,
    onCheckOut,
    onCancel,
    isCheckedIn,
    isCheckedOut,
    isCancelled,
}) => {

    const now = new Date();
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Check-In button enabled only on the exact check-in date if not already checked in
    const isCheckInActive = now.toDateString() === checkInDate.toDateString() && !isCheckedIn && !isCancelled && !isCheckedOut;

    // Check-Out button enabled only between the day after check-in date and before check-out date if not already checked out
    const isCheckOutActive = now > checkInDate && now < checkOutDate && !isCheckedOut && !isCancelled;

    // Cancel button enabled only before the check-in date if not already cancelled
    const isCancelActive = now < checkInDate && !isCancelled;

    return (
        <div className="mt-4 flex flex-col gap-2">
            {/* Check In Button */}
            <button
                onClick={onCheckIn}
                disabled={!isCheckInActive}
                className={`flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium ${isCheckedIn
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : isCheckInActive
                        ? 'border border-blue-400 text-blue-400 hover:border-blue-600'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
            >
                {isCheckedIn ? <Check className="w-4 h-4 mr-2" /> : <LogIn className="w-4 h-4 mr-2" />}
                {isCheckedIn ? 'Checked In' : 'Check In'}
            </button>

            {/* Check Out Button */}
            <button
                onClick={onCheckOut}
                disabled={!isCheckOutActive}
                className={`flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium ${isCheckedOut
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : isCheckOutActive
                        ? 'border border-green-400 text-green-600 hover:border-green-700'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
            >
                {isCheckedOut ? <Check className="w-4 h-4 mr-2" /> : <LogOut className="w-4 h-4 mr-2" />}
                {isCheckedOut ? 'Checked Out' : 'Check Out'}
            </button>

            {/* Cancel Button */}
            <button
                onClick={onCancel}
                disabled={!isCancelActive}
                className={`col-span-2 flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium ${isCancelled
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : isCancelActive
                        ? 'border border-red-600 text-red-400 hover:border-red-700'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
            >
                {isCancelled ? <Check className="w-4 h-4 mr-2" /> : <X className="w-4 h-4 mr-2" />}
                {isCancelled ? 'Cancelled' : 'Cancel Booking'}
            </button>
        </div>
    );
};

export default BookingButtons;
