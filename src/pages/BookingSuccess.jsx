import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, CreditCard, Home, User, Clock } from 'lucide-react';
import useApi from '../hooks/useApi';
import userService from '../services/userServices';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';


function BookingSuccess() {

  const {
    // data,
    loading,
    executeBlob: getReceipt,
    reset,
    error,
  } = useApi(userService.userDownloadReceipt);

  const location = useLocation();
  const { bookingResponse } = location.state || {};
  const { currency } = useSelector((store) => store?.currency);

  const { data } = bookingResponse;

  const [showPaymentId, setShowPaymentId] = useState(false);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const handleDownloadReceipt = async () => {
    try {
      const response = await getReceipt(data?._id);

      if (!response || !response.data) {
        throw new Error('No response data received');
      }

      const pdfBlob = response.data;

      if (!(pdfBlob instanceof Blob)) {
        throw new Error('Invalid response type - expected Blob');
      }

      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute("download", 'receipt.pdf');

      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      toast.error("Please try again later")
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-7">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-[#14b8a6]/20 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-10 w-10 text-[#14b8a6]" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Booking Confirmed!</h1>
          <p className="mt-2 text-gray-600">
            Thank you for choosing us. Your booking has been successfully confirmed.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          {/* Order ID Banner */}
          <div className="bg-black text-white px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-300">Order ID</p>
                <p className="text-lg font-semibold">{data?.orderId}</p>
              </div>
              <Clock className="h-6 w-6" />
            </div>
          </div>

          {/* Booking Details */}
          <div className="px-6 py-6 space-y-6">
            {/* Homestay and User Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <Home className="h-6 w-6 text-[#14b8a6] mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Stay details</p>
                  <p className="font-semibold text-gray-900">{`${data?.homestayName || ''}, ${data?.stayCity || ''}, ${data?.stayState || ''}`}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <User className="h-6 w-6 text-[#14b8a6] mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Booked by</p>
                  <p className="font-semibold text-gray-900">{data?.userName}</p>
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="grid md:grid-cols-2 gap-6 border-t border-gray-200 pt-6">
              <div className="flex items-start space-x-3">
                <Calendar className="h-6 w-6 text-[#14b8a6] mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Check-in</p>
                  <p className="font-semibold text-gray-900">
                    {formatDate(data?.checkIn)}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Calendar className="h-6 w-6 text-[#14b8a6] mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Check-out</p>
                  <p className="font-semibold text-gray-900">
                    {formatDate(data?.checkOut)}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-start space-x-3">
                <CreditCard className="h-6 w-6 text-[#14b8a6] mt-1" />
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500">Payment ID</p>
                      <div className="flex items-center space-x-2">
                        <p className="font-semibold text-gray-900">
                          {showPaymentId ? data?.paymentId : '••••••••••••••'}
                        </p>
                        <button
                          onClick={() => setShowPaymentId(!showPaymentId)}
                          className="text-sm text-[#14b8a6] hover:text-[#14b8a6]/80"
                        >
                          {showPaymentId ? 'Hide' : 'Show'}
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Amount Paid</p>
                      <p className="text-xl font-bold text-gray-900">
                        {currency?.symbol} {data?.price?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-4 justify-end">
              <button
                className="px-4 bg-turquoise-600 text-white py-2 rounded-lg hover:bg-turquoise-700 transition-colors"
                onClick={handleDownloadReceipt}
              >
                Download Receipt
              </button>
              <button
                className="px-4 py-2 bg-black text-white rounded-lg 
                  hover:bg-black/80 transition-colors"
                onClick={() => navigate("/mybookings")}
              >
                View Bookings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingSuccess