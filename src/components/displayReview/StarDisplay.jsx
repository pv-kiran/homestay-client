import { Star } from 'lucide-react'
import React from 'react'

function StarDisplay({ rating, size = 16, className = '' }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={size}
        className={`${
          star <= rating
            ? 'fill-[#FFD700] text-[#FFD700]'
            : 'text-gray-300'
        } transition-colors duration-300`}
      />
    ))}
  </div>
  )
}

export default StarDisplay