import React, { useEffect, useState } from 'react'
import useApi from '../../hooks/useApi';
import userService from '../../services/userServices';
import ReviewHighlights from './ReviewHighlights';
import ReviewMasonry from './ReviewMasonry';
import { MessageSquarePlus, TrendingUp } from 'lucide-react';

function ReviewsSection({homeStayId}) {

    const [reviews, setReviews] = useState([]);

    const {
        // data: bookingStatus,
        // loading: bookingStatusLoading,
        execute: getHomestayReview,
        // reset: bookingStatusReset,
        // error: getbookingStatusError,
    } = useApi(userService.userGetHomestayReview);


    const getHomestayReviewById = async () => {
        const response = await getHomestayReview({homeStayId})
        if(response.success) {
            const limitedReviews = response?.data?.slice(0, 6);
            setReviews(limitedReviews);
            // setReviews(response.data);
        }
        console.log(response.data);
        
    }

    useEffect(() => {
        getHomestayReviewById();
    },[])

    return (
        <div className="py-4">
            {/* <h2 className="text-xl font-semibold">Reviews & Ratings</h2> */}
            {(!reviews?.length) ? (
                <div className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-sm border border-gray-100">
                    <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] bg-center" />   
                    <div className="relative px-6 py-20 flex flex-col items-center justify-center animate-fade-in">
                        <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-[#2DD4BF] to-[#26b8a5] flex items-center justify-center shadow-lg shadow-teal-100 animate-bounce-gentle">
                            <MessageSquarePlus className="text-white" size={32} />
                        </div>
                        
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 animate-slide-up">
                        No Reviews Yet
                        </h3>
                        <p className="text-gray-600 text-center max-w-md animate-slide-up-delayed">
                        Be the first to share your experience and help others discover this amazing stay!
                        </p>
                    </div>
                </div>
                ) : (
                    <div className="space-y-8">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <ReviewHighlights reviews={reviews} />
                        </div>
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="text-[#2DD4BF]" size={24} />
                                <h2 className="text-2xl font-bold text-gray-900">Latest Reviews</h2>
                            </div>
                            </div>
                            <ReviewMasonry reviews={reviews} />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ReviewsSection