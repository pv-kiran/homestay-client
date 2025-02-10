import React from 'react';
import { Check } from 'lucide-react';


export const MenuItem = ({ item, isSelected, onToggle }) => {
    return (
        <div
            className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${isSelected ? 'bg-turquoise-50 border-turquoise-200' : 'bg-white hover:bg-turquoise-50'
                } border`}
        >
            <div className="flex items-center space-x-4">
                <div
                    onClick={onToggle}
                    className={`w-5 h-5 rounded border cursor-pointer flex items-center justify-center transition-colors ${isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-300 hover:border-blue-400'
                        }`}
                >
                    {isSelected && <Check size={16} className="text-white" />}
                </div>
                <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500 capitalize">{item.type}</p>
                </div>
            </div>
            <p className="font-semibold text-gray-900">₹{item.price}</p>
        </div>
    );
}