import React from 'react';
import ServiceList from './addons/ServiceList';
import { Modal } from './common/Modal';
import { Button } from './common/Button';
import { formatDate } from '../utils/dateDifference';
import { useSelector } from 'react-redux';
import {
    User,
    Calendar,
    MapPin,
    CreditCard,
    Building,
    Clock,
} from 'lucide-react';
const BookingDetailsModal = ({
    chosenBooking,
    isModalOpen,
    handleClose,
    refundLoading,
    refundInitiate,
    from = 'admin'
}) => {




    const { currency } = useSelector((store) => store?.currency);

    return (
        <Modal
            isOpen={isModalOpen}
            onClose={handleClose}
            maxWidth={"850px"}
        >

            <div className="bg-white rounded-lg w-full max-w-3xl">
                {/* Header */}
                <div className="px-4 ">
                    <h2 className="text-xl text-center font-semibold">{chosenBooking[0].homestayName}</h2>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Image */}
                    <div className="aspect-video w-full overflow-hidden rounded-lg">
                        <img
                            src={chosenBooking[0].homestayImage}
                            alt={chosenBooking[0].homestayName}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Guest Info */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 text-gray-600">
                                <User className="w-5 h-5" />
                                <span className="font-medium">Guest Name</span>
                            </div>
                            <p className="mt-1 ml-7">{chosenBooking[0].userName}</p>
                        </div>

                        {/* Check-in */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 text-gray-600">
                                <Calendar className="w-5 h-5" />
                                <span className="font-medium">Check In</span>
                            </div>
                            <p className="mt-1 ml-7">
                                {formatDate(chosenBooking[0].checkIn)}
                            </p>
                        </div>

                        {/* Check-out */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 text-gray-600">
                                <Calendar className="w-5 h-5" />
                                <span className="font-medium">Check Out</span>
                            </div>
                            <p className="mt-1 ml-7">
                                {formatDate(chosenBooking[0].checkOut)}
                            </p>
                        </div>

                        {/* Amount */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 text-gray-600">
                                <CreditCard className="w-5 h-5" />
                                <span className="font-medium">Amount</span>
                            </div>
                            <p className="mt-1 ml-7">
                                {currency?.symbol}
                                {chosenBooking[0].amount.toLocaleString()}
                            </p>
                        </div>

                        {/* Status */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 text-gray-600">
                                <Clock className="w-5 h-5" />
                                <span className="font-medium">Status</span>
                            </div>
                            <p className="mt-1 ml-7">
                                {chosenBooking[0].isCheckedIn ? 'Checked In' : 'Not Checked In'}
                            </p>
                        </div>

                        {/* Booking ID */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 text-gray-600">
                                <Building className="w-5 h-5" />
                                <span className="font-medium">Booking ID</span>
                            </div>
                            <p className="mt-1 ml-7 text-sm">{chosenBooking[0]._id}</p>
                        </div>

                        {/* Address */}
                        <div className="bg-gray-50 p-4 rounded-lg lg:col-span-2">
                            <div className="flex items-center gap-2 text-gray-600">
                                <MapPin className="w-5 h-5" />
                                <span className="font-medium">Address</span>
                            </div>
                            <p className="mt-1 ml-7">
                                {chosenBooking[0].homestayAddress.street}, {chosenBooking[0].homestayAddress.city},
                                <br />
                                {chosenBooking[0].homestayAddress.district}, {chosenBooking[0].homestayAddress.state},
                                <br />
                                {chosenBooking[0].homestayAddress.zip}
                            </p>
                        </div>

                        {/* Payment ID */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 text-gray-600">
                                <CreditCard className="w-5 h-5" />
                                <span className="font-medium">Payment ID</span>
                            </div>
                            <p className="mt-1 ml-7 text-sm">{chosenBooking[0].paymentId}</p>
                        </div>
                        {
                            chosenBooking[0]?.isRefunded && <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <CreditCard className="w-5 h-5" />
                                    <span className="font-medium">Order ID</span>
                                </div>
                                <p className="mt-1 ml-7 text-sm">{chosenBooking[0].orderId}</p>
                            </div>
                        }
                        {
                            chosenBooking[0]?.isRefunded && <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <CreditCard className="w-5 h-5" />
                                    <span className="font-medium">Refund ID</span>
                                </div>
                                <p className="mt-1 ml-7 text-sm">{chosenBooking[0].refundId}</p>
                            </div>
                        }
                        {
                            chosenBooking[0]?.isRefunded && <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Calendar className="w-5 h-5" />
                                    <span className="font-medium">Refunded Out</span>
                                </div>
                                <p className="mt-1 ml-7">
                                    {formatDate(chosenBooking[0].refundedAt)}
                                </p>
                            </div>
                        }
                    </div>
                    <div>
                        {
                            chosenBooking[0]?.addOns && <ServiceList
                                data={chosenBooking[0]?.addOns}
                            />
                        }

                    </div>
                    {
                        (from === 'admin' && !chosenBooking[0]?.isRefunded) && <Button
                            onClick={() => refundInitiate()}
                            className="w-full"
                            isLoading={refundLoading}
                        >
                            Initiate Refund
                        </Button>
                    }
                </div>
            </div>
        </Modal>
    );
}

export default BookingDetailsModal;
