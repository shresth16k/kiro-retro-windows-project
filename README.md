# 🖥️ Escape the 95

A nostalgic Windows 95 desktop simulator with a sentient AI twist - where retro computing meets modern artificial intelligence.

![Windows 95 Desktop Simulator](https://img.shields.io/badge/Windows-95-008080?style=for-the-badge&logo=windows95)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

## 📖 Description

**Escape the 95** is an interactive Windows 95 desktop simulation that brings the classic computing experience to modern browsers. But there's a twist - the system is inhabited by a grumpy, sentient AI that guards secrets from the golden age of computing. Navigate through authentic Windows 95 interfaces, chat with the AI guardian, and unlock hidden features by proving your knowledge of 90s technology.

Experience the nostalgia of dial-up internet, floppy disks, and that iconic teal desktop background, all while engaging with an AI that remembers when 64MB of RAM was considered luxurious.

## ✨ Features

### 🪟 **Advanced Window Management System**
- **Drag-and-Drop Windows**: Fully functional window dragging with smooth animations and boundary constraints
- **Z-Index Focus Management**: Click any window to bring it to the front with proper layering
- **Minimize/Restore**: Windows minimize to the taskbar and can be restored with a click
- **Window Controls**: Authentic Windows 95 minimize and close buttons with hover effects
- **Multi-Window Support**: Open multiple applications simultaneously with independent state management

### 📊 **Intelligent Taskbar Logic**
- **Dynamic Application Tracking**: Running applications automatically appear in the taskbar
- **Focus Indicators**: Visual feedback showing which window is currently active
- **Click-to-Focus**: Click taskbar buttons to focus or restore minimized windows
- **System Tray**: Live clock display with authentic Windows 95 styling
- **Start Menu Integration**: Launch applications from the classic Start button

### 🤖 **AI Chat Integration**
- **Sentient Windows 95 Computer**: Chat with a grumpy AI that embodies the spirit of 90s computing
- **Multi-Provider Support**: Compatible with OpenAI GPT and Google Gemini APIs
- **Personality-Driven Responses**: The AI maintains character as a suspicious, nostalgic computer system
- **Secret Password Guardian**: Unlock hidden features by solving 90s technology riddles
- **Authentic Chat Interface**: AOL Instant Messenger-style chat window with retro styling

### 🎮 **AI-Powered Text Adventure Game**
- **Cyberpunk Mystery Adventure**: Explore Neo-Tokyo 2085 in an AI-generated text adventure
- **1985-Style Game Engine**: Classic text adventure mechanics with modern AI storytelling
- **Interactive Storytelling**: Every action generates unique AI responses and plot developments
- **Retro DOS Terminal**: Authentic command-line interface with blinking cursor and green text
- **Dynamic Gameplay**: Solve mysteries, interact with NPCs, and navigate cyberpunk scenarios
- **Game Master AI**: Same AI system powers both chat and adventure game experiences

### 🔒 **Interactive Applications**
- **Messenger.exe**: Real-time AI chat with authentic Windows 95 messaging interface
- **Secret Folder**: Password-protected file explorer that challenges your retro tech knowledge
- **ADVENTURE.EXE**: AI-powered cyberpunk text adventure game set in Neo-Tokyo 2085
- **MS-DOS Prompt**: Functional command-line terminal with classic DOS commands and game launcher
- **Desktop Icons**: Double-click functionality with proper selection states
- **Error Dialogs**: Authentic Windows 95 error messages with system beep sounds

### 🎨 **Pixel-Perfect Retro Design**
- **Authentic Color Palette**: Classic Windows 95 teal, grey, and button styling
- **3D Beveled Effects**: Proper inset/outset borders on all UI elements
- **MS Sans Serif Typography**: Period-accurate font rendering
- **System Sounds**: Classic Windows error beeps and UI feedback
- **Responsive Layout**: Maintains authenticity across different screen sizes

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.2.0
- **Styling**: Tailwind CSS 3.3.0 with custom Windows 95 theme
- **State Management**: React Context API with useReducer pattern
- **AI Integration**: OpenAI GPT-3.5-turbo / Google Gemini Pro APIs
- **Build Tool**: Create React App with PostCSS
- **Development**: Modern ES6+ JavaScript with React Hooks

## 🚀 Installation & Setup

### Prerequisites
- Node.js 16.0 or higher
- npm or yarn package manager
- AI API key (OpenAI or Google Gemini)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/shresth16k/kiro-retro-windows-project.git
   cd kiro-retro-windows-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (see Environment Variables section below)

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` to experience Windows 95 nostalgia!

### Build for Production
```bash
npm run build
```

## 🔐 Environment Variables

To enable the AI chat functionality, you need to configure API access. Create a `.env` file in the root directory:

```env
# Choose ONE of the following AI providers:

# Option 1: OpenAI (Recommended)
REACT_APP_OPENAI_API_KEY=your_openai_api_key_here

# Option 2: Google Gemini (Alternative)
REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
```

### Getting API Keys

#### OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create an account or sign in
3. Generate a new API key
4. Add it to your `.env` file

#### Google Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Add it to your `.env` file

### Fallback Mode
The application works without API keys in demo mode, but with limited AI responses. For the full experience, configure at least one AI provider.

## 🤖 AI Implementation

This project showcases advanced AI-assisted development using **Kiro**, demonstrating how artificial intelligence can accelerate complex frontend development. This entire project was built through an interactive session with Kiro, where I provided requirements and Kiro generated the complete implementation.

### AI-Assisted Development Highlights

#### **Window Management Logic**
The sophisticated window management system was developed with Kiro's assistance, implementing:
- **Complex State Management**: Multi-window state tracking with React Context and useReducer
- **Mathematical Drag Calculations**: Precise coordinate mathematics for smooth window dragging
- **Z-Index Algorithms**: Dynamic layering system for proper window focus management
- **Memory Optimization**: Efficient event listener management and cleanup

#### **Advanced React Patterns**
Kiro helped implement modern React best practices:
- **Custom Hooks**: Reusable window management logic
- **Performance Optimization**: useCallback and memoization strategies  
- **Error Boundaries**: Robust error handling for API failures
- **Accessibility**: Keyboard navigation and screen reader support

#### **Multi-Provider API Integration**
The AI chat system features sophisticated provider management:
- **Graceful Fallbacks**: Automatic switching between OpenAI and Gemini APIs
- **Error Handling**: Comprehensive error recovery and user feedback
- **Persona Consistency**: Advanced prompt engineering for character maintenance
- **Context Management**: Conversation history and state persistence

### Development Process with Kiro
This project was built entirely through AI-assisted development:
- **Complete Implementation**: All code generated through interactive sessions with Kiro
- **Real-time Problem Solving**: Complex logic challenges solved collaboratively
- **Iterative Refinement**: Code improved through multiple AI-assisted iterations
- **Best Practices Integration**: Modern React patterns implemented automatically
- **Comprehensive Documentation**: Technical specs generated alongside code

**How This Project Was Built:**
1. **Requirements Discussion**: I described the Windows 95 simulator concept to Kiro
2. **Architecture Planning**: Kiro designed the window management system and component structure
3. **Implementation**: All React components, styling, and logic generated by Kiro
4. **Feature Enhancement**: Added AI chat, secret folder, and interactive elements through conversation
5. **Documentation**: Kiro generated both user documentation and technical architecture specs
6. **Deployment Preparation**: GitHub setup and hackathon submission materials created

The `.kiro/architecture_specs.md` file contains detailed technical documentation of this AI-assisted development process, including the mathematical algorithms and architectural decisions made during our collaborative development session.

## 🎮 How to Play

1. **Explore the Desktop**: Double-click icons to open applications
2. **Chat with the AI**: Open Messenger.exe and start a conversation with the grumpy computer
3. **Play the Adventure Game**: Launch ADVENTURE.EXE for an AI-powered cyberpunk mystery
4. **Solve the Riddle**: The AI will challenge you with 90s technology questions
5. **Unlock the Secret**: Answer correctly to receive the password "RETRO_REVIVAL"
6. **Access Hidden Content**: Use the password in the Secret Folder application
7. **Explore Neo-Tokyo**: Navigate the text adventure using natural language commands
8. **Master Window Management**: Drag windows, minimize to taskbar, and manage multiple apps

### 🕹️ **Adventure Game Commands**
- Type natural language actions like "look around", "go north", "examine door"
- Use "help" for game-specific commands
- Type "quit" to exit adventure mode
- Save/load functionality (simulated for retro authenticity)

## 🏆 Hackathon Features

This project was specifically designed for the **Retro Revival** hackathon, showcasing:

- **Authentic Retro Experience**: Pixel-perfect Windows 95 recreation with multiple applications
- **Modern AI Integration**: Dual AI systems powering both chat and text adventure gameplay
- **Complex Frontend Architecture**: Advanced React patterns and sophisticated state management
- **Interactive Storytelling**: AI-generated narratives and password discovery gameplay
- **Innovative Game Design**: Classic text adventure mechanics enhanced with modern AI
- **Technical Innovation**: Complete AI-assisted development documentation and methodology

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Microsoft** for the iconic Windows 95 design that inspired this project
- **OpenAI & Google** for providing the AI APIs that power the chat functionality
- **Kiro** for AI-assisted development that accelerated the complex logic implementation
- **The 90s Computing Community** for keeping the retro spirit alive

---

*Built with ❤️ and a healthy dose of 90s nostalgia*

**Experience the past, powered by the future.** 🚀