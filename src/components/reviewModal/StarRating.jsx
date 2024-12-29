import React from 'react'
import { Star } from 'lucide-react';


function StarRating({ rating, hoveredRating, onRate, onHover }) {
  return (
    <div className="flex items-center justify-center mb-6">
        {[1, 2, 3, 4, 5].map((star) => (
        <button
            key={star}
            type="button"
            onClick={() => onRate(star)}
            onMouseEnter={() => onHover(star)}
            onMouseLeave={() => onHover(0)}
            className="p-1"
        >
            <Star
            size={32}
            className={`transition-colors ${
                star <= (hoveredRating || rating)
                ? 'fill-[#FFD700] text-[#FFD700]'
                : 'text-gray-300'
            }`}
            />
        </button>
        ))}
    </div>
  )
}

export default StarRating