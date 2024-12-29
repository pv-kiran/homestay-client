import React, { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { theme } from '../utils/theme';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { CheckCircle, Tag, Ticket, Users, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { SignupModal } from './SignupModal';
import userService from '../services/userServices';
import useApi from '../hooks/useApi';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from './common/Button';
import { Modal } from "../components/common/Modal";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Kolkata');

export const BookingCard = ({ checkIn, checkOut, onCheckInChange, onCheckOutChange, price, guests, setGuests }) => {
    const { id } = useParams();
    const [availableCoupons, setAvailableCoupons] = useState([{}]);
    const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
    const [appliedCoupon, setAppliedCoupon] = useState(() => {
        const storedCoupon = sessionStorage.getItem('appliedCoupon');
        return storedCoupon ? JSON.parse(storedCoupon) : null;
    });
    const [couponCode, setCouponCode] = useState('');

    const {
        error,
        loading,
        execute: bookHomestay,
        success,
        reset,
    } = useApi(userService.userBookHomestay);

    const {
        // data,
        // error,
        // loading,
        execute: getValidCoupons,
        // success,
        // reset,
    } = useApi(userService.userGetValidCoupons);

    const {
        // data,
        error: couponError,
        // loading,
        execute: applyCoupon,
        // success,
        // reset,
    } = useApi(userService.userApplyCoupon);
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

    const getCoupons = async () => {
        const response = await getValidCoupons();
        if (response.success) {
            setAvailableCoupons(response?.data)
        }
    }

    const handleClose = () => {
        setIsCouponModalOpen(false);
    }

    const handleRemoveCoupon = () => {
        setAppliedCoupon(null);
        setCouponCode('');
        sessionStorage.removeItem('appliedCoupon');
    }

    const handleApplyCoupon = async (code = couponCode) => {
        const days = differenceInDays === null ? 1 : differenceInDays
        const response = await applyCoupon(code, id, days)
        if (response.success) {
            const couponDetails = {
                discountAmount: response?.data?.discountAmount,
                newPrice: response?.data?.newPrice,
                originalPrice: response?.data?.originalPrice,
                code: response?.data?.code,
                discountType: response?.data?.discountType,
                value: response?.data?.value
            };
            setAppliedCoupon(couponDetails);
            sessionStorage.setItem('appliedCoupon', JSON.stringify(couponDetails));
            // setIsCouponModalOpen(false);
            toast.success(response.message);
        }
    }

    useEffect(() => {
        if (error) {
            toast.error(error?.message);
        }
        if (bookingError) {
            toast.error(bookingError?.message);
        }
        if (couponError) {
            toast.error(couponError?.message);
        }
    }, [error, couponError])

    useEffect(() => {
        if (success) {
            toast.success("Reservation is Success");
        }
    }, [error, bookingError])



    useEffect(() => {
        getCoupons();
    }, [])

    useEffect(() => {
        return () => {
            setAppliedCoupon(null);
            setCouponCode('');
            sessionStorage.removeItem('appliedCoupon');
        };
    }, []);

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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Check-in<span className="text-red-500 pl-1">*</span></label>
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Check-out<span className="text-red-500 pl-1">*</span></label>
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

                    <div className="mt-2 sm:mt-4 pt-4 sm:pt-6 border-t text-sm sm:text-base">
                        <div className="pb-2">
                            {!appliedCoupon ? (
                                (checkIn !== null && checkOut !== null) && (
                                    <button
                                        onClick={() => setIsCouponModalOpen(true)}
                                        className="group flex items-center gap-2 w-full p-3 text-gray-700 hover:bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 hover:border-teal-500 transition-all duration-300"
                                    >
                                        <Ticket className="w-5 h-5 text-teal-600 group-hover:scale-110 transition-transform" />
                                        <div className="flex flex-col items-start">
                                            <span className="font-medium text-gray-900">
                                                Apply Coupon
                                            </span>
                                            <span className="text-xs text-gray-500">Save more on your booking</span>
                                        </div>
                                    </button>
                                )
                            ) : (
                                <div className="p-3 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg border border-teal-200 shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-teal-100 p-2 rounded-full">
                                                <CheckCircle className="w-5 h-5 text-teal-600" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-teal-700">{appliedCoupon?.code}</span>
                                                    <span className="text-xs px-2 py-1 bg-white text-green-500 rounded-full">Applied</span>
                                                </div>
                                                <p className="text-xs text-gray-500">
                                                    You saved ₹{appliedCoupon?.discountAmount}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleRemoveCoupon}
                                            className="p-2 hover:bg-white rounded-full transition-colors duration-200"
                                        >
                                            <X className="w-5 h-5 text-gray-400 hover:text-red-500" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            <Modal
                                isOpen={isCouponModalOpen}
                                onClose={handleClose}
                                title={"Apply coupon"}
                            >
                                {!appliedCoupon ? (
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="coupon"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                            placeholder="Enter coupon code"
                                            className="w-full rounded-lg border border-gray-300 bg-white py-3 px-4 text-sm placeholder:text-gray-400 focus:border-turquoise-500 focus:outline-none focus:ring-1 focus:ring-turquoise-500 pr-20"
                                        />
                                        {couponCode && (
                                            <button
                                                onClick={() => handleApplyCoupon()}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 text-teal-600 font-medium hover:text-teal-700 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                            >
                                                APPLY
                                            </button>
                                        )}
                                    </div>
                                ) : (
                                    <div className="">
                                        <div className="flex items-center justify-between p-3 bg-[#F0FDFA] rounded-md border border-[#14B8A6]">
                                            <div className="flex items-center gap-2">
                                                <CheckCircle className="w-5 h-5 text-[#14B8A6]" />
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-semibold text-teal-700">{appliedCoupon?.code}</span>
                                                        <span className="text-xs px-2 py-1 bg-white text-green-500 rounded-full">Applied</span>
                                                    </div>
                                                    <p className="text-xs text-gray-500">
                                                        You saved ₹{appliedCoupon?.discountAmount}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={handleRemoveCoupon}
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className='mt-4'>
                                    <p className='text-xs text-gray-500 pl-1'>Available coupons</p>
                                </div>

                                {availableCoupons?.length !== 0 ? (
                                    <div className="space-y-3 mt-4">
                                        {availableCoupons?.map((coupon, index) => (
                                            <div
                                                key={`${coupon?.code || 'coupon'}-${index}`}
                                                className='p-3 pt-2 pb-2 border rounded-md hover:border-[#14B8A6] transition-colors'
                                            >
                                                <div className="flex justify-between items-start mb-1">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-medium text-gray-900">{coupon?.code}</span>
                                                            <span className="px-2 py-0.5 text-xs font-medium text-teal-700 bg-teal-100 rounded-full">
                                                                {/* {new Date(coupon?.expiryDate).toLocaleDateString()} */}
                                                                {coupon?.discountType === 'percentage' ?
                                                                    `${coupon?.discountValue}% off`
                                                                    : `Flat ₹${coupon?.discountValue} off`
                                                                }
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-gray-600">{coupon?.description}</p>
                                                        <p className="text-xs text-gray-400 font-md">valid till <span className='text-red-600 font-lg'>{new Date(coupon?.expiryDate).toLocaleDateString()}</span></p>
                                                    </div>
                                                    <button
                                                        onClick={() => handleApplyCoupon(coupon?.code)}
                                                        className="text-sm text-teal-600 hover:text-teal-700 mt-2 font-medium bg-teal-50 px-4 py-2 rounded-lg group-hover:bg-teal-100 transition-colors"
                                                    >
                                                        APPLY
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-4 mt-5 text-center text-red-600 py-3 rounded-lg">
                                        <span className="text-md">
                                            Oops.! No coupons available.
                                        </span>
                                    </div>
                                )}
                            </Modal>
                        </div>
                        <div className="flex justify-between mb-2 mt-2">
                            <span className="text-gray-600 text-md">{`₹ ${price} ×`}
                                {differenceInDays ? ` ${differenceInDays} ` : ` ${1}`}    night(s)</span>
                            <span>
                                {
                                    differenceInDays ? `${price * differenceInDays}/-` : `${price}/-`
                                }
                            </span>
                        </div>
                        {appliedCoupon !== null && (
                            <div className="flex justify-between mb-2">
                                <div className='flex'>
                                    <Tag className='text-green-600 h-5' size={14} />
                                    <span className="text-green-600 text-sm pl-1">Discount applied</span>
                                </div>
                                <span className="text-green-600 text-sm">{`-${appliedCoupon?.discountAmount}/-`}</span>
                            </div>
                        )}


                        {/* <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Cleaning fee</span>
                            <span>₹85</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Service fee</span>
                            <span>₹95</span>
                        </div> */}
                        <div className="flex justify-between pt-4 border-t font-semibold text-lg">
                            <span>Total</span>
                            <span>
                                {
                                    appliedCoupon !== null ? (`${appliedCoupon?.newPrice}/-`) : (differenceInDays ? `${price * differenceInDays}/-` : `${price}/-`)
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