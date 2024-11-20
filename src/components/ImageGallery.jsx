import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ImageGallery = ({
    images,
    currentIndex,
    onNext,
    onPrev,
}) => {
    const getDisplayImages = () => {
        const totalImages = images.length;
        const prev = (currentIndex - 1 + totalImages) % totalImages;
        const next = (currentIndex + 1) % totalImages;
        return [prev, currentIndex, next];
    };

    return (
        <div className="relative w-full h-[350px] md:h-[450px] overflow-hidden mb-8">
            <div className="absolute inset-0 flex items-center justify-center gap-4 px-4">
                {getDisplayImages().map((index, i) => (
                    <div
                        key={index}
                        className={`transition-all duration-500 ease-in-out ${i === 1
                            ? 'w-[50%] h-full z-20 opacity-100'
                            : 'w-[25%] h-[80%] opacity-70 hover:opacity-80'
                            }`}
                    >
                        <img
                            src={images[index]}
                            alt={`Gallery image ${index + 1}`}
                            className={`w-full h-full object-cover rounded-xl ${i === 1 ? 'shadow-2xl' : 'shadow-lg'
                                }`}
                        />
                    </div>
                ))}
            </div>

            <button
                onClick={onPrev}
                className="absolute left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white shadow-lg z-30 transition-all duration-200 hover:scale-105"
                aria-label="Previous image"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            <button
                onClick={onNext}
                className="absolute right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white shadow-lg z-30 transition-all duration-200 hover:scale-105"
                aria-label="Next image"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                            ? 'bg-white w-6'
                            : 'bg-white/50 hover:bg-white/70'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};