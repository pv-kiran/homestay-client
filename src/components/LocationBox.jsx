import React, { forwardRef } from 'react';
import { Building2 } from 'lucide-react';



export const LocationBox = forwardRef(
    ({ locations, onSelect, position }, ref) => {
        const positionClasses = position.top
            ? 'bottom-full mb-2'
            : 'top-full mt-2';

        return (
            <div
                ref={ref}
                style={{ maxHeight: `${position.maxHeight}px` }}
                className={`absolute top left-5 w-7/12 bg-white rounded-lg shadow-lg p-4 border border-gray-200 z-50  ${positionClasses}`}
            >
                <div className='max-h-[200px] overflow-y-auto'>
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Popular destinations</h3>
                    <div className="grid grid-cols-2">
                        {locations.map((location, index) => (
                            <button
                                key={index}
                                onClick={() => onSelect(location)}
                                className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                            >
                                <div className="p-2 bg-gray-100 rounded-lg">
                                    <Building2 className="h-4 w-4 text-gray-600" />
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="text-sm font-medium text-gray-900">{location?.city}</span>
                                    <span className="text-xs text-gray-500">{location?.district},{location?.state} </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        );
    }
);