import React from 'react';
import { BadgePercent } from 'lucide-react';
import { motion } from 'framer-motion';

export function DiscountBanner({value}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative overflow-hidden rounded-xl bg-gradient-to-r from-turquoise-600 to-navy-600 p-5 text-center text-white shadow-lg"
    >
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gold-300 opacity-10" />
      <div className="absolute -left-8 -bottom-8 h-28 w-28 rounded-full bg-turquoise-300 opacity-10" />
      
      <div className="relative">
        <div className="flex items-center justify-center space-x-2">
          <BadgePercent className="h-8 w-7 pt-1" />
          <span className="text-4xl font-bold">{`${value}% OFF`}</span>
        </div>
        <p className="mt-1 text-base">on your premium luxury stay</p>
      </div>
    </motion.div>
  );
}