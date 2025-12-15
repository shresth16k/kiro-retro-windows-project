import React from 'react';
import Desktop from './components/Desktop';
import { WindowManagerProvider } from './contexts/WindowManagerContext';

function App() {
  return (
    <WindowManagerProvider>
      <div className="App">
        <Desktop />
      </div>
    </WindowManagerProvider>
  );
}

export default App;