import React from 'react';
import { Loader2 } from 'lucide-react';


export function PaymentProcessing({ message = "Processing your payment..." }) {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white rounded-2xl p-8 shadow-xl max-w-md w-full mx-4 text-center">
                <div className="flex flex-col items-center gap-6">
                    <div className="relative">
                        {/* Outer ring */}
                        <div className="absolute inset-0 rounded-full border-4 border-blue-100 animate-pulse"></div>
                        {/* Spinning loader */}
                        <Loader2 className="w-12 h-12 text-turquoise-600 animate-spin" />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold text-gray-900">{message}</h2>
                        <p className="text-gray-500 text-sm">Please don't close this window</p>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-turquoise-600 rounded-full animate-progressBar"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}