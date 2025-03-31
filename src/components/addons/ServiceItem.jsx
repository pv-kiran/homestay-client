import React from 'react';
import { Check, Minus, Plus } from 'lucide-react';

import { useSelector } from 'react-redux';

export const ServiceItem = ({
    service,
    isSelected,
    quantity,
    onToggle,
    onQuantityChange
}) => {
    const { currency } = useSelector((store) => store?.currency);

    return (
        <div
            className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg transition-all duration-200 ${isSelected ? 'bg-turquoise-50 border-turquoise-200' : 'bg-white hover:bg-turquoise-50'
                } border`}
        >
            <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                <div
                    onClick={onToggle}
                    className={`w-5 h-5 rounded border cursor-pointer flex items-center justify-center transition-colors ${isSelected ? 'bg-turquoise-500 border-turquoise-500' : 'border-turquoise-300 hover:border-turquoise-400'
                        }`}
                >
                    {isSelected && <Check size={16} className="text-white" />}
                </div>
                <div>
                    <p className="text-base sm:text-lg font-medium text-gray-800">{service.serviceTitle}</p>
                    <p className="text-xs sm:text-sm text-gray-500">{service.description}</p>
                </div>
            </div>
            <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
                {/* {isSelected && (
                    <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-200 p-1">
                        <button
                            onClick={() => quantity > 1 && onQuantityChange(quantity - 1)}
                            className="p-1 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50"
                            disabled={quantity <= 1}
                        >
                            <Minus size={16} className="text-gray-600" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                        <button
                            onClick={() => onQuantityChange(quantity + 1)}
                            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                        >
                            <Plus size={16} className="text-gray-600" />
                        </button>
                    </div>
                )} */}
                <p className="text-sm sm:text-base font-semibold text-gray-900">
                    {currency?.symbol}{(service.amount * (quantity || 1)).toFixed(2)}
                </p>
            </div>
        </div>
    );
}