import React from 'react';

export default function FilterSidebar({
    categories,
    selectedCategories,
    priceRange,
    rooms,
    guests,
    onCategoryChange,
    onPriceChange,
    onRoomsChange,
    onGuestsChange,
    isApply,
    closeModal
}) {
    return (
        <div className="w-full lg:w-72 p-6 rounded-lg sm:shadow-md sm:h-[calc(100vh-2rem)]  sm:top-4 overflow-y-auto">
            {/* <h2 className="text-xl font-bold mb-6">Filters</h2> */}

            {/* Categories */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Categories</h3>
                <div className="space-y-2">
                    {categories.map((category) => (
                        <label key={category} className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(category)}
                                onChange={() => onCategoryChange(category)}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-gray-700">{category}</span>
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
                            max="1000"
                            value={priceRange[1]}
                            onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value)])}
                            className="w-full"
                        />
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
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
                            className={`px-3 py-1 rounded-full text-sm ${rooms.includes(num)
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                            className={`px-3 py-1 rounded-full text-sm ${guests.includes(num)
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
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