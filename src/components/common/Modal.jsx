import React from 'react';
import { X } from 'lucide-react';


export function Modal({
  isOpen,
  onClose,
  children,
  title,
  description,
  maxWidth = '430px',
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/40 animate-overlayShow" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-modalSlide">
        <div
          className="w-[90vw] rounded-2xl p-6 shadow-xl bg-white max-h-[450px] overflow-y-auto"
          style={{ maxWidth }}
        >
          <div className="relative">
            <button
              onClick={onClose}
              className="fixed right-6  top-5 rounded-full  bg-turquoise-300 hover:bg-turquoise-800 p-1"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>

            {(title || description) && (
              <div className="mb-6 text-center">
                {title && (
                  <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                )}
                {description && (
                  <p className="mt-2 text-sm text-gray-600">{description}</p>
                )}
              </div>
            )}

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}