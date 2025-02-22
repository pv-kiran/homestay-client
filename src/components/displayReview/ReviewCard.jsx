import { User } from 'lucide-react';
import React from 'react'
import StarDisplay from './StarDisplay';

function ReviewCard({review}) {

    const { userId, rating, reviewText, createdAt } = review;

    return (
        <div className="group bg-gray-50 hover:bg-white rounded-xl p-6 transition-all duration-300 hover:shadow-lg border border-transparent hover:border-gray-100">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-xl bg-white shadow-sm p-0.5">
                {userId?.profilePic ? (
                    <img
                        src={userId?.profilePic}
                        alt={`https://res.cloudinary.com/djd2rpgil/image/upload/v1735479438/homestay-landing_bg/yqpmgbvksvrvvuroguqc.png`}
                        className="w-full h-full rounded-[10px] object-cover"
                    />
                ) : (
                    <div className="w-full h-full rounded-[10px] bg-gradient-to-br from-[#2DD4BF] to-[#26b8a5] flex items-center justify-center">
                        <User className="text-white" size={20} />
                    </div>
                )}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 mb-2">{userId?.fullName}</h3>
            <StarDisplay rating={rating} size={18} />
            <p className="mt-3 text-gray-600 leading-relaxed">{reviewText}</p>
            <div className="mt-4 text-sm text-gray-500">
              {new Date(createdAt).toLocaleDateString('en-US', { 
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
          </div>
        </div>
      </div>
    )
}

export default ReviewCard