import React, { useState } from 'react';

const DesktopIcon = ({ icon, label, onDoubleClick, onSingleClick }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [clickTimeout, setClickTimeout] = useState(null);

  const handleClick = () => {
    if (clickTimeout) {
      // Double click detected
      clearTimeout(clickTimeout);
      setClickTimeout(null);
      setIsSelected(true);
      if (onDoubleClick) {
        onDoubleClick();
      }
    } else {
      // Single click - wait to see if there's a second click
      setIsSelected(true);
      if (onSingleClick) {
        onSingleClick();
      }
      
      const timeout = setTimeout(() => {
        setClickTimeout(null);
      }, 300);
      
      setClickTimeout(timeout);
    }
  };

  const handleDesktopClick = (e) => {
    // If clicking outside this icon, deselect it
    if (!e.target.closest('.desktop-icon')) {
      setIsSelected(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleDesktopClick);
    return () => document.removeEventListener('click', handleDesktopClick);
  }, []);

  return (
    <div
      className={`desktop-icon flex flex-col items-center p-2 w-20 cursor-pointer select-none ${
        isSelected ? 'bg-blue-600 bg-opacity-50' : ''
      }`}
      onClick={handleClick}
    >
      {/* Icon */}
      <div className="text-2xl mb-1 filter drop-shadow-sm">
        {icon}
      </div>
      
      {/* Label */}
      <div className={`text-xs text-center leading-tight px-1 ${
        isSelected ? 'bg-blue-600 text-white' : 'text-white'
      } drop-shadow-sm`}>
        {label}
      </div>
    </div>
  );
};

export default DesktopIcon;