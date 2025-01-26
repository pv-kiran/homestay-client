import React, { useState, useEffect, useRef } from "react";
import adminService from "../services/adminServices";
import useApi from "../hooks/useApi";
import { Table } from "../components/common/table/Table";
import { toast } from "react-toastify";
import dayjs from 'dayjs';
import { Modal } from "../components/common/Modal";

import {
    User,
    Calendar,
    MapPin,
    CreditCard,
    Building,
    Clock,
    UserCircle
} from 'lucide-react';
import { Button } from "../components/common/Button";
import { Loader } from "../components/common/Loader";
import { EmptyState } from "../components/common/EmptyState";


const BookingsPage = () => {
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKey, setSearchKey] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [chosenBooking, setchosenBooking] = useState([]);
    const timer = useRef(null);

    const [isShowLoading, setIsShowLoading] = useState(true);


    const {
        data: allBookings,
        execute: getAllBookings,
        loading
    } = useApi(adminService.adminGetAllBookings);

    const handlePageNumber = (page) => {
        setCurrentPage(page);
    }

    const handlePageSize = (size) => {
        setPageSize(size);
    }

    const formatDate = (date) => {
        return dayjs(date).format('DD-MM-YYYY')
    }

    const handleView = (id) => {
        setIsModalOpen(true);
        const chosenBooking = allBookings?.data.filter((booking) => booking?._id === id);
        console.log(chosenBooking)
        setchosenBooking(chosenBooking)
    };




    const getActions = (item) => [
        {
            icon: "view",
            onClick: () => handleView(item._id),
            title: "View",
        }
    ];

    const bookingColumns = [
        {
            header: "User",
            accessor: "userName",
            sortable: true,
        },
        {
            header: "Homestay",
            accessor: "homestayName",
            sortable: true,
        },
        {
            header: "CheckIN",
            accessor: (data) => (
                <span>
                    {formatDate(data?.checkIn)}
                </span>
            ),
            sortable: true,
        },
        {
            header: "CheckOut",
            accessor: (data) => (
                <span>
                    {formatDate(data?.checkOut)}
                </span>
            ),
            sortable: true,
        },
        {
            header: "Status",
            accessor: (user) => (
                <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${!user?.isDisabled
                        ? "bg-turquoise-200 text-turquoise-500"
                        : "bg-gray-100 text-gray-800"
                        }`}>
                    {!user?.isDisabled ? "Paid" : "Disabled"}
                </span>
            ),
            sortable: true,
        },
    ];

    const handleClose = () => {
        setIsModalOpen(false);
    };


    const handleSearch = (query) => {
        setIsShowLoading(false)
        setSearchKey(query);
    }


    useEffect(() => {
        getAllBookings({
            pagePerData: pageSize,
            pageNumber: currentPage,
            searchParams: searchKey
        });
    }, [pageSize, currentPage]);


    useEffect(() => {
        if (!timer.current) {
            getAllBookings({
                pagePerData: pageSize,
                pageNumber: currentPage,
                searchParams: searchKey
            });
        }
        if (timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
            getAllBookings({
                pagePerData: pageSize,
                pageNumber: currentPage,
                searchParams: searchKey
            });
        }, 500);
    }, [searchKey]);



    return (
        <div>
            {
                (loading && isShowLoading) && <div className='mt-2 h-[70vh] flex items-center justify-center'>
                    <Loader />
                </div>
            }
            <div className="min-h-screen my-4">
                {allBookings?.data?.length > 0 ? (
                    <Table
                        title="Booking Management"
                        subtitle="Manage your bookings"
                        columns={bookingColumns}
                        data={allBookings?.data}
                        actions={getActions}
                        onSearch={handleSearch}
                        initialSort={{ field: "title", direction: "asc" }}
                        currentPage={currentPage}
                        onPageChange={handlePageNumber}
                        onPageSizeChange={handlePageSize}
                        pageSize={pageSize}
                        totalItems={allBookings?.totalPages}
                    />
                ) :
                    <div>
                        {
                            !loading && <EmptyState
                                title="Empty Homestays"
                                message="Your homestay list is currently empty."
                                icon={<UserCircle className="w-12 h-12 text-gray-400" />}
                            />
                        }
                    </div>
                }
            </div>
            {
                chosenBooking?.length > 0 ? <Modal
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
                                    <p className="mt-1 ml-7">₹{chosenBooking[0].amount.toLocaleString()}</p>
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
                            </div>
                            <Button className="w-full">Initiate Refund</Button>
                        </div>
                    </div>
                </Modal> : null
            }

        </div>
    );
}

export default BookingsPage;
