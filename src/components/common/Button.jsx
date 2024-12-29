import React from 'react';


export function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  size = 'md',
  isLoading = false,
  className = '',
  ...props
}) {
  const baseStyles = 'rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center item-center';
  
  const variants = {
    primary: 'bg-turquoise-500 text-white hover:bg-turquoise-600 focus:ring-turquoise-500',
    secondary: 'bg-turquoise-100 text-turquoise-700 hover:bg-turquoise-200 focus:ring-turquoise-500',
    outline: 'border border-turquoise-500 text-turquoise-500 hover:bg-turquoise-50 focus:ring-turquoise-500',
    transparent: 'border border-white-500 text-white hover:bg-white-100 focus:ring-white-500'
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-sm',
    lg: 'px-6 py-4 text-base',
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}