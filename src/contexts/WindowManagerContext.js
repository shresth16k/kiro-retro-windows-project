import React, { createContext, useContext, useReducer, useCallback } from 'react';

// Window Manager Context
const WindowManagerContext = createContext();

// Action types
const WINDOW_ACTIONS = {
  OPEN_WINDOW: 'OPEN_WINDOW',
  CLOSE_WINDOW: 'CLOSE_WINDOW',
  FOCUS_WINDOW: 'FOCUS_WINDOW',
  MINIMIZE_WINDOW: 'MINIMIZE_WINDOW',
  RESTORE_WINDOW: 'RESTORE_WINDOW',
  UPDATE_WINDOW_POSITION: 'UPDATE_WINDOW_POSITION',
  UPDATE_WINDOW_SIZE: 'UPDATE_WINDOW_SIZE',
};

// Initial state
const initialState = {
  windows: {},
  windowOrder: [], // Array of window IDs in z-index order (last = highest)
  nextZIndex: 1000,
  focusedWindowId: null,
};

// Window reducer
const windowReducer = (state, action) => {
  switch (action.type) {
    case WINDOW_ACTIONS.OPEN_WINDOW: {
      const { windowId, appId, title, component, initialPosition, initialSize } = action.payload;
      
      // Don't open if already exists and not closed
      if (state.windows[windowId] && !state.windows[windowId].isClosed) {
        // Just focus the existing window
        return {
          ...state,
          windowOrder: [
            ...state.windowOrder.filter(id => id !== windowId),
            windowId
          ],
          focusedWindowId: windowId,
        };
      }

      const newWindow = {
        id: windowId,
        appId,
        title,
        component,
        isMinimized: false,
        isClosed: false,
        zIndex: state.nextZIndex,
        position: initialPosition || { x: 100, y: 100 },
        size: initialSize || { width: 400, height: 300 },
        isMaximized: false,
      };

      return {
        ...state,
        windows: {
          ...state.windows,
          [windowId]: newWindow,
        },
        windowOrder: [
          ...state.windowOrder.filter(id => id !== windowId),
          windowId
        ],
        nextZIndex: state.nextZIndex + 1,
        focusedWindowId: windowId,
      };
    }

    case WINDOW_ACTIONS.CLOSE_WINDOW: {
      const { windowId } = action.payload;
      
      return {
        ...state,
        windows: {
          ...state.windows,
          [windowId]: {
            ...state.windows[windowId],
            isClosed: true,
          }
        },
        windowOrder: state.windowOrder.filter(id => id !== windowId),
        focusedWindowId: state.focusedWindowId === windowId 
          ? state.windowOrder[state.windowOrder.length - 2] || null 
          : state.focusedWindowId,
      };
    }

    case WINDOW_ACTIONS.FOCUS_WINDOW: {
      const { windowId } = action.payload;
      
      if (!state.windows[windowId] || state.windows[windowId].isClosed) {
        return state;
      }

      // If window is minimized, restore it when focused
      const updatedWindow = {
        ...state.windows[windowId],
        isMinimized: false,
        zIndex: state.nextZIndex,
      };

      return {
        ...state,
        windows: {
          ...state.windows,
          [windowId]: updatedWindow,
        },
        windowOrder: [
          ...state.windowOrder.filter(id => id !== windowId),
          windowId
        ],
        nextZIndex: state.nextZIndex + 1,
        focusedWindowId: windowId,
      };
    }

    case WINDOW_ACTIONS.MINIMIZE_WINDOW: {
      const { windowId } = action.payload;
      
      return {
        ...state,
        windows: {
          ...state.windows,
          [windowId]: {
            ...state.windows[windowId],
            isMinimized: true,
          }
        },
        focusedWindowId: state.focusedWindowId === windowId 
          ? state.windowOrder[state.windowOrder.length - 2] || null 
          : state.focusedWindowId,
      };
    }

    case WINDOW_ACTIONS.RESTORE_WINDOW: {
      const { windowId } = action.payload;
      
      return {
        ...state,
        windows: {
          ...state.windows,
          [windowId]: {
            ...state.windows[windowId],
            isMinimized: false,
            zIndex: state.nextZIndex,
          }
        },
        windowOrder: [
          ...state.windowOrder.filter(id => id !== windowId),
          windowId
        ],
        nextZIndex: state.nextZIndex + 1,
        focusedWindowId: windowId,
      };
    }

    case WINDOW_ACTIONS.UPDATE_WINDOW_POSITION: {
      const { windowId, position } = action.payload;
      
      return {
        ...state,
        windows: {
          ...state.windows,
          [windowId]: {
            ...state.windows[windowId],
            position,
          }
        },
      };
    }

    case WINDOW_ACTIONS.UPDATE_WINDOW_SIZE: {
      const { windowId, size } = action.payload;
      
      return {
        ...state,
        windows: {
          ...state.windows,
          [windowId]: {
            ...state.windows[windowId],
            size,
          }
        },
      };
    }

    default:
      return state;
  }
};

