import React, { useEffect, useState } from 'react';
import FilterSidebar from '../components/FilterSidebar';
import HomeStayCard from '../components/common/HomeStayCard';
import { Modal } from '../components/common/Modal';
import useApi from '../hooks/useApi';
import userService from '../services/userServices';
import NoResults from '../components/common/NoResults';
import HomestayCardSkeleton from '../components/HomestayCardSkeleton';
import { useSearchParams, useNavigate } from 'react-router-dom';

function AllHomeStaysPage() {
    const {
        data: categories,
        execute: getAllCategories,
    } = useApi(userService.userGetAllCategory);

    const {
        loading: homestaysLoading,
        data: homeStays,
        execute: getAllHomeStays,
        error: homeStayError,
        reset
    } = useApi(userService.userGetAllHomestays);


    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 15000]);
    const [selectedRooms, setSelectedRooms] = useState([0]);
    const [selectedGuests, setSelectedGuests] = useState([0]);
    const [selectedBathrooms, setselectedBathrooms] = useState([0]);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");

    const navigate = useNavigate();

    useEffect(() => {
        const filters = {
            category: selectedCategories,
            price: priceRange,
            numberOfGuest: selectedGuests[0],
            numberOfRooms: selectedRooms[0],
            numberOfBathrooms: selectedBathrooms[0]
        };
        if (id && selectedCategories.length === 0) {
            filters.category = [id];
        }
        getAllHomeStays(filters);
    }, [
        selectedCategories,
        priceRange,
        selectedRooms,
        selectedGuests,
        selectedBathrooms,
    ]);

    useEffect(() => {
        if (id && name) {
            setSelectedCategories([id]);
        }
    }, [id, name]);

    const resetFilters = () => {
        if (id && name) {
            navigate("/homestays/all")
        }
        getAllHomeStays();
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
        getAllCategories();
    }, [])

    console.log(homeStays);


    return (
        <div className="min-h-screen mt-16 bg-gray-50">
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
                                if (homeStayError) {
                                    reset();
                                }
                                setSelectedCategories(prev =>
                                    prev.includes(category)
                                        ? prev.filter(c => c !== category)
                                        : [...prev, category]
                                );
                            }}
                            onPriceChange={setPriceRange}
                            onRoomsChange={(room) => {
                                if (homeStayError) {
                                    reset();
                                }
                                setSelectedRooms([room])
                            }}

                            onGuestsChange={(guest) => {
                                if (homeStayError) {
                                    reset();
                                }
                                setSelectedGuests([guest])
                            }}
                            onBathRoomsChange={(room) => {
                                if (homeStayError) {
                                    reset();
                                }
                                setselectedBathrooms([room])
                            }}
                            isApply={false}
                            resetFilters={resetFilters}
                        />
                    </div>

                    <div className='w-full px-4 sm:px-0 md:w-9/12 md:ml-auto'>
                        <button
                            className="lg:hidden md:hidden mb-4 bg-turquoise-600 text-white py-2 px-4 rounded"
                            onClick={() => setIsFilterModalOpen(true)}
                        >
                            Open Filters
                        </button>

                        <div className={`${homeStayError ? "flex justify-center items-center h-[60vh] " : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}`}>
                            {
                                homestaysLoading ? [...Array(12)].map((_, index) => (
                                    <HomestayCardSkeleton key={index} />
                                )) :
                                    homeStayError ?
                                        <div className='bg-white-300 mt-28'>
                                            <NoResults
                                                resetfilter={resetFilters}
                                            />
                                        </div>
                                        :
                                        homeStays ?
                                            homeStays?.data?.map((homestay) => (
                                                <HomeStayCard key={homestay?._id} homestay={homestay} />
                                            )) : null
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
                                if (homeStayError) {
                                    reset();
                                }
                                setSelectedCategories(prev =>
                                    prev.includes(category)
                                        ? prev.filter(c => c !== category)
                                        : [...prev, category]
                                );
                            }}
                            onPriceChange={setPriceRange}
                            onRoomsChange={(room) => {
                                setSelectedRooms([room])
                                if (homeStayError) {
                                    reset();
                                }
                            }}

                            onGuestsChange={(guest) => {
                                setSelectedGuests([guest])
                                if (homeStayError) {
                                    reset();
                                }
                            }}
                            onBathRoomsChange={(room) => {
                                setselectedBathrooms([room])
                                if (homeStayError) {
                                    reset();
                                }
                            }}
                            resetFilters={resetFilters}
                            isApply={false}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default AllHomeStaysPage;