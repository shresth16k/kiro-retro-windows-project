import React, { useState, useRef, useEffect } from 'react';
import { useWindowManager } from '../contexts/WindowManagerContext';

const Window = ({ windowId }) => {
  const { windows, focusedWindowId, focusWindow, closeWindow, minimizeWindow, updateWindowPosition, updateWindowSize } = useWindowManager();
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

  // Handle mouse move for dragging - MOVED BEFORE EARLY RETURN
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const newX = e.clientX - dragOffset.x;
      const newY = Math.max(0, e.clientY - dragOffset.y); // Prevent dragging above screen

      updateWindowPosition(windowId, { x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, windowId, updateWindowPosition]);

  const window = windows[windowId];
  
  // Early return AFTER all hooks
  if (!window || window.isClosed || window.isMinimized) {
    return null;
  }

  const isFocused = focusedWindowId === windowId;

  // Handle window click to focus
  const handleWindowClick = (e) => {
    e.stopPropagation();
    if (!isFocused) {
      focusWindow(windowId);
    }
  };

  // Handle title bar drag
  const handleMouseDown = (e) => {
    if (e.target.closest('.window-controls')) return;
    
    setIsDragging(true);
    const rect = windowRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    focusWindow(windowId);
  };

  return (
    <div
      ref={windowRef}
      className={`absolute bg-win95-grey border-2 ${isFocused ? 'border-win95-highlight border-t-win95-highlight border-l-win95-highlight border-r-win95-shadow border-b-win95-shadow' : 'border-win95-dark-grey'} shadow-lg select-none`}
      style={{
        left: window.position.x,
        top: window.position.y,
        width: window.size.width,
        height: window.size.height,
        zIndex: window.zIndex,
        cursor: isDragging ? 'grabbing' : 'default',
      }}
      onClick={handleWindowClick}
    >
      {/* Title Bar */}
      <div
        className={`h-6 px-1 flex items-center justify-between ${isFocused ? 'bg-blue-600' : 'bg-win95-dark-grey'} text-white text-xs font-bold cursor-grab active:cursor-grabbing`}
        onMouseDown={handleMouseDown}
      >
        <span className="truncate flex-1 px-1">{window.title}</span>
        
        {/* Window Controls */}
        <div className="window-controls flex">
          {/* Minimize Button */}
          <button
            className="w-4 h-4 bg-win95-grey border border-win95-highlight border-t-win95-highlight border-l-win95-highlight border-r-win95-shadow border-b-win95-shadow flex items-center justify-center text-black text-xs hover:bg-gray-300"
            onClick={(e) => {
              e.stopPropagation();
              minimizeWindow(windowId);
            }}
          >
            _
          </button>
          
          {/* Close Button */}
          <button
            className="w-4 h-4 bg-win95-grey border border-win95-highlight border-t-win95-highlight border-l-win95-highlight border-r-win95-shadow border-b-win95-shadow flex items-center justify-center text-black text-xs hover:bg-red-300 ml-1"
            onClick={(e) => {
              e.stopPropagation();
              closeWindow(windowId);
            }}
          >
            ×
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="h-full pb-6 overflow-hidden">
        <div className="p-2 h-full">
          {window.component || (
            <div className="text-xs">
              <p>Window: {window.title}</p>
              <p>App ID: {window.appId}</p>
              <p>This is a placeholder window content.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Window;