import React, { useState, useEffect, useRef } from "react";
import adminService from "../services/adminServices";
import useApi from "../hooks/useApi";
import { Table } from "../components/common/table/Table";
import { toast } from "react-toastify";
import dayjs from 'dayjs';

import {
    UserCircle
} from 'lucide-react';
import { Loader } from "../components/common/Loader";
import { EmptyState } from "../components/common/EmptyState";
import BookingDetailsModal from "../components/BookingDetailsModal";


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

    const {
        execute: initiateRefund,
        loading: refundLoading,
        error: refundError
    } = useApi(adminService.adminRefundInitiate);

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
            header: "Checkin",
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

    const refundInitiate = async () => {
        const result = await initiateRefund({ bookingId: chosenBooking[0]?._id })
        if (result?.success) {
            toast.success(result?.message);
            setIsModalOpen(false)
            getAllBookings({
                pagePerData: pageSize,
                pageNumber: currentPage,
                searchParams: searchKey
            });
        }
    }


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

    useEffect(() => {
        if (refundError) {
            toast.error(refundError?.message)
        }
    }, [refundError])


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
                chosenBooking?.length > 0 ?
                    <BookingDetailsModal
                        chosenBooking={chosenBooking}
                        isModalOpen={isModalOpen}
                        handleClose={handleClose}
                        refundLoading={refundLoading}
                        refundInitiate={refundInitiate}
                    />
                    : null
            }

        </div>
    );
}

export default BookingsPage;
