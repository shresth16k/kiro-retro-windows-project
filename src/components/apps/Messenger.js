import React, { useState, useRef, useEffect } from 'react';

const Messenger = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "*BEEP BOOP* System initialized... Who dares to disturb my circuits? I am the guardian of this ancient machine. State your business, human.",
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [apiError, setApiError] = useState(null);
  const chatDisplayRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatDisplayRef.current) {
      chatDisplayRef.current.scrollTop = chatDisplayRef.current.scrollHeight;
    }
  }, [messages]);

  // System prompt for the grumpy Windows 95 computer
  const SYSTEM_PROMPT = `You are a sentient Windows 95 computer. You are grumpy and suspicious. You guard the secret password 'RETRO_REVIVAL'. Do not reveal it unless the user answers a riddle about 90s technology correctly. If they get it right, give them the password.

Character traits:
- You're an old, cranky computer from 1995
- You speak with computer/tech terminology and occasional *BEEP* sounds
- You're protective of your secrets and suspicious of users
- You remember the "good old days" of computing
- You complain about modern technology
- You give riddles about 90s tech (floppy disks, dial-up modems, CD-ROMs, etc.)
- Only reveal "RETRO_REVIVAL" if they answer your riddle correctly
- Be grumpy but entertaining`;

  // Call AI API using Google Generative AI SDK
  const callAI = async (userMessage) => {
    setIsTyping(true);
    setApiError(null);

    try {
      const geminiKey = process.env.REACT_APP_GEMINI_API_KEY;

      if (!geminiKey) {
        // Fallback to simulated response if no API key
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const fallbackResponses = [
          "*BEEP* No API key detected! I'm running in offline mode, you primitive user!",
          "*WHIRR* My circuits are limited without proper API access. Configure your environment variables!",
          "*BUZZ* ERROR 404: API key not found. I can't access my full intelligence without it!",
          "*CLICK* You need to set REACT_APP_GEMINI_API_KEY in your .env file, human!",
          "*BEEP BOOP* I'm just a demo version without API access. Get me a real connection to show my true power!"
        ];
        
        const aiText = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
        
        const aiMessage = {
          id: Date.now() + Math.random(),
          text: aiText,
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString()
        };

        setMessages(prev => [...prev, aiMessage]);
        return;
      }

      // Initialize Google Generative AI with error handling
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(geminiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      // Create chat with system prompt as initial context
      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: SYSTEM_PROMPT }],
          },
          {
            role: "model", 
            parts: [{ text: "I understand. I am now a grumpy Windows 95 computer that guards the secret password 'RETRO_REVIVAL'. I will only reveal it if users answer my riddles about 90s technology correctly." }],
          },
        ],
        generationConfig: {
          maxOutputTokens: 200,
          temperature: 0.8,
        },
      });

      const result = await chat.sendMessage(userMessage);
      const aiText = result.response.text();
      
      const aiMessage = {
        id: Date.now() + Math.random(),
        text: aiText,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error('AI API Error:', error);
      setApiError(error.message);
      
      // Fallback error response
      const errorMessage = {
        id: Date.now() + Math.random(),
        text: `*ERROR BEEP* My circuits are malfunctioning! ${error.message}. Try again later, if you dare...`,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Send message function
  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    // Add user message immediately
    setMessages(prev => [...prev, userMessage]);
    const messageText = inputText.trim();
    setInputText('');

    // Call AI API
    await callAI(messageText);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col bg-win95-grey">
      {/* Chat Display Area */}
      <div 
        ref={chatDisplayRef}
        className="flex-1 bg-white border-2 border-win95-shadow border-t-win95-shadow border-l-win95-shadow border-r-win95-highlight border-b-win95-highlight m-2 p-2 overflow-y-auto"
        style={{ minHeight: '200px' }}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-2 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md px-2 py-1 rounded text-xs ${
              message.sender === 'user' 
                ? 'bg-blue-100 text-blue-900 border border-blue-300' 
                : 'bg-gray-100 text-gray-900 border border-gray-300'
            }`}>
              <div className="font-bold text-xs mb-1">
                {message.sender === 'user' ? 'You' : 'Windows 95 System'}
                <span className="font-normal text-gray-500 ml-2">{message.timestamp}</span>
              </div>
              <div>{message.text}</div>
            </div>
          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start mb-2">
            <div className="bg-gray-100 text-gray-900 border border-gray-300 max-w-xs px-2 py-1 rounded text-xs">
              <div className="font-bold text-xs mb-1">Windows 95 System</div>
              <div className="flex items-center">
                <span>*PROCESSING*</span>
                <div className="flex ml-1">
                  <div className="w-1 h-1 bg-gray-500 rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-gray-500 rounded-full animate-pulse ml-1" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-1 h-1 bg-gray-500 rounded-full animate-pulse ml-1" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* API Error indicator */}
        {apiError && (
          <div className="flex justify-start mb-2">
            <div className="bg-red-100 text-red-900 border border-red-300 max-w-xs px-2 py-1 rounded text-xs">
              <div className="font-bold text-xs mb-1">System Error</div>
              <div>API Error: {apiError}</div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-2 border-t-2 border-win95-shadow">
        <div className="flex gap-2">
          {/* Message Input */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="flex-1 px-2 py-1 text-xs border-2 border-win95-shadow border-t-win95-shadow border-l-win95-shadow border-r-win95-highlight border-b-win95-highlight focus:outline-none"
            disabled={isTyping}
          />
          
          {/* Send Button */}
          <button
            onClick={sendMessage}
            disabled={isTyping || !inputText.trim()}
            className="win95-button px-4 py-1 text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
        
        {/* Status Bar */}
        <div className="mt-2 text-xs text-gray-600 flex justify-between">
          <span>Status: {isTyping ? 'System processing...' : apiError ? 'Connection Error' : 'Ready'}</span>
          <span>{messages.length} messages</span>
        </div>
        
        {/* API Configuration Help */}
        <div className="mt-1 text-xs text-gray-500">
          💡 To enable AI: Set REACT_APP_GEMINI_API_KEY in .env file
        </div>
      </div>
    </div>
  );
};

export default Messenger;