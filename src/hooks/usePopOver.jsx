import { useEffect, useState } from 'react';

export function usePopoverPosition(
    triggerRef,
    popoverRef,
    margin = 8
) {
    const [position, setPosition] = useState({ top: true, maxHeight: 300 }); // Default to upward positioning

    useEffect(() => {
        const calculatePosition = () => {
            if (!triggerRef.current || !popoverRef.current) return;

            const triggerRect = triggerRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Space below and above the trigger
            const spaceBelow = viewportHeight - triggerRect.bottom - margin;
            const spaceAbove = triggerRect.top - margin;

            // Show above by default on load or when space is sufficient above
            const showAbove = spaceAbove > spaceBelow;

            setPosition({
                top: showAbove,
                maxHeight: showAbove ? spaceAbove : spaceBelow,
            });
        };

        calculatePosition(); // Initial calculation on load
        window.addEventListener('scroll', calculatePosition);
        window.addEventListener('resize', calculatePosition);

        return () => {
            window.removeEventListener('scroll', calculatePosition);
            window.removeEventListener('resize', calculatePosition);
        };
    }, [triggerRef, popoverRef, margin]);

    return position;
}
