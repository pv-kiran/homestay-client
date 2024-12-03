import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { theme } from '../utils/theme';
import dayjs from 'dayjs';
import { Users } from 'lucide-react';



export const BookingCard = ({ checkIn, checkOut, onCheckInChange, onCheckOutChange, price, guests, setGuests }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={theme}>
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 sticky top-[88px]">
                    <div className="mb-4 sm:mb-6">
                        <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                            ₹{price?.toLocaleString('en-IN')} <span className="text-base sm:text-lg font-normal text-gray-600">per night</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                                <div className='flex justify-between border p-2 rounded-xl'>
                                    <DatePicker
                                        value={checkIn}
                                        onChange={(newValue) => onCheckInChange(newValue)}
                                        minDate={checkIn || dayjs()}
                                        format="MMM D, YYYY"
                                        slotProps={{
                                            textField: {
                                                placeholder: "Add date",
                                                onFocus: () => setActiveInput('checkIn'),
                                                onBlur: () => setActiveInput(null)
                                            }
                                        }}
                                    />
                                </div>

                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                                <div className='flex justify-between border p-2 rounded-xl'>
                                    <DatePicker
                                        className='border'
                                        value={checkOut}
                                        onChange={(newValue) => onCheckOutChange(newValue)}
                                        minDate={checkIn || dayjs()}
                                        format="MMM D, YYYY"
                                        slotProps={{
                                            textField: {
                                                style: {
                                                    display: "flex",
                                                    justifyContent: "space-between"
                                                },
                                                placeholder: "Add date",
                                                onFocus: () => setActiveInput('checkOut'),
                                                onBlur: () => setActiveInput(null)
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center gap-2 ">
                            <Users className="h-4 w-4 text-gray-400" />
                            <input
                                type="number"
                                min="1"
                                max="16"
                                className="w-20 bg-transparent border outline-none text-gray-600 text-sm
                                        focus:outline-none focus:ring-0 focus:border-gray-200"
                                value={guests}
                                onChange={(e) => setGuests(parseInt(e.target.value))}
                            />
                            <span className="text-sm text-gray-500">guests</span>
                        </div>

                        <button className="w-full bg-turquoise-600 text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-turquoise-700 transition-colors text-sm sm:text-base">
                            Reserve Now
                        </button>

                        <div className="text-center text-xs sm:text-sm text-gray-500">
                            You won't be charged yet
                        </div>
                    </div>

                    <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t text-sm sm:text-base">
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600">₹{price?.toLocaleString('en-IN')} × 5 nights</span>
                            <span>₹1,495</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Cleaning fee</span>
                            <span>₹85</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Service fee</span>
                            <span>₹95</span>
                        </div>
                        <div className="flex justify-between pt-4 border-t font-semibold">
                            <span>Total</span>
                            <span>₹1,675</span>
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        </LocalizationProvider>
    );
};