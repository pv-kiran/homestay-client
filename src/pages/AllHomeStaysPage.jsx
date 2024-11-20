import React, { useEffect, useState } from 'react';
import FilterSidebar from '../components/FilterSidebar';
import HomeStayCard from '../components/common/HomeStayCard';
import { Modal } from '../components/common/Modal';
import useApi from '../hooks/useApi';
import userService from '../services/userServices';
import NoResults from '../components/common/NoResults';
import HomestayCardSkeleton from '../components/HomestayCardSkeleton';

function AllHomeStaysPage() {


    const {
        loading,
        data: categories,
        execute: getAllCategories,
        reset,
        error
    } = useApi(userService.userGetAllCategory);

    const {
        loading: homeStayLoading,
        data: homeStays,
        execute: getAllHomeStays,
        reset: homeStayReset,
        error: homeStayError
    } = useApi(userService.userGetAllHomestays);




    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 15000]);
    const [selectedRooms, setSelectedRooms] = useState([0]);
    const [selectedGuests, setSelectedGuests] = useState([0]);
    const [selectedBathrooms, setselectedBathrooms] = useState([0]);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    useEffect(() => {
        getAllHomeStays({
            category: selectedCategories,
            price: priceRange,
            numberOfGuest: selectedGuests[0],
            numberOfRooms: selectedRooms[0],
            numberOfBathrooms: selectedBathrooms[0]
        })
    }, [
        selectedCategories,
        priceRange,
        selectedRooms,
        selectedGuests,
        selectedBathrooms
    ]);

    const resetFilters = () => {
        setSelectedCategories([]);
        setPriceRange([0, 15000]);
        setSelectedRooms([0]);
        setSelectedGuests([0]);
        setselectedBathrooms([0]);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        console.log(homeStays)
    }, [homeStays])

    useEffect(() => {
        getAllCategories();
    }, [])

    if (homeStayError) {
        return <NoResults resetfilter={resetFilters} />
    }

    return (
        <div className="min-h-screen mt-16">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* <h1 className="text-3xl font-bold text-gray-900 mb-8">Find Your Perfect Stay</h1> */}

                <div className="flex gap-8">
                    <div className="hidden  top-[100px] md:block"
                    >
                        <FilterSidebar
                            categories={categories?.data ? categories.data : []}
                            selectedCategories={selectedCategories}
                            priceRange={priceRange}
                            rooms={selectedRooms}
                            guests={selectedGuests}
                            bathRooms={selectedBathrooms}
                            onCategoryChange={(category) => {
                                setSelectedCategories(prev =>
                                    prev.includes(category)
                                        ? prev.filter(c => c !== category)
                                        : [...prev, category]
                                );
                            }}
                            onPriceChange={setPriceRange}
                            onRoomsChange={(room) => {
                                setSelectedRooms([room])
                            }}

                            onGuestsChange={(guest) => {
                                setSelectedGuests([guest])
                            }}
                            onBathRoomsChange={(room) => {
                                setselectedBathrooms([room])
                            }}
                            isApply={false}
                            resetFilters={resetFilters}
                        />
                    </div>

                    <div className=' md:w-9/12 md:ml-auto'>
                        <button
                            className="lg:hidden mb-4 bg-turquoise-600 text-white py-2 px-4 rounded"
                            onClick={() => setIsFilterModalOpen(true)}
                        >
                            Open Filters
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {
                                homeStays ?
                                    homeStays?.data?.map((homestay) => (
                                        <HomeStayCard key={homestay?.id} homestay={homestay} />
                                    )) : [...Array(12)].map((_, index) => (
                                        <HomestayCardSkeleton key={index} />
                                    ))
                            }
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
                            categories={categories?.data ? categories.data : []}
                            selectedCategories={selectedCategories}
                            priceRange={priceRange}
                            rooms={selectedRooms}
                            guests={selectedGuests}
                            bathRooms={selectedBathrooms}
                            onCategoryChange={(category) => {
                                setSelectedCategories(prev =>
                                    prev.includes(category)
                                        ? prev.filter(c => c !== category)
                                        : [...prev, category]
                                );
                            }}
                            onPriceChange={setPriceRange}
                            onRoomsChange={(room) => {
                                setSelectedRooms([room])
                            }}

                            onGuestsChange={(guest) => {
                                setSelectedGuests([guest])
                            }}
                            onBathRoomsChange={(room) => {
                                setselectedBathrooms([room])
                            }}
                            isApply={false}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default AllHomeStaysPage;