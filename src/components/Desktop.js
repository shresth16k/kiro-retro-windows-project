import React from 'react';
import Taskbar from './Taskbar';
import Window from './Window';
import DesktopIcon from './DesktopIcon';
// import Messenger from './apps/Messenger';
// import SecretFolder from './apps/SecretFolder';
// import DosTerminal from './apps/DosTerminal';
import { useWindowManager } from '../contexts/WindowManagerContext';

const Desktop = () => {
  const { visibleWindows, openWindow } = useWindowManager();

  // Handle desktop click to unfocus all windows
  const handleDesktopClick = () => {
    // Could implement desktop focus logic here
  };

  // Handle opening apps with dynamic imports
  const openMessenger = async () => {
    try {
      const { default: Messenger } = await import('./apps/Messenger');
      openWindow('messenger', {
        title: 'Messenger.exe',
        position: { x: 200, y: 100 },
        size: { width: 450, height: 500 },
        component: <Messenger />
      });
    } catch (error) {
      console.error('Failed to load Messenger:', error);
    }
  };

  const openSecretFolder = async () => {
    try {
      const { default: SecretFolder } = await import('./apps/SecretFolder');
      openWindow('secretfolder', {
        title: 'Secret Folder',
        position: { x: 250, y: 150 },
        size: { width: 500, height: 400 },
        component: <SecretFolder />
      });
    } catch (error) {
      console.error('Failed to load Secret Folder:', error);
    }
  };

  const openDosTerminal = async () => {
    try {
      const { default: DosTerminal } = await import('./apps/DosTerminal');
      openWindow('dosterminal', {
        title: 'MS-DOS Prompt',
        position: { x: 150, y: 80 },
        size: { width: 600, height: 450 },
        component: <DosTerminal />
      });
    } catch (error) {
      console.error('Failed to load DOS Terminal:', error);
    }
  };

  const openAdventureGame = async () => {
    try {
      const { default: DosTerminal } = await import('./apps/DosTerminal');
      openWindow('adventure', {
        title: 'ADVENTURE.EXE - Cyberpunk Mystery',
        position: { x: 100, y: 50 },
        size: { width: 650, height: 500 },
        component: <DosTerminal autoStartAdventure={true} />
      });
    } catch (error) {
      console.error('Failed to load Adventure Game:', error);
    }
  };

  return (
    <div 
      className="h-screen w-screen bg-win95-teal relative overflow-hidden"
      onClick={handleDesktopClick}
    >
      {/* Desktop Area */}
      <div className="h-full w-full pb-10 relative">
        {/* Desktop Icons */}
        <div className="p-4 flex flex-wrap gap-2">
          <DesktopIcon
            icon="💬"
            label="Messenger.exe"
            onDoubleClick={openMessenger}
          />
          
          <DesktopIcon
            icon="🔒"
            label="Secret Folder"
            onDoubleClick={openSecretFolder}
          />

          <DesktopIcon
            icon="🎮"
            label="C:> ADVENTURE.EXE"
            onDoubleClick={openAdventureGame}
          />

          <DesktopIcon
            icon="⬛"
            label="MS-DOS Prompt"
            onDoubleClick={openDosTerminal}
          />
          
          <DesktopIcon
            icon="📁"
            label="My Computer"
            onDoubleClick={() => {
              // Placeholder for future app
              console.log('My Computer clicked');
            }}
          />
          
          <DesktopIcon
            icon="🗑️"
            label="Recycle Bin"
            onDoubleClick={() => {
              // Placeholder for future app
              console.log('Recycle Bin clicked');
            }}
          />
        </div>

        {/* Render all visible windows */}
        {visibleWindows.map((window) => (
          <Window key={window.id} windowId={window.id} />
        ))}
      </div>
      
      {/* Fixed Taskbar at bottom */}
      <Taskbar />
    </div>
  );
};

export default Desktop;