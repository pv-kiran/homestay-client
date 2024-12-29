import { Award, ThumbsUp, Users } from 'lucide-react';
import React from 'react'
import StarDisplay from './StarDisplay';

function ReviewHighlights({reviews}) {

    const averageRating = reviews?.reduce((acc, curr) => acc + curr?.rating, 0) / reviews?.length;
    const fiveStarReviews = reviews?.filter(review => review?.rating === 5)?.length;
    const recommendationRate = Math?.round((fiveStarReviews / reviews?.length) * 100);
  
    const highlights = [
      {
        icon: <Award className="text-[#2DD4BF]" size={24} />,
        value: averageRating?.toFixed(1),
        label: 'Average Rating',
        extra: <StarDisplay rating={Math?.round(averageRating)} className="mt-1" />
      },
      {
        icon: <Users className="text-[#2DD4BF]" size={24} />,
        value: reviews?.length,
        label: 'Total Reviews',
        extra: <div className="h-6" />
      },
      {
        icon: <ThumbsUp className="text-[#2DD4BF]" size={24} />,
        value: `${recommendationRate}%`,
        label: 'Would Recommend',
        extra: <div className="h-6" />
      }
    ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {highlights?.map((item, index) => (
        <div
            key={index}
            className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
        >
            <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
            {item?.icon}
            </div>
            <div>
            <div className="text-2xl font-bold text-gray-900">{item?.value}</div>
            <div className="text-sm text-gray-600">{item?.label}</div>
            {item?.extra}
            </div>
        </div>
        ))}
    </div>
  )
}

export default ReviewHighlights