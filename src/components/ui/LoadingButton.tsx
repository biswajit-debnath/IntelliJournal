import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface LoadingButtonProps {
  isLoading: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  loadingText?: string;
}

const LoadingButton = ({ 
  isLoading, 
  disabled = false, 
  onClick, 
  children, 
  className = '',
  loadingText = 'Loading...'
}: LoadingButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`
        flex items-center justify-center gap-2 
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-opacity duration-200
        ${className}
      `}
    >
      {isLoading && <LoadingSpinner size="sm" />}
      {isLoading ? loadingText : children}
    </button>
  );
};

export default LoadingButton;
