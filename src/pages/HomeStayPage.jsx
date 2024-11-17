import React, { useState } from 'react';
import { Wifi, Car, Coffee, Users } from 'lucide-react';
import { ImageGallery } from '../components/ImageGallery';
import { PropertyDetails } from '../components/HomeStayDetails';
import { BookingCard } from '../components/BookingCard';

const images = [
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=2070',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2070',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2070',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070'
];

const amenities = [
    { icon: <Wifi className="w-5 h-5" />, name: 'Free WiFi' },
    { icon: <Car className="w-5 h-5" />, name: 'Free Parking' },
    { icon: <Coffee className="w-5 h-5" />, name: 'Breakfast Included' },
    { icon: <Users className="w-5 h-5" />, name: 'Family Friendly' },
];

function HomeStayPage() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="min-h-screen mt-[65px] bg-gray-50">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
                <ImageGallery
                    images={images}
                    currentIndex={currentImageIndex}
                    onNext={nextImage}
                    onPrev={prevImage}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    <div className="lg:col-span-2">
                        <PropertyDetails amenities={amenities} />
                    </div>

                    <div>
                        <BookingCard
                            checkIn={checkIn}
                            checkOut={checkOut}
                            onCheckInChange={setCheckIn}
                            onCheckOutChange={setCheckOut}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default HomeStayPage;