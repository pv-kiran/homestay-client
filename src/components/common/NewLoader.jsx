import React from 'react';
import { Home } from 'lucide-react';

const NewLoader = ({ size = 'md', showText = true }) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Outer rotating circle */}
        <div className={`absolute inset-0 ${sizeClasses[size]} rounded-full border-4 border-turquoise-200 border-t-turquoise-500 animate-spin`} />
        
        {/* Inner gradient circle with home icon */}
        <div className={`absolute inset-0 ${sizeClasses[size]} flex items-center justify-center`}>
          <div className="absolute inset-4 bg-gradient-to-br from-turquoise-400 to-turquoise-600 rounded-full flex items-center justify-center shadow-lg">
            <Home className={`${iconSizes[size]} text-white animate-pulse`} />
          </div>
        </div>
      </div>
      
      {showText && (
        <div className="text-center">
          <p className="text-turquoise-700 font-medium text-lg">Finding your perfect stay</p>
          <p className="text-gray-500 text-sm mt-1">Please wait while we search for the best options</p>
        </div>
      )}
    </div>
  );
};

export default NewLoader;