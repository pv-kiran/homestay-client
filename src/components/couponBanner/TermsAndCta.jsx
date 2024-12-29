import React from 'react';
import { motion } from 'framer-motion';

export function TermsAndCta({ date, handleBook }) {
    const formatDate = (isoDate) => {
        if (!isoDate) return 'Invalid date'; // Handle empty or invalid dates
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(isoDate).toLocaleDateString('en-US', options);
      };
    
    const formattedDate = formatDate(date);
    return (
        <div className="space-y-4">
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBook}
            className="w-full rounded-lg bg-gradient-to-r from-turquoise-600 to-navy-600 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:from-turquoise-700 hover:to-navy-700"
        >
            Book Now & Save
        </motion.button>
        
        <div className="text-center text-xs text-navy-500">
            <p>Valid until {formattedDate}</p>
            <p className="mt-1">
            <span className='text-red-600'>*</span>T&C apply.
            Not valid with other offers.
            </p>
        </div>
        </div>
    );
}