import React from 'react';

const CategorySkeleton = () => {
    return (
        <div className="animate-pulse relative overflow-hidden rounded-3xl bg-gray-200 min-h-[320px]">
            {/* Shimmer Effect Overlay */}
            <div className="absolute inset-0">
                <div className="h-full w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"
                    style={{ backgroundSize: '200% 100%' }} />
            </div>

            <div className="relative p-8 h-full flex flex-col items-center text-center">
                {/* Icon Skeleton */}
                <div className="mb-6">
                    <div className="bg-gray-300 p-4 rounded-full h-[72px] w-[72px]" />
                </div>

                {/* Content Skeleton */}
                <div className="space-y-4 w-full">
                    <div className="h-6 bg-gray-300 rounded-lg w-3/4 mx-auto" />
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-full" />
                        <div className="h-4 bg-gray-300 rounded w-5/6 mx-auto" />
                        <div className="h-4 bg-gray-300 rounded w-4/6 mx-auto" />
                    </div>
                </div>

                {/* Button Skeleton */}
                <div className="mt-auto pt-6">
                    <div className="h-10 bg-gray-300 rounded-full w-32 mx-auto" />
                </div>
            </div>
        </div>
    );
};

export default CategorySkeleton;