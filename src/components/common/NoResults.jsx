import React from 'react'
import { SearchX, Bed, Home, UtensilsCrossed, Sofa, Bath } from 'lucide-react';

function NoResults({resetfilter}) {

  return (
        
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full relative overflow-hidden animate-fade-in">
            {/* Floating homestay-themed icons */}
            <div className="absolute top-3 right-4 animate-float-slow">
                <Bath className="w-5 h-5 text-turquoise-500 opacity-40" />
            </div>
            <div className="absolute top-16 right-8 animate-float">
                <UtensilsCrossed className="w-4 h-4 text-turquoise-500 opacity-30" />
            </div>
            <div className="absolute bottom-4 left-4 animate-float-delay">
                <Bed className="w-5 h-5 text-turquoise-500 opacity-40" />
            </div>
            <div className="absolute bottom-16 left-8 animate-float-slow">
                <Sofa className="w-4 h-4 text-turquoise-500 opacity-30" />
            </div>

            {/* Main content */}
            <div className="text-center">
                <div className="relative inline-block animate-bounce-gentle">
                <div className="absolute inset-0 bg-turquoise-500 opacity-10 rounded-full blur-xl"></div>
                <div className="relative z-10 flex flex-col items-center">
                    <Home className="w-16 h-16 text-turquoise-500 animate-pulse mb-2" />
                    <SearchX className="w-8 h-8 text-turquoise-500 absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4" />
                </div>
                </div>
                
                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
                No Homestays Found
                </h2>
                
                <p className="text-gray-600 text-sm mb-4">
                Try adjusting your search filters
                </p>

                <button className="px-6 py-2 bg-turquoise-500 text-white rounded-lg hover:bg-[#3AC0B0] transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    onClick={() => resetfilter()}
                >
                Clear filter
                </button>
            </div>
            </div>
  )
}

export default NoResults