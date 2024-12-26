import { useState, useEffect } from 'react';

export function useModalSession() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if modal has been shown in this session
    const hasModalBeenShown = sessionStorage.getItem('modalShown');
    
    if (!hasModalBeenShown) {
      // Show modal after delay if not shown before
      const timer = setTimeout(() => {
        setShowModal(true);
        // Mark modal as shown for this session
        sessionStorage.setItem('modalShown', 'true');
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, []);

  return {
    showModal,
    setShowModal
  };
}