import React from 'react';

export const Button = ({ children, onClick, className = '', ...props }) => {
  return (
    <button
      className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
