import React, { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { theme } from '../utils/theme';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { CheckCircle, Sparkles, Tag, Ticket, Users, X, Info } from 'lucide-react';
import { useSelector } from 'react-redux';
import { SignupModal } from './SignupModal';
import userService from '../services/userServices';
import useApi from '../hooks/useApi';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from './common/Button';
import { motion } from 'framer-motion';
import { Modal } from "../components/common/Modal";
import AddonsPrice from './addons/AddonsPrice';
import UploadIdProof from './UploadIdProof';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Kolkata');


const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const wordAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4
        }
    }
};

export const BookingCard = ({ checkIn, checkOut, onCheckInChange, onCheckOutChange, price, guests, setGuests, maxGuests, setModal, insuranceDetails, gst, initiatePayment, completePayment }) => {
    const { id } = useParams();
    const [availableCoupons, setAvailableCoupons] = useState([{}]);
    const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
    const [appliedCoupon, setAppliedCoupon] = useState(() => {
        const storedCoupon = sessionStorage.getItem('appliedCoupon');
        return storedCoupon ? JSON.parse(storedCoupon) : null;
    });
    const { authState } = useSelector((state) => state?.userAuth);
    const { currency } = useSelector((store) => store?.currency);
    const { selectedItems } = useSelector((store) => store?.addOns);
    const [couponCode, setCouponCode] = useState('');
    const [checkInError, setCheckInError] = useState(null);
    const [checkOutError, setCheckOutError] = useState(null);
    const [idProof, setIdProof] = useState(null);

    const navigate = useNavigate();

    const {
        error,
        loading,
        execute: bookHomestay,
    } = useApi(userService.userBookHomestay);

    const {
        execute: getValidCoupons,
    } = useApi(userService.userGetValidCoupons);

    const {
        error: couponError,
        execute: applyCoupon,
    } = useApi(userService.userApplyCoupon);
    const {
        error: bookingError,
        loading: bookingLoading,
        execute: bookHomestayComplete,
        success: bookHomestaySuccess,
    } = useApi(userService.userBookHomestayComplete);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUploadedModalOpen, setIsUploadedModalOpen] = useState(false);
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


    console.log(authState, "HHHHH")

    const handleReserve = async () => {
        if (!authState) {
            setIsModalOpen(true);
            return;
        }
        else if (!authState?.isIdUploaded) {
            setIsUploadedModalOpen(true);
            return;
        }
        else if (!checkIn || !checkOut) {
            setCheckInError("CheckIn is required")
            setCheckOutError("CheckOut is required")
            return;
        }
        else {
            try {
                const response = await bookHomestay({
                    homestayId: id,
                    checkIn: checkIn?.$d,
                    checkOut: checkOut?.$d,
                    currency: JSON.parse(localStorage.getItem('currency')),
                    couponCode,
                    addOns: selectedItems
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
                                paymentId: response?.razorpay_payment_id,
                                addOns: selectedItems,
                                currency,
                                amount: data?.amount,
                                guests
                            }

                            initiatePayment();


                            const bookingResponse = await bookHomestayComplete(requestBody)

                            if (bookingResponse?.data?._id) {
                                navigate(`/booking/${bookingResponse?.data?._id}/success`, {
                                    state: { bookingResponse },
                                })
                                completePayment();
                            }
                        },
                        prefill: {
                            name: "Testing",
                            email: "test@gmail.com",
                            contact: "9876543210",
                        },
                        notes: {
                            address: "BeStays",
                        },
                        theme: {
                            color: "#14b8a6",
                        },
                    };
                    const paymentObject = new window.Razorpay(options);
                    paymentObject.open();
                }
                completePayment();
            } catch (err) {
                // TODO: - payment failure
                completePayment();
                console.log(err)
            }

        }
    }

    const getCoupons = async () => {
        const response = await getValidCoupons(currency?.code);
        if (response.success) {
            setAvailableCoupons(response?.data)
        }
    }

    const handleClose = () => {
        setIsCouponModalOpen(false);
        setModal(false)
    }

    const handleRemoveCoupon = () => {
        setAppliedCoupon(null);
        setCouponCode('');
        sessionStorage.removeItem('appliedCoupon');
    }

    const handleApplyCoupon = async (code = couponCode) => {
        const days = differenceInDays === null ? 1 : differenceInDays
        setCouponCode(code)
        const currencyCode = currency?.code;
        const insuranceAmount = calculateInsurance(price, 1, insuranceDetails?.insurancePercentage);
        const gstAmount = calculateGst(price, 1, gst)
        const addOnAmount = getAddonAmount();
        const response = await applyCoupon(code, id, days, currencyCode, insuranceAmount, addOnAmount, gstAmount)
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


    const getAddonAmount = () => {
        const hasItems = Object.values(selectedItems).some(category => Object.keys(category)?.length > 0);
        if (hasItems) {
            const totalAddonAmount = Object.values(selectedItems).reduce(
                (sum, category) =>
                    sum + Object.values(category).reduce(
                        (categorySum, item) => categorySum + item.price * item.quantity,
                        0
                    ),
                0
            );
            return totalAddonAmount;
        }
        return 0;
    }

    const calculatePrice = (price, nights) => {
        return price * nights
    }

    const calculateInsurance = (price, differenceInDays, insurancePercentage) => {
        return insurancePercentage ? Math.ceil(((price * differenceInDays) * insurancePercentage) / 100) : 0
    }

    const calculateGst = (price, differenceInDays, gst) => {
        return gst ? Math.ceil(((price * differenceInDays) * gst) / 100) : 0
    }

    const getCouponInsurance = (price, insuranceCoverage) => {
        return insuranceCoverage ? Math.ceil((price * insuranceCoverage) / 100) : 0
    }

    const getCouponGST = (price, gst) => {
        return gst ? Math.ceil((price * gst) / 100) : null
    }


    const totalPrice = (price, differenceInDays, insuranceCoverage, gst, isCouponApplied) => {
        if (!isCouponApplied) {
            // const insurance = Math.ceil(((price * differenceInDays) * insuranceCoverage) / 100);
            const insurance = calculateInsurance(price, differenceInDays, insuranceCoverage)
            const totalPrice = price * differenceInDays;
            const totalAmount = totalPrice + insurance;
            return Math.ceil(totalAmount + getAddonAmount() + price);
        }
        return price + getCouponInsurance(price, insuranceCoverage) + getCouponGST(price, gst) + Math.ceil(getAddonAmount());
    }

    useEffect(() => {
        if (error) {
            toast.error(error?.message);
        }
        if (couponError) {
            toast.error(couponError?.message);
        }
    }, [error, couponError])


    useEffect(() => {
        if (authState) {
            getCoupons();
        }
    }, [authState, currency])

    useEffect(() => {
        return () => {
            setAppliedCoupon(null);
            setCouponCode('');
            sessionStorage.removeItem('appliedCoupon');
        };
    }, []);

    useEffect(() => {
        if (couponCode) {
            handleRemoveCoupon()
        }
    }, [checkIn, checkOut, currency])



    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={theme}>
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 sticky top-[88px]">
                    <div className="mb-4 sm:mb-6">
                        <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                            <span className='mr-2'>{currency?.symbol}</span>
                            {price?.toLocaleString('en-IN')} <span className="text-base sm:text-lg font-normal text-gray-600">per night</span>
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
                                            onCheckInChange(newValue);
                                            onCheckOutChange(null)
                                            setCheckInError(null)
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
                                {checkInError && (
                                    <p className="mt-1 text-xs text-red-500">{checkInError}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Check-out<span className="text-red-500 pl-1">*</span></label>
                                <div className='flex justify-between border p-2 rounded-xl'>
                                    <DatePicker
                                        className='border'
                                        value={checkOut}
                                        onChange={(newValue) => {
                                            onCheckOutChange(newValue);
                                            setCheckOutError(null)
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
                                {checkOutError && (
                                    <p className="mt-1 text-xs text-red-500">{checkOutError}</p>
                                )}
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
                                max={maxGuests}
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
                                    ((authState !== null) ? (
                                        <button
                                            onClick={() => {
                                                setIsCouponModalOpen(true)
                                                setModal(true)
                                            }}
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
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="relative overflow-hidden group"
                                        >
                                            <motion.div
                                                whileHover={{ scale: 1.02 }}
                                                className="w-full p-3 rounded-lg border-2 border-dashed border-gray-200 bg-gradient-to-r from-gray-50 to-white"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="relative">
                                                        <motion.div
                                                            animate={{ rotate: [0, 15, -15, 0] }}
                                                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                                                            className="bg-teal-50 p-2 rounded-full"
                                                        >
                                                            <Ticket className="w-5 h-5 text-teal-600" />
                                                        </motion.div>
                                                        <motion.div
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: [0, 1.2, 0] }}
                                                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                                                            className="absolute -top-1 -right-1"
                                                        >
                                                            <Sparkles className="w-3 h-3 text-yellow-400" />
                                                        </motion.div>
                                                    </div>

                                                    <div className="flex-1">
                                                        <motion.div
                                                            initial="hidden"
                                                            animate="visible"
                                                            variants={{
                                                                visible: {
                                                                    transition: {
                                                                        staggerChildren: 0.05
                                                                    }
                                                                }
                                                            }}
                                                            className="font-medium text-gray-900 flex flex-wrap gap-x-1"
                                                        >
                                                            {["Sign", "up", "to", "unlock", "exclusive", "coupons"].map((word, i) => (
                                                                <motion.span
                                                                    key={i}
                                                                    variants={wordAnimation}
                                                                    className="inline-block"
                                                                >
                                                                    {word}
                                                                </motion.span>
                                                            ))}
                                                        </motion.div>
                                                        <motion.div
                                                            variants={textVariants}
                                                            initial="hidden"
                                                            animate="visible"
                                                            transition={{ delay: 0.5 }}
                                                            className="text-xs text-gray-500"
                                                        >
                                                            Save up to <motion.span
                                                                animate={{ scale: [1, 1.1, 1] }}
                                                                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                                                                className="inline-block font-semibold text-teal-600"
                                                            >
                                                                15% off
                                                            </motion.span> on your stay booking
                                                        </motion.div>
                                                    </div>

                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: [0, 1.2, 0] }}
                                                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                                                        className="absolute -top-0.5 -right-0.5"
                                                    >
                                                        <Sparkles className="w-3 h-3 text-yellow-400" />
                                                    </motion.div>
                                                </div>

                                                {/* Animated gradient overlay */}
                                                <motion.div
                                                    initial={{ x: '-100%' }}
                                                    animate={{ x: '200%' }}
                                                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                                />
                                            </motion.div>
                                        </motion.div>
                                    ))
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
                                                    You saved
                                                    <span className='mr-2'>{currency?.symbol}</span>
                                                    {appliedCoupon?.discountAmount}
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
                                                        You saved
                                                        <span className='mr-2'>{currency?.symbol}</span>{appliedCoupon?.discountAmount}
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
                                    <div className="space-y-3 mt-4 ">
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
                                                                    : `Flat ${currency?.symbol} ${coupon?.discountValue} off`
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
                        <div className="flex justify-between mb-2 mt-2 px-2">
                            <span className="text-gray-600 text-md">
                                {`${currency?.symbol} ${price} ×`}
                                {differenceInDays ? ` ${differenceInDays} ` : ` ${1}`}    night(s)</span>
                            <span>
                                {
                                    differenceInDays ? `${calculatePrice(price, differenceInDays)
                                        }/-` : `${price}/-`
                                }
                            </span>
                        </div>
                        {
                            insuranceDetails?.insurancePercentage && <div
                                className="flex justify-between mb-2 mt-2 group relative px-2">
                                <span className="text-gray-600 text-md flex items-center gap-1">
                                    Liability Insurance
                                    <span className="relative">
                                        <Info color='#14b8a6' className="h-3 w-4 text-gray-500 cursor-help" />
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-64 bg-black text-white text-sm rounded-lg p-2 shadow-lg">
                                            <div className="relative">
                                                <p>
                                                    <span className='block'>
                                                        {insuranceDetails?.provider}
                                                    </span>
                                                    <span>
                                                        {insuranceDetails?.insuranceDescription}
                                                    </span>
                                                </p>
                                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 translate-y-full w-2 h-2 bg-black rotate-45"></div>
                                            </div>
                                        </div>
                                    </span>
                                </span>

                                <span>
                                    {
                                        differenceInDays ? `${calculateInsurance(price, differenceInDays, insuranceDetails?.insurancePercentage)} /-` : `${calculateInsurance(price, 1, insuranceDetails?.insurancePercentage,
                                        )}/-`
                                    }
                                </span>
                            </div>
                        }
                        {
                            gst && <div
                                className="flex justify-between mb-2 mt-2 group relative px-2">
                                <span className="text-gray-600 text-md flex items-center gap-3">
                                    GST
                                </span>
                                <span>
                                    {
                                        differenceInDays ? `${calculateGst(price, differenceInDays, gst)} /-` : `${calculateGst(price, 1, gst
                                        )}/-`
                                    }
                                </span>
                            </div>
                        }
                        <div
                            className="flex justify-between mb-2 mt-2 group relative px-2">
                            <span className="text-gray-600 text-md flex items-center gap-3">
                                Caution Deposit
                            </span>
                            <span>
                                {
                                    `${price} /-`
                                }
                            </span>
                        </div>
                        <AddonsPrice />
                        {appliedCoupon !== null && (
                            <div className="flex justify-between mb-2">
                                <div className='flex'>
                                    <Tag className='text-green-600 h-5' size={14} />
                                    <span className="text-green-600 text-sm pl-1">Discount applied</span>
                                </div>
                                <span className="text-green-600 text-sm">{`-${appliedCoupon?.discountAmount}/-`}</span>
                            </div>
                        )}

                        <div className="flex justify-between pt-4 mt-6 border-t font-semibold text-lg">
                            <span>Total</span>
                            <span>
                                {
                                    currency?.symbol
                                }
                                {
                                    appliedCoupon !== null ?
                                        (`${totalPrice(appliedCoupon?.newPrice, 0, insuranceDetails?.insurancePercentage, gst, true)}/-`)
                                        : (differenceInDays ? `${totalPrice(price, differenceInDays, insuranceDetails?.insurancePercentage, gst, false)}/-`
                                            : `${totalPrice(price, 1, insuranceDetails?.insurancePercentage, gst, false)} /-`)
                                }
                            </span>
                        </div>
                    </div>
                </div>
                <SignupModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
                {/* <SignupModal
                    isOpen={isUploadedModalOpen}
                    onClose={() => setIsCouponModalOpen(false)}
                /> */}
                <Modal
                    isOpen={isUploadedModalOpen}
                    onClose={() => setIsUploadedModalOpen(false)}
                    title={"Please upload document"}
                    maxWidth='600px'
                >
                    <UploadIdProof
                        idProofData={idProof}
                        uploadModalOpen
                        isUploadModalOpen
                        closeUploadModal={() => setIsUploadedModalOpen(false)}
                    />
                </Modal>
            </ThemeProvider>
        </LocalizationProvider>
    );
};