import React, { useState } from 'react';

const Dropdown = ({
  align = 'center',
  width = 48,
  contentClasses = 'py-1 bg-dark',
  trigger,
  children
}) => {
  let alignmentClasses;

  switch (width) {
    case '48':
      width = 'w-48';
      break;
    default:
      break;
  }

  switch (align) {
    case 'left':
      alignmentClasses = 'left-0';
      break;
    case 'top':
      alignmentClasses = '';
      break;
    case 'right':
    default:
      alignmentClasses = 'right-0';
      break;
  }

  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div
        className="cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {trigger}
      </div>
      {isOpen && (
        <div
          className={`absolute z-50 mt-0 ${width} rounded-md shadow-lg ${alignmentClasses}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className={`rounded-md ring-1 ring-black ring-opacity-5 ${contentClasses}`}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
