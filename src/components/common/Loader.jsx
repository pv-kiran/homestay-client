import React from 'react';
import { Loader2 } from 'lucide-react';



export function Loader({ size = 'lg', text }) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
    };

    return (
        <div className="flex flex-col items-center justify-center gap-3">
            <div className="relative">
                {/* Outer ring animation */}
                <div className={`absolute inset-0 ${sizeClasses[size]} rounded-full border-4 border-emerald-100 opacity-30`} />

                {/* Spinning loader */}
                <Loader2
                    className={`${sizeClasses[size]} animate-spin text-emerald-500`}
                />
            </div>

            {text && (
                <p className="text-emerald-600 font-medium text-sm animate-pulse">
                    {text}
                </p>
            )}
        </div>
    );
}