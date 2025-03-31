import React, { useState } from 'react';
import { ChevronDown, ShoppingCart } from 'lucide-react';
import { useSelector } from 'react-redux';


function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR'
    }).format(price);
}

function AddonsPrice() {

    const { selectedItems } = useSelector((store) => store?.addOns);

    const [isOpen, setIsOpen] = useState(false);

    const totalAmount = Object.values(selectedItems).reduce(
        (sum, category) =>
            sum + Object.values(category).reduce(
                (categorySum, item) => categorySum + item.price * item.quantity,
                0
            ),
        0
    );

    const hasItems = Object.values(selectedItems).some(category => Object.keys(category).length > 0);

    if (!hasItems) {
        return null;
    }

    return (
        <div >
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full py-4 flex justify-between items-center px-2"
                    >
                        <span className="text-gray-600 text-md">Add-ons</span>
                        <div className="flex items-center">
                            <span className="text-md mr-1 text-gray-600">{parseFloat(totalAmount?.toFixed(2))}</span>
                            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                        </div>
                    </button>

                    <div
                        className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                            } overflow-hidden`}
                    >
                        <div className="px-6 py-4 bg-gray-50">
                            <div className="divide-y divide-gray-200">
                                {Object.entries(selectedItems).map(([category, items]) => {
                                    const categoryItems = Object.values(items);
                                    if (categoryItems.length === 0) return null;

                                    return (
                                        <div key={category} className="py-4 first:pt-0 last:pb-0">
                                            <h3 className="font-medium text-gray-900 mb-3 capitalize">
                                                {category.replace(/([A-Z])/g, ' $1').trim()}
                                            </h3>
                                            <div className="space-y-3">
                                                {categoryItems.map((item) => (
                                                    <div key={item.id} className="flex justify-between items-start">
                                                        <div className="flex-1">
                                                            <p className="font-medium text-gray-900">{item.name}</p>
                                                            {item.parentName && (
                                                                <p className="text-sm text-gray-600">from {item.parentName}</p>
                                                            )}
                                                            {item.type && (
                                                                <p className="text-sm text-gray-600 capitalize">{item.type}</p>
                                                            )}
                                                            {item.description && (
                                                                <p className="text-sm text-gray-600">{item.description}</p>
                                                            )}
                                                        </div>
                                                        <div className="text-right ml-4">
                                                            <p className="font-medium text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                                                            <p className="text-sm text-gray-600">
                                                                {item.quantity} × {formatPrice(item.price)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddonsPrice;