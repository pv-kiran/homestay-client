import React from 'react';
import { Gift } from 'lucide-react';
import { motion } from 'framer-motion';

export function ModalHeader({description}) {
  return (
    <motion.div 
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      className="mb-5 text-center"
    >
      <motion.div 
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
        className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gold-100"
      >
        <Gift className="h-7 w-7 text-gold-600" />
      </motion.div>
      <h3 className="text-2xl font-bold text-navy-900">Exclusive Offer!</h3>
      <p className="mt-1 text-sm text-turquoise-600">{description ? description : "For New Customers Only"}</p>
    </motion.div>
  );
}