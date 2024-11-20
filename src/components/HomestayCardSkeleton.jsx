import React from 'react';

const HomestayCardSkeleton = () => {
    return (
        <div className="group">
            {/* Image skeleton */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                <div className="absolute inset-0">
                    <div
                        className="h-full w-full bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 animate-shimmer"
                        style={{ backgroundSize: '200% 100%' }}
                    />
                </div>
            </div>

            {/* Content skeleton */}
            <div className="mt-3">
                <div className="flex justify-between items-start gap-3">
                    {/* Title skeleton */}
                    <div className="h-6 bg-gray-200 rounded w-3/5" />

                    {/* Price skeleton */}
                    <div className="flex items-center gap-1">
                        <div className="h-6 bg-gray-200 rounded w-16" />
                        <div className="h-4 bg-gray-200 rounded w-10" />
                    </div>
                </div>

                {/* Location skeleton */}
                <div className="mt-1 h-4 bg-gray-200 rounded w-2/5" />
            </div>
        </div>
    );
};

export default HomestayCardSkeleton;