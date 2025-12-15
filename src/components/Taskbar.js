import React, { useState, useEffect } from 'react';
import { useWindowManager } from '../contexts/WindowManagerContext';
import Messenger from './apps/Messenger';
import SecretFolder from './apps/SecretFolder';

const Taskbar = () => {
  const { taskbarWindows, focusedWindowId, focusWindow, restoreWindow, openWindow } = useWindowManager();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  }));

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      }));
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Handle taskbar button click
  const handleTaskbarButtonClick = (window) => {
    if (window.isMinimized) {
      restoreWindow(window.id);
    } else if (focusedWindowId === window.id) {
      // If already focused, minimize it
      // minimizeWindow(window.id); // Uncomment if you want this behavior
    } else {
      focusWindow(window.id);
    }
  };

  // Handle Start button click - cycle through apps
  const handleStartClick = () => {
    // Cycle between different applications
    const apps = [
      {
        id: 'messenger',
        title: 'Messenger.exe',
        position: { x: 200, y: 100 },
        size: { width: 450, height: 500 },
        component: <Messenger />
      },
      {
        id: 'secretfolder',
        title: 'Secret Folder',
        position: { x: 250, y: 150 },
        size: { width: 500, height: 400 },
        component: <SecretFolder />
      }
    ];
    
    // Open a random app for demo purposes
    const randomApp = apps[Math.floor(Math.random() * apps.length)];
    openWindow(randomApp.id, randomApp);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-10 bg-win95-grey border-t-2 border-win95-highlight border-l-2 border-r-2 border-r-win95-shadow border-b-win95-shadow flex items-center px-1">
      {/* Start Button */}
      <button 
        className="win95-button h-8 px-4 mr-2 flex items-center font-bold"
        onClick={handleStartClick}
      >
        <span className="mr-1">🪟</span>
        Start
      </button>
      
      {/* Taskbar buttons area */}
      <div className="flex-1 h-8 bg-win95-grey border border-win95-shadow border-t-win95-shadow border-l-win95-shadow border-r-win95-highlight border-b-win95-highlight flex items-center px-1 gap-1">
        {taskbarWindows.map((window) => (
          <button
            key={window.id}
            className={`h-6 px-2 text-xs truncate max-w-32 ${
              focusedWindowId === window.id && !window.isMinimized
                ? 'bg-win95-dark-grey border border-win95-shadow border-t-win95-shadow border-l-win95-shadow border-r-win95-highlight border-b-win95-highlight'
                : 'win95-button'
            }`}
            onClick={() => handleTaskbarButtonClick(window)}
            title={window.title}
          >
            {window.title}
          </button>
        ))}
      </div>
      
      {/* System Tray */}
      <div className="h-8 px-2 bg-win95-grey border border-win95-shadow border-t-win95-shadow border-l-win95-shadow border-r-win95-highlight border-b-win95-highlight flex items-center ml-1">
        <span className="text-xs font-mono">{currentTime}</span>
      </div>
    </div>
  );
};

export default Taskbar;