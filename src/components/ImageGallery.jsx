import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ImageGallery = ({ images, currentIndex, onNext, onPrev }) => {
    return (
        <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-xl overflow-hidden mb-4 sm:mb-8">
            <img
                src={images[currentIndex]}
                alt="Homestay"
                className="w-full h-full object-fit"
            />
            <button
                onClick={onPrev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-1 sm:p-2 rounded-full bg-white/80 hover:bg-white"
            >
                <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
            <button
                onClick={onNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1 sm:p-2 rounded-full bg-white/80 hover:bg-white"
            >
                <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};