import React, { useEffect, useState } from 'react';
import FilterSidebar from '../components/FilterSidebar';
import HomeStayCard from '../components/common/HomeStayCard';
import { Modal } from '../components/common/Modal';


// Sample data
const SAMPLE_HOMESTAYS = [
    {
        id: 1,
        title: "Mountain View Cabin",
        location: "Aspen, Colorado",
        price: 250,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
        rooms: 3,
        guests: 6
    },
    {
        id: 2,
        title: "Oceanfront Villa",
        location: "Malibu, California",
        price: 400,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2",
        rooms: 4,
        guests: 8
    },
    {
        id: 3,
        title: "Downtown Loft",
        location: "New York City",
        price: 300,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
        rooms: 2,
        guests: 4
    },
    {
        id: 1,
        title: "Mountain View Cabin",
        location: "Aspen, Colorado",
        price: 250,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
        rooms: 3,
        guests: 6
    },
    {
        id: 2,
        title: "Oceanfront Villa",
        location: "Malibu, California",
        price: 400,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2",
        rooms: 4,
        guests: 8
    },
    {
        id: 3,
        title: "Downtown Loft",
        location: "New York City",
        price: 300,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
        rooms: 2,
        guests: 4
    },
    {
        id: 1,
        title: "Mountain View Cabin",
        location: "Aspen, Colorado",
        price: 250,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
        rooms: 3,
        guests: 6
    },
    {
        id: 2,
        title: "Oceanfront Villa",
        location: "Malibu, California",
        price: 400,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2",
        rooms: 4,
        guests: 8
    },
    {
        id: 3,
        title: "Downtown Loft",
        location: "New York City",
        price: 300,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
        rooms: 2,
        guests: 4
    }
];

const CATEGORIES = ["Beachfront", "Mountain", "City", "Countryside", "Lake", "Desert"];

function HomeStays() {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [selectedGuests, setSelectedGuests] = useState([]);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    useEffect(() => {
        console.log(selectedCategories, priceRange, selectedRooms, selectedGuests);
    }, [selectedCategories, priceRange, selectedRooms, selectedGuests]);

    return (
        <div className="min-h-screen mt-16">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Find Your Perfect Stay</h1>

                <div className="flex gap-8">
                    {/* Filter Sidebar for Larger Screens */}
                    <div className="hidden sticky top-10 lg:block"
                    >
                        <FilterSidebar
                            categories={CATEGORIES}
                            selectedCategories={selectedCategories}
                            priceRange={priceRange}
                            rooms={selectedRooms}
                            guests={selectedGuests}
                            onCategoryChange={(category) => {
                                setSelectedCategories(prev =>
                                    prev.includes(category)
                                        ? prev.filter(c => c !== category)
                                        : [...prev, category]
                                );
                            }}
                            onPriceChange={setPriceRange}
                            onRoomsChange={(room) => {
                                setSelectedRooms(prev =>
                                    prev.includes(room)
                                        ? prev.filter(r => r !== room)
                                        : [...prev, room]
                                );
                            }}
                            onGuestsChange={(guest) => {
                                setSelectedGuests(prev =>
                                    prev.includes(guest)
                                        ? prev.filter(g => g !== guest)
                                        : [...prev, guest]
                                );
                            }}
                            isApply={false}
                        />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Button to Open Filter Modal on Small Screens */}
                        <button
                            className="lg:hidden mb-4 bg-blue-600 text-white py-2 px-4 rounded"
                            onClick={() => setIsFilterModalOpen(true)}
                        >
                            Open Filters
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {SAMPLE_HOMESTAYS.map((homestay) => (
                                <HomeStayCard
                                    key={homestay?.id} homestay={homestay}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Modal for Smaller Screens */}
            <Modal
                isOpen={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                maxWidth=''
            >
                <div className="inset-0 bg-black bg-opacity-25"></div>
                <div className="inset-0 flex items-center justify-center px-0 py-4 sm:p-4 ">
                    <div className="w-full max-w-md bg-white rounded-lg p-6">
                        <FilterSidebar
                            categories={CATEGORIES}
                            selectedCategories={selectedCategories}
                            priceRange={priceRange}
                            rooms={selectedRooms}
                            guests={selectedGuests}
                            onCategoryChange={(category) => {
                                setSelectedCategories(prev =>
                                    prev.includes(category)
                                        ? prev.filter(c => c !== category)
                                        : [...prev, category]
                                );
                            }}
                            onPriceChange={setPriceRange}
                            onRoomsChange={(room) => {
                                setSelectedRooms(prev =>
                                    prev.includes(room)
                                        ? prev.filter(r => r !== room)
                                        : [...prev, room]
                                );
                            }}
                            onGuestsChange={(guest) => {
                                setSelectedGuests(prev =>
                                    prev.includes(guest)
                                        ? prev.filter(g => g !== guest)
                                        : [...prev, guest]
                                );
                            }}
                            isApply={isFilterModalOpen}
                            closeModal={() => { setIsFilterModalOpen(false) }}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default HomeStays;