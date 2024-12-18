import React from 'react';
import { LogIn, LogOut, X } from 'lucide-react';

const BookingButtons = ({
    checkIn,
    checkOut,
    onCheckIn,
    onCheckOut,
    onCancel,
}) => {
    const now = new Date();
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Check-In button enabled only on the exact check-in date
    const isCheckInActive =
        now.toDateString() === checkInDate.toDateString();

    // Check-Out button enabled only between the day after check-in date and before check-out date
    const isCheckOutActive =
        now > checkInDate && now < checkOutDate;

    // Cancel button enabled only before the check-in date
    const isCancelActive =
        now < checkInDate;

    return (
        <div className="mt-4 grid grid-cols-2 gap-2">
            <button
                onClick={onCheckIn}
                disabled={!isCheckInActive}
                className={`flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium ${isCheckInActive
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
            >
                <LogIn className="w-4 h-4 mr-2" />
                Check In
            </button>

            <button
                onClick={onCheckOut}
                disabled={!isCheckOutActive}
                className={`flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium ${isCheckOutActive
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
            >
                <LogOut className="w-4 h-4 mr-2" />
                Check Out
            </button>

            <button
                onClick={onCancel}
                disabled={!isCancelActive}
                className={`col-span-2 flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium ${isCancelActive
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
            >
                <X className="w-4 h-4 mr-2" />
                Cancel Booking
            </button>
        </div>
    );
};

export default BookingButtons;
