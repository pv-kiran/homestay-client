import React, { useState, useCallback, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useApi from '../../hooks/useApi';
import { ModalHeader } from './ModalHeader';
import { DiscountBanner } from './DiscountBanner';
import { CouponCode } from './CouponCode';
import { TermsAndCta } from './TermsAndCta';
import userService from '../../services/userServices';
import { useNavigate } from 'react-router-dom';

export function CouponModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [lastestCoupon, setLatestCoupon] = useState({});
  const navigate = useNavigate();

  const {
    execute: getLatestCoupon,
  } = useApi(userService.userGetLatestCoupon);

  const getCoupon = async () => {
    const response = await getLatestCoupon();
    console.log(response);
    setLatestCoupon(response.coupon);
  }

  const copyCode = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle escape key press
  const handleEscapeKey = useCallback((event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  // Handle click outside modal
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const CloseButton = ({ onClose }) => (
    <div 
      role="button"
      tabIndex={0}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Close clicked');
        onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onClose();
      }}
      className="absolute right-3 top-3 z-50 cursor-pointer rounded-full bg-white p-1.5 text-gray-500 shadow-lg hover:bg-gray-100"
    >
      <X className="h-4 w-4 pointer-events-none" />
    </div>
  );

  const onBookClick = () => {
    navigate('/homestays/all')
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [isOpen, handleEscapeKey]);

  useEffect(() => {
    getCoupon();
  },[])

  return (
    <AnimatePresence>
      {(isOpen && lastestCoupon!==undefined) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "url('https://res.cloudinary.com/djd2rpgil/image/upload/v1735232665/homestay-landing_bg/zb3s9qcyskezfg66axoc.webp')",
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />

            {/* Close Button */}
            <CloseButton onClose={onClose} />

            <div className="relative p-6">
              <ModalHeader description = {lastestCoupon?.description} />
              
              <div className="space-y-5">
                <DiscountBanner value={`${lastestCoupon?.discountValue}`} />
                <CouponCode 
                  code={lastestCoupon?.code}
                  onCopy={copyCode}
                  copied={copied}
                />
                <TermsAndCta date={lastestCoupon?.expiryDate} handleBook={onBookClick}/>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}