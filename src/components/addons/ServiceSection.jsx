import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';


export const ServiceSection = ({ title, subtitle, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-8 bg-white rounded-xl shadow-sm overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between bg-gradient-to-r from-turquoise-50 to-white hover:from-turquoise-100 transition-colors"
            >
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{title}</h2>
                    {subtitle && (
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">{subtitle}</p>
                    )}
                </div>
                <ChevronDown
                    className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-600 transition-transform ${isOpen ? 'transform rotate-180' : ''
                        }`}
                />
            </button>
            <div
                className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden`}
            >
                <div className="p-4 sm:p-8">{children}</div>
            </div>
        </div>
    );
}