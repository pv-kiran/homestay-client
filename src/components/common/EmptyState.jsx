import React from 'react';
import { PackageX } from 'lucide-react';


export function EmptyState({
    title = 'No items found',
    message = 'There are no items to display at the moment.',
    icon: Icon = <PackageX className="w-12 h-12 text-gray-400" />
}) {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg border border-gray-100 shadow-sm h-[70vh]">
            <div className="flex flex-col items-center text-center space-y-3">
                {Icon}
                <h3 className="text-gray-900 font-semibold text-lg">
                    {title}
                </h3>
                <p className="text-gray-500 max-w-sm">
                    {message}
                </p>
            </div>
        </div>
    );
}