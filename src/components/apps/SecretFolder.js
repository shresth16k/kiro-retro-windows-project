import React, { useState } from 'react';

const SecretFolder = () => {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showError, setShowError] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const correctPassword = 'RETRO_REVIVAL';

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password === correctPassword) {
      setIsUnlocked(true);
      setShowError(false);
    } else {
      setShowError(true);
      setAttempts(prev => prev + 1);
      setPassword('');
      
      // Play error sound (browser beep)
      try {
        // Create a short beep sound
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
      } catch (error) {
        console.log('Audio not supported');
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const closeErrorDialog = () => {
    setShowError(false);
  };

  if (isUnlocked) {
    return (
      <div className="h-full flex flex-col bg-win95-grey">
        {/* Success Screen */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-blue-100 to-blue-200">
          {/* Trophy/Success Icon */}
          <div className="text-8xl mb-4 animate-bounce">
            🏆
          </div>
          
          {/* Success Message */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-yellow-600 mb-2 drop-shadow-lg">
              🎉 YOU WIN! 🎉
            </h1>
            <p className="text-lg text-blue-800 mb-4">
              Welcome to the Secret Folder!
            </p>
            <div className="bg-white border-2 border-win95-shadow border-t-win95-shadow border-l-win95-shadow border-r-win95-highlight border-b-win95-highlight p-4 text-xs">
              <p className="mb-2">🎮 <strong>Congratulations!</strong></p>
              <p className="mb-2">You've successfully accessed the hidden area of Retro Revival!</p>
              <p className="mb-2">🕹️ This Windows 95 simulator is fully functional with:</p>
              <ul className="list-disc list-inside text-left space-y-1 mt-2">
                <li>Window management system</li>
                <li>Draggable windows with focus control</li>
                <li>Taskbar with running applications</li>
                <li>Desktop icons and applications</li>
                <li>Authentic Windows 95 styling</li>
              </ul>
              <p className="mt-4 text-center font-bold">
                🎯 Secret unlocked! You're a true retro enthusiast! 🎯
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-win95-grey">
      {/* File Explorer Header */}
      <div className="bg-win95-grey border-b-2 border-win95-shadow p-1">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-bold">File</span>
          <span className="font-bold">Edit</span>
          <span className="font-bold">View</span>
          <span className="font-bold">Help</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-win95-grey border-b-2 border-win95-shadow p-1 flex items-center gap-1">
        <button className="win95-button px-2 py-1 text-xs">Back</button>
        <button className="win95-button px-2 py-1 text-xs">Forward</button>
        <button className="win95-button px-2 py-1 text-xs">Up</button>
        <div className="flex-1 mx-2">
          <div className="bg-white border-2 border-win95-shadow border-t-win95-shadow border-l-win95-shadow border-r-win95-highlight border-b-win95-highlight px-2 py-1 text-xs">
            C:\Windows\System32\SecretFolder
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white border-2 border-win95-shadow border-t-win95-shadow border-l-win95-shadow border-r-win95-highlight border-b-win95-highlight m-2 p-4 flex flex-col items-center justify-center">
        {/* Lock Icon */}
        <div className="text-6xl mb-4">
          🔒
        </div>
        
        {/* Access Denied Message */}
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold mb-2">Access Restricted</h2>
          <p className="text-xs text-gray-600 mb-4">
            This folder contains classified retro files.<br />
            Please enter the access code to continue.
          </p>
        </div>

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-xs">
          <div className="mb-4">
            <label className="block text-xs font-bold mb-2">
              Access Code:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-2 py-1 text-xs border-2 border-win95-shadow border-t-win95-shadow border-l-win95-shadow border-r-win95-highlight border-b-win95-highlight focus:outline-none"
              placeholder="Enter password..."
              autoFocus
            />
          </div>
          
          <div className="flex gap-2 justify-center">
            <button
              type="submit"
              className="win95-button px-4 py-1 text-xs font-bold"
            >
              Access
            </button>
            <button
              type="button"
              className="win95-button px-4 py-1 text-xs"
              onClick={() => setPassword('')}
            >
              Clear
            </button>
          </div>
        </form>

        {/* Attempts Counter */}
        {attempts > 0 && (
          <div className="mt-4 text-xs text-red-600">
            Failed attempts: {attempts}
          </div>
        )}

        {/* Hint */}
        <div className="mt-6 text-xs text-gray-500 text-center">
          💡 Hint: Think about the theme of this application...
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-win95-grey border-t-2 border-win95-highlight p-1 text-xs flex justify-between">
        <span>Ready</span>
        <span>1 object(s) selected</span>
      </div>

      {/* Error Dialog */}
      {showError && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-win95-grey border-2 border-win95-highlight border-t-win95-highlight border-l-win95-highlight border-r-win95-shadow border-b-win95-shadow p-1 min-w-80">
            {/* Dialog Title Bar */}
            <div className="bg-blue-600 text-white px-2 py-1 text-xs font-bold flex justify-between items-center mb-2">
              <span>Secret Folder - Error</span>
              <button
                onClick={closeErrorDialog}
                className="w-4 h-4 bg-win95-grey border border-win95-highlight border-t-win95-highlight border-l-win95-highlight border-r-win95-shadow border-b-win95-shadow flex items-center justify-center text-black hover:bg-red-300"
              >
                ×
              </button>
            </div>
            
            {/* Dialog Content */}
            <div className="bg-win95-grey p-4 flex items-center gap-4">
              <div className="text-3xl">⚠️</div>
              <div className="flex-1">
                <p className="text-xs font-bold mb-2">Access Denied</p>
                <p className="text-xs">
                  The password you entered is incorrect.<br />
                  Please try again.
                </p>
              </div>
            </div>
            
            {/* Dialog Buttons */}
            <div className="p-2 flex justify-center">
              <button
                onClick={closeErrorDialog}
                className="win95-button px-6 py-1 text-xs font-bold"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecretFolder;