import React from 'react';
import { motion } from 'framer-motion';

export function CouponCode({ code, onCopy, copied }) {
  return (
    <div className="space-y-3 text-center">
      <p className="text-sm text-navy-600">Use this code at checkout</p>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onCopy(code)}
        className="mx-auto cursor-pointer overflow-hidden rounded-lg border-2 border-dashed border-turquoise-200 bg-turquoise-50 p-3"
      >
        <code className="block font-mono text-xl font-bold text-navy-800">
          {code}
        </code>
        <span className="mt-1 text-xs text-turquoise-600">
          {copied ? 'Copied!' : 'Click to copy'}
        </span>
      </motion.div>
    </div>
  );
}