// Context Provider Component
export const WindowManagerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(windowReducer, initialState);

  const value = {
    ...state,
    dispatch,
  };

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  );
};

// Custom hook to use the window manager
export const useWindowManager = () => {
  const context = useContext(WindowManagerContext);
  
  if (!context) {
    throw new Error('useWindowManager must be used within a WindowManagerProvider');
  }

  const { windows, windowOrder, focusedWindowId, dispatch } = context;

  // Helper functions
  const openWindow = useCallback((appId, options = {}) => {
    const windowId = options.windowId || `${appId}-${Date.now()}`;
    
    dispatch({
      type: WINDOW_ACTIONS.OPEN_WINDOW,
      payload: {
        windowId,
        appId,
        title: options.title || appId,
        component: options.component,
        initialPosition: options.position,
        initialSize: options.size,
      },
    });
    
    return windowId;
  }, [dispatch]);

  const closeWindow = useCallback((windowId) => {
    dispatch({
      type: WINDOW_ACTIONS.CLOSE_WINDOW,
      payload: { windowId },
    });
  }, [dispatch]);

  const focusWindow = useCallback((windowId) => {
    dispatch({
      type: WINDOW_ACTIONS.FOCUS_WINDOW,
      payload: { windowId },
    });
  }, [dispatch]);

  const minimizeWindow = useCallback((windowId) => {
    dispatch({
      type: WINDOW_ACTIONS.MINIMIZE_WINDOW,
      payload: { windowId },
    });
  }, [dispatch]);

  const restoreWindow = useCallback((windowId) => {
    dispatch({
      type: WINDOW_ACTIONS.RESTORE_WINDOW,
      payload: { windowId },
    });
  }, [dispatch]);

  const updateWindowPosition = useCallback((windowId, position) => {
    dispatch({
      type: WINDOW_ACTIONS.UPDATE_WINDOW_POSITION,
      payload: { windowId, position },
    });
  }, [dispatch]);

  const updateWindowSize = useCallback((windowId, size) => {
    dispatch({
      type: WINDOW_ACTIONS.UPDATE_WINDOW_SIZE,
      payload: { windowId, size },
    });
  }, [dispatch]);

  // Computed values
  const openWindows = Object.values(windows).filter(window => !window.isClosed);
  const visibleWindows = openWindows.filter(window => !window.isMinimized);
  const minimizedWindows = openWindows.filter(window => window.isMinimized);
  const taskbarWindows = openWindows; // All open windows appear in taskbar

  return {
    // State
    windows,
    windowOrder,
    focusedWindowId,
    openWindows,
    visibleWindows,
    minimizedWindows,
    taskbarWindows,
    
    // Actions
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
    restoreWindow,
    updateWindowPosition,
    updateWindowSize,
  };
};

export default WindowManagerContext;