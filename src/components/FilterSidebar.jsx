import React from 'react';

export default function FilterSidebar({
    categories,
    selectedCategories,
    priceRange,
    rooms,
    guests,
    bathRooms,
    onCategoryChange,
    onPriceChange,
    onRoomsChange,
    onGuestsChange,
    onBathRoomsChange,
    isApply,
    closeModal
}) {
    console.log(priceRange[1])
    return (
        <div className="w-full md:w-72 p-6 rounded-lg sm:shadow-md sm:h-[80vh]  sm:top-4 overflow-y-scroll">
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Categories</h3>
                <div className="space-y-2">
                    {categories.map((category) => (
                        <label key={category?._id} className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(category?._id)}
                                onChange={() => onCategoryChange(category?._id)}
                                className="rounded border-gray-300 text-turquoise-600 focus:ring-turquoise-500"
                            />
                            <span className="text-gray-700">{category?.categoryName}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Price Range</h3>
                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <input
                            type="range"
                            min="0"
                            max="15000"
                            value={priceRange[1]}
                            onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value)])}
                            className="w-full accent-turquoise-500 hover:cursor-pointer"
                        />
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 font-semibold">
                        <span>₹{priceRange[0]}</span>
                        <span>₹{priceRange[1]?.toLocaleString('en-IN')}</span>
                    </div>
                </div>
            </div>

            {/* Rooms */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Number of Rooms</h3>
                <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                        <button
                            key={num}
                            onClick={() => onRoomsChange(num)}
                            className={`px-3 py-1 rounded-full font-semibold text-sm ${rooms.includes(num)
                                ? 'bg-turquoise-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            {num}+
                        </button>
                    ))}
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Number of BathRooms</h3>
                <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                        <button
                            key={num}
                            onClick={() => onBathRoomsChange(num)}
                            className={`px-3 py-1 rounded-full font-semibold text-sm ${bathRooms.includes(num)
                                ? 'bg-turquoise-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            {num}+
                        </button>
                    ))}
                </div>
            </div>

            {/* Guests */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Number of Guests</h3>
                <div className="grid grid-cols-3 gap-2">
                    {[2, 4, 6, 8, 10].map((num) => (
                        <button
                            key={num}
                            onClick={() => onGuestsChange(num)}
                            className={`px-3 py-1 rounded-full font-semibold text-sm ${guests.includes(num)
                                ? 'bg-turquoise-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            {num}+
                        </button>
                    ))}
                </div>
            </div>



            {
                isApply ? <button
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={closeModal}
                >
                    Apply filters
                </button> : <button
                    className="w-full bg-turquoise-600 text-white py-2 rounded-lg hover:bg-turquoise-700 transition-colors"
                    onClick={() => {
                        onPriceChange([0, 1000]);
                        onRoomsChange(0);
                        onGuestsChange(0);
                    }}
                >
                    Reset Filters
                </button>
            }
        </div>
    );
}