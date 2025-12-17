import React, { useState, useRef, useEffect, useCallback } from 'react';

const DosTerminal = ({ autoStartAdventure = false }) => {
  const [history, setHistory] = useState([
    'Microsoft(R) MS-DOS(R) Version 6.22',
    '(C)Copyright Microsoft Corp 1981-1994.',
    '',
    'Welcome to the retro DOS experience!',
    'Type "help" for available commands or "adventure" to start the game.',
    ''
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [currentPath, setCurrentPath] = useState('C:\\WINDOWS>');
  const [showCursor, setShowCursor] = useState(true);
  const [isGameMode, setIsGameMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [gameHistory, setGameHistory] = useState([]);
  const [hasAutoStarted, setHasAutoStarted] = useState(false);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530); // Classic DOS cursor blink rate

    return () => clearInterval(cursorInterval);
  }, []);

  // Auto-scroll to bottom when history updates
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Send command to Game Master AI using Google Generative AI SDK
  const sendToGameMaster = useCallback(async (userInput) => {
    setIsLoading(true);
    
    try {
      const geminiKey = process.env.REACT_APP_GEMINI_API_KEY;

      if (!geminiKey) {
        // Fallback responses for demo mode
        const fallbackResponses = [
          "You stand in a neon-lit alley, rain dripping from fire escapes above. A shadowy figure watches from the corner.",
          "The chrome door slides open with a hiss. Inside, holographic displays flicker with corporate logos.",
          "Your cybernetic implant buzzes with an incoming data transmission. The message is encrypted.",
          "A street samurai emerges from the shadows, chrome arm gleaming under the neon lights.",
          "The data jack sparks as you interface with the terminal. Corporate security is closing in.",
          "ERROR: No API key detected! Configure REACT_APP_GEMINI_API_KEY for full AI experience."
        ];
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        const aiText = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
        
        // Update game history
        setGameHistory(prev => [
          ...prev,
          { type: 'player', content: userInput },
          { type: 'game', content: aiText }
        ]);

        return aiText;
      }

      // Initialize Google Generative AI with error handling
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(geminiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      // Build conversation context for the game
      const gameContext = gameHistory.map(entry => `${entry.type === 'player' ? 'Player' : 'Game Master'}: ${entry.content}`).join('\n');
      
      // Create chat with system prompt and game history
      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: GAME_SYSTEM_PROMPT }],
          },
          {
            role: "model", 
            parts: [{ text: "I understand. I am now a text adventure game engine from 1985 running a Cyberpunk Mystery in Neo-Tokyo, 2085. I will keep responses short and engaging." }],
          },
        ],
        generationConfig: {
          maxOutputTokens: 150,
          temperature: 0.8,
        },
      });

      const fullPrompt = gameContext ? `Game History:\n${gameContext}\n\nPlayer Action: ${userInput}` : `Player Action: ${userInput}`;
      const result = await chat.sendMessage(fullPrompt);
      const aiText = result.response.text();

      // Update game history
      setGameHistory(prev => [
        ...prev,
        { type: 'player', content: userInput },
        { type: 'game', content: aiText }
      ]);

      return aiText;

    } catch (error) {
      console.error('Game Master AI Error:', error);
      return `SYSTEM ERROR: ${error.message}\nGame Master offline. Try again later, choom.`;
    } finally {
      setIsLoading(false);
    }
  }, [gameHistory]);

  // Start the adventure game
  const startAdventure = useCallback(async () => {
    setIsGameMode(true);
    setCurrentPath('ADVENTURE>');
    setGameHistory([]);
    
    const introText = await sendToGameMaster("Start the game. Describe the dark alley in Neo-Tokyo.");
    
    return [
      '═══════════════════════════════════════════════════════',
      '    CYBERPUNK MYSTERY ADVENTURE - NEO-TOKYO 2085',
      '═══════════════════════════════════════════════════════',
      '',
      introText,
      '',
      'Type your actions to play. Type "quit" to exit game.',
      ''
    ];
  }, [sendToGameMaster]);

  // Auto-start adventure mode if requested
  useEffect(() => {
    if (autoStartAdventure && !hasAutoStarted && !isGameMode) {
      setHasAutoStarted(true);
      // Delay to allow component to mount properly
      setTimeout(async () => {
        const adventureHistory = await startAdventure();
        setHistory(adventureHistory);
      }, 500);
    }
  }, [autoStartAdventure, hasAutoStarted, isGameMode, startAdventure]);

  // Focus input when terminal is clicked
  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Game Master AI System Prompt
  const GAME_SYSTEM_PROMPT = `You are a text adventure game engine from 1985. The genre is Cyberpunk Mystery. Keep descriptions short (under 2 sentences). You describe the scene, and the user says what they do. 

Rules:
- Keep responses under 2 sentences
- Use retro cyberpunk terminology (chrome, neon, data jacks, etc.)
- If the user dies, show ASCII art that says "GAME OVER" 
- Track player health, inventory, and location
- Include random encounters and puzzles
- Start the game by describing a dark alley in Neo-Tokyo

The player starts in a dark alley in Neo-Tokyo, 2085. Rain reflects neon signs. They must solve a mystery involving stolen corporate data.`;





  // DOS Commands simulation
  const executeCommand = async (command) => {
    const cmd = command.toLowerCase().trim();
    const responses = [];

    switch (cmd) {
      case '':
        // Empty command, just show new prompt
        break;
      
      case 'help':
        if (isGameMode) {
          responses.push(
            'ADVENTURE GAME COMMANDS:',
            '',
            'Type natural language actions like:',
            '- "look around"',
            '- "go north"', 
            '- "examine door"',
            '- "talk to person"',
            '- "use item"',
            '',
            'Special commands:',
            'QUIT    - Exit adventure game',
            'SAVE    - Save game state (simulation)',
            'LOAD    - Load game state (simulation)',
            ''
          );
        } else {
          responses.push(
            'Available commands:',
            '',
            'DIR       - List directory contents',
            'CLS       - Clear screen',
            'VER       - Display version information',
            'TIME      - Display current time',
            'DATE      - Display current date',
            'ECHO      - Display message',
            'CD        - Change directory',
            'TYPE      - Display file contents',
            'TREE      - Display directory structure',
            'ADVENTURE - Start AI text adventure game',
            'GAMES     - List available games',
            'SECRET    - ???',
            'EXIT      - Close terminal',
            ''
          );
        }
        break;

      case 'dir':
        responses.push(
          ' Volume in drive C has no label.',
          ' Volume Serial Number is 1995-0815',
          '',
          ' Directory of C:\\WINDOWS',
          '',
          'SYSTEM       <DIR>     08-15-95  12:00p',
          'TEMP         <DIR>     08-15-95  12:00p',
          'COMMAND  COM    54,645 08-15-95  12:00p',
          'WIN      COM    18,967 08-15-95  12:00p',
          'AUTOEXEC BAT       156 08-15-95  12:00p',
          'CONFIG   SYS       245 08-15-95  12:00p',
          'SECRET   TXT        42 08-15-95  12:00p',
          '        6 file(s)     74,055 bytes',
          '        2 dir(s)   1,457,664 bytes free',
          ''
        );
        break;

      case 'cls':
        setHistory([]);
        return; // Don't add to history, just clear

      case 'ver':
        responses.push(
          'Microsoft(R) MS-DOS(R) Version 6.22',
          'Retro Revival Edition - Built with Kiro AI',
          ''
        );
        break;

      case 'time':
        const time = new Date().toLocaleTimeString();
        responses.push(
          `Current time is: ${time}`,
          'Enter new time: (Press ENTER to keep current time)',
          ''
        );
        break;

      case 'date':
        const date = new Date().toLocaleDateString();
        responses.push(
          `Current date is: ${date}`,
          'Enter new date (mm-dd-yy): (Press ENTER to keep current date)',
          ''
        );
        break;

      case 'cd':
      case 'cd..':
      case 'cd ..':
        if (cmd === 'cd') {
          responses.push('C:\\WINDOWS', '');
        } else {
          setCurrentPath('C:\\>');
          responses.push('');
        }
        break;

      case 'tree':
        responses.push(
          'Directory PATH listing',
          'Volume serial number is 1995-0815',
          'C:.',
          '├───WINDOWS',
          '│   ├───SYSTEM',
          '│   └───TEMP',
          '├───DOS',
          '└───GAMES',
          '    ├───DOOM',
          '    └───SOLITAIRE',
          ''
        );
        break;

      case 'type secret.txt':
        responses.push(
          'The password you seek lies within the messenger...',
          'Ask the right questions about the golden age of computing.',
          'When floppy disks ruled and modems sang their songs.',
          ''
        );
        break;

      case 'games':
        responses.push(
          'Available Games:',
          '',
          'SOLITAIRE.EXE - Classic card game',
          'MINESWEEPER.EXE - Find the mines',
          'DOOM.EXE - First person shooter',
          'TETRIS.EXE - Falling blocks puzzle',
          'ADVENTURE.EXE - AI-Powered Text Adventure',
          '',
          'Type "adventure" to start the cyberpunk mystery!',
          ''
        );
        break;

      case 'adventure':
      case 'adventure.exe':
        return await startAdventure();

      case 'solitaire.exe':
      case 'solitaire':
        responses.push(
          'Loading Solitaire...',
          '████████████████████ 100%',
          'Just kidding! This is a retro simulation.',
          'The real games are in your heart... and on the desktop!',
          ''
        );
        break;

      case 'secret':
        responses.push(
          'Access Denied.',
          'This command requires Level 5 clearance.',
          'Hint: The messenger knows more than it lets on...',
          ''
        );
        break;

      case 'exit':
        responses.push(
          'Goodbye! Thanks for using DOS Terminal.',
          'Window will remain open for nostalgic purposes.',
          ''
        );
        break;

      case 'quit':
        if (isGameMode) {
          setIsGameMode(false);
          setCurrentPath('C:\\WINDOWS>');
          setGameHistory([]);
          responses.push(
            'Exiting adventure game...',
            'Thanks for playing! Type "adventure" to play again.',
            ''
          );
        } else {
          responses.push(
            'Nothing to quit. Type "exit" to close terminal.',
            ''
          );
        }
        break;

      case 'save':
        if (isGameMode) {
          responses.push(
            'SAVE GAME',
            'Game state saved to SAVE001.ADV',
            '(This is a simulation - actual save not implemented)',
            ''
          );
        } else {
          responses.push('Save command only available in adventure mode.', '');
        }
        break;

      case 'load':
        if (isGameMode) {
          responses.push(
            'LOAD GAME',
            'Loading SAVE001.ADV...',
            '(This is a simulation - actual load not implemented)',
            ''
          );
        } else {
          responses.push('Load command only available in adventure mode.', '');
        }
        break;

      default:
        if (cmd.startsWith('echo ')) {
          const message = command.substring(5);
          responses.push(message, '');
        } else if (isGameMode) {
          // In game mode, send everything to the AI Game Master
          return null; // Will be handled by AI
        } else {
          responses.push(
            `Bad command or file name: ${command}`,
            'Type "help" for available commands.',
            ''
          );
        }
        break;
    }

    return responses;
  };

  // Handle command execution
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentInput.trim()) return;
    
    // Add current command to history
    const commandLine = `${currentPath}${currentInput}`;
    const newHistory = [...history, commandLine];
    
    if (isGameMode && !['help', 'quit', 'save', 'load', 'cls'].includes(currentInput.toLowerCase().trim())) {
      // In game mode, send to AI Game Master
      setHistory([...newHistory, 'Loading...']);
      setCurrentInput('');
      
      try {
        const aiResponse = await sendToGameMaster(currentInput);
        setHistory(prev => [
          ...prev.slice(0, -1), // Remove "Loading..." message
          '',
          aiResponse,
          ''
        ]);
      } catch (error) {
        setHistory(prev => [
          ...prev.slice(0, -1), // Remove "Loading..." message
          '',
          'ERROR: Game Master connection failed.',
          'Try again or type "quit" to exit adventure mode.',
          ''
        ]);
      }
    } else {
      // Regular DOS command execution
      const response = await executeCommand(currentInput);
      
      // Add response to history if any
      const finalHistory = response ? [...newHistory, ...response] : newHistory;
      
      setHistory(finalHistory);
      setCurrentInput('');
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    if (isGameMode) {
      setCurrentInput(e.target.value); // Keep natural case for adventure game
    } else {
      setCurrentInput(e.target.value.toUpperCase()); // DOS was typically uppercase
    }
  };

  // Handle key presses for special DOS behaviors
  const handleKeyDown = (e) => {
    // Prevent default browser behaviors for certain keys
    if (e.key === 'Tab') {
      e.preventDefault();
    }
  };

  return (
    <div className="h-full flex flex-col bg-black text-green-400 font-mono overflow-hidden">
      {/* Terminal Display Area */}
      <div 
        ref={terminalRef}
        className="flex-1 p-2 overflow-y-auto cursor-text select-text"
        onClick={handleTerminalClick}
        style={{ 
          fontFamily: '"Courier New", Courier, monospace',
          fontSize: '12px',
          lineHeight: '1.2'
        }}
      >
        {/* History Display */}
        {history.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap">
            {line}
          </div>
        ))}
        
        {/* Current Input Line */}
        <div className="flex">
          <span className={isGameMode ? 'text-cyan-400' : ''}>{currentPath}</span>
          <span className={isGameMode ? 'text-white' : ''}>{currentInput}</span>
          <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity ${isGameMode ? 'text-cyan-400' : ''}`}>
            █
          </span>
        </div>

        {/* Loading indicator for AI responses */}
        {isLoading && (
          <div className="text-yellow-400 animate-pulse">
            Processing neural network response...
          </div>
        )}
      </div>

      {/* Hidden Input Field */}
      <form onSubmit={handleSubmit} className="absolute -left-full">
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="opacity-0 pointer-events-none"
          autoFocus
        />
      </form>

      {/* Status Bar */}
      <div className="bg-gray-800 text-gray-300 px-2 py-1 text-xs border-t border-gray-600">
        <div className="flex justify-between">
          <span>
            {isGameMode 
              ? 'CYBERPUNK ADVENTURE - Neo-Tokyo 2085' 
              : 'MS-DOS 6.22 - Retro Revival Edition'
            }
          </span>
          <span>
            {isGameMode 
              ? 'Type "quit" to exit game' 
              : 'Press F1 for Help'
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default DosTerminal;