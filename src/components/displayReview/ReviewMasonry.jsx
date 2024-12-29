import React from 'react'
import ReviewCard from './ReviewCard';

function ReviewMasonry({ reviews }) {

    const leftColumn = reviews.filter((_, i) => i % 2 === 0);
    const rightColumn = reviews.filter((_, i) => i % 2 === 1);

  return (
    <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
                {leftColumn.map((review, index) => (
                <ReviewCard key={index} review={review} />
                ))}
            </div>
            <div className="space-y-6">
                {rightColumn.map((review, index) => (
                <ReviewCard key={index} review={review} />
                ))}
            </div>
        </div>
    </div>
  )
}

export default ReviewMasonry