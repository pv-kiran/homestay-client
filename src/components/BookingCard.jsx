import React, { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { theme } from '../utils/theme';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Users } from 'lucide-react';
import { useSelector } from 'react-redux';
import { SignupModal } from './SignupModal';
import userService from '../services/userServices';
import useApi from '../hooks/useApi';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from './common/Button';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Kolkata');

export const BookingCard = ({ checkIn, checkOut, onCheckInChange, onCheckOutChange, price, guests, setGuests }) => {
    const { id } = useParams();
    const {
        error,
        loading,
        execute: bookHomestay,
        success,
        reset,
    } = useApi(userService.userBookHomestay);

    const {
        error: bookingError,
        loading: bookingLoading,
        execute: bookHomestayComplete,
        success: bookHomestaySuccess,
    } = useApi(userService.userBookHomestayComplete);

    const { authState } = useSelector((state) => state?.userAuth)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const differenceInDays = checkOut && checkIn ? dayjs(checkOut).diff(dayjs(checkIn), 'day') : null;


    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }


    const handleReserve = async () => {
        if (!authState) {
            setIsModalOpen(true);
            return;
        } else {
            try {
                const response = await bookHomestay({
                    homestayId: id,
                    checkIn: checkIn?.$d,
                    checkOut: checkOut?.$d,
                    currency: JSON.parse(localStorage.getItem('currency'))
                })

                const { data } = response

                if (response.success) {
                    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
                    if (!res) {
                        alert("Razorpay SDK failed to load. Are you online?");
                        return;
                    }
                    const options = {
                        key: import.meta.env.VITE_APP_RZP_KEY,
                        amount: data?.amount,
                        currency: JSON.parse(localStorage.getItem('currency'))?.code,
                        name: "BeStays",
                        description: "Test Transaction",
                        // image: { logo },
                        order_id: data?.id,
                        handler: async function (response) {


                            const requestBody = {
                                homestayId: id,
                                checkIn: checkIn?.$d,
                                checkOut: checkOut?.$d,
                                orderId: response?.razorpay_order_id,
                                paymentId: response?.razorpay_payment_id
                            }


                            const bookingResponse = await bookHomestayComplete(requestBody)

                            if (response.success === true) {
                                console.log(bookingResponse)
                            }

                            // navigate(`/appointment/${data?.appointment?._id}/success`)

                        },
                        prefill: {
                            name: "Testing",
                            email: "test@gmail.com",
                            contact: "9999999999",
                        },
                        notes: {
                            address: "Doccure",
                        },
                        theme: {
                            color: "#61dafb",
                        },
                    };

                    const paymentObject = new window.Razorpay(options);
                    paymentObject.open();
                }

            } catch (err) {
                console.log(err)
            }

        }
    }

    useEffect(() => {
        if (error) {
            toast.error(error?.message);
        }
        if (bookingError) {
            toast.error(bookingError?.message);
        }
    }, [error, bookingError])



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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Check-in *</label>
                                <div className='flex justify-between border p-2 rounded-xl'>
                                    <DatePicker
                                        value={checkIn}
                                        onChange={(newValue) => {
                                            onCheckInChange(newValue);;
                                        }}
                                        minDate={dayjs()}
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Check-out *</label>
                                <div className='flex justify-between border p-2 rounded-xl'>
                                    <DatePicker
                                        className='border'
                                        value={checkOut}
                                        onChange={(newValue) => {
                                            onCheckOutChange(newValue);
                                        }}
                                        minDate={checkIn ? dayjs(checkIn).add(1, 'day') : dayjs()}
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

                        <div className="flex justify-between items-center gap-2 border p-1 rounded-xl">
                            <div className='flex gap-2 items-center pl-2'>
                                <Users className="h-4 w-4 text-gray-400" />
                                <span className="text-md text-gray-500">Guests</span>
                            </div>
                            <input
                                type="number"
                                min="1"
                                max="16"
                                className="w-20 bg-transparent border-none outline-none text-gray-600 text-sm
                                        focus:outline-none focus:ring-0 focus:border-none"
                                value={guests}
                                onChange={(e) => setGuests(parseInt(e.target.value))}
                            />
                        </div>

                        <Button
                            onClick={() => handleReserve()}
                            className='w-full'
                            isLoading={loading}
                        >
                            Reserve Now
                        </Button>

                        <div className="text-center text-xs sm:text-sm text-gray-500">
                            You won't be charged yet
                        </div>
                    </div>

                    <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t text-sm sm:text-base">
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600">₹ {price} ×
                                {differenceInDays ? differenceInDays : 1}    nights</span>
                            <span>
                                {
                                    differenceInDays ? price * differenceInDays : price
                                }
                            </span>
                        </div>
                        {/* <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Cleaning fee</span>
                            <span>₹85</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Service fee</span>
                            <span>₹95</span>
                        </div> */}
                        <div className="flex justify-between pt-4 border-t font-semibold">
                            <span>Total</span>
                            <span>
                                {
                                    differenceInDays ? price * differenceInDays : price
                                }
                            </span>
                        </div>
                    </div>
                </div>
                <SignupModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </ThemeProvider>
        </LocalizationProvider>
    );
};