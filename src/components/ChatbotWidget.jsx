import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, Minus, Bot, Sparkles, AlertCircle, Trash2 } from 'lucide-react';
import { askGIA } from '../utils/gemini';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'gia',
      text: 'Hai! Saya GIA (Ghazwah Intelligent Assistant). Ada sebarang soalan tentang produk teknologi siap, 4 anak syarikat, atau peluang kolaborasi bersama Ghazwah Group?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatMode, setChatMode] = useState('online'); // 'online' or 'offline'
  const isSendingRef = useRef(false); // Guard against rapid double-clicks
  
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Check if API key exists and update GIA's mode badge
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey || apiKey.trim() === '') {
      setChatMode('offline');
    } else {
      setChatMode('online');
    }
  }, []);

  const handleSendMessage = async (textToSend) => {
    if (!textToSend.trim()) return;
    // Guard against rapid double-click on quick reply buttons before
    // React re-renders to disable them
    if (isSendingRef.current) return;
    isSendingRef.current = true;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Prepare history for Gemini (excluding the welcome message and mapping format)
    const history = messages
      .filter(m => m.id !== 'welcome')
      .map(m => ({ sender: m.sender, text: m.text }));

    try {
      const response = await askGIA(history, textToSend);
      
      // Update badge if fallback was triggered
      if (response.mode === 'offline' || response.mode === 'offline-fallback') {
        setChatMode('offline');
      } else {
        setChatMode('online');
      }

      const giaMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'gia',
        text: response.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, giaMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'gia',
        text: "Maaf, berlaku ralat sambungan. Sila hubungi kami terus melalui WhatsApp di +60 19-513 2821.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
      isSendingRef.current = false;
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(inputText);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'gia',
        text: 'Sembang dibersihkan. Hai! Saya GIA. Sila tanya apa-apa mengenai Ghazwah Group.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const quickReplies = [
    { text: 'Apa produk Ghazwah?', label: '💡 Produk Utama' },
    { text: 'Bagaimana nak collab?', label: '🤝 Jom Collab' },
    { text: 'Boleh hubungi WhatsApp?', label: '📞 WhatsApp Kami' }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Expanded Chat Box Window — CSS-only transition (no framer-motion dependency)
           inert attribute prevents keyboard focus from reaching hidden form controls. */}
      <div
        inert={!isOpen}
        className={`w-[320px] sm:w-[380px] h-[520px] bg-ghz-black border border-ghz-silver/10 rounded-xl shadow-2xl flex flex-col overflow-hidden mb-4 backdrop-blur-md transition-all duration-300 ease-out ${
          isOpen
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
        }`}
      >
        
        {/* Header */}
        <div className="bg-ghz-blue-deep/50 border-b border-ghz-silver/10 px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-ghz-blue-electric/15 border border-ghz-blue-electric/30 flex items-center justify-center text-ghz-blue-electric">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-sm text-ghz-white leading-none">GIA</span>
                <Sparkles className="w-3 h-3 text-ghz-blue-electric" />
              </div>
              {/* Status Indicator Badge */}
              <span className="flex items-center gap-1 mt-1 text-[9px] font-mono leading-none tracking-wider text-ghz-silver/70">
                <span className={`w-1.5 h-1.5 rounded-full ${chatMode === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
                {chatMode === 'online' ? 'ONLINE (GEMINI AI)' : 'MOD OFFLINE'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            {messages.length > 1 && (
              <button 
                onClick={clearChat}
                className="p-1.5 text-ghz-silver/60 hover:text-ghz-red hover:bg-ghz-blue-deep/30 rounded transition-colors"
                aria-label="Padam sembang"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-ghz-silver hover:text-ghz-white hover:bg-ghz-blue-deep/30 rounded transition-colors"
              aria-label="Tutup chatbot"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Offline Alert Banner */}
        {chatMode === 'offline' && (
          <div className="bg-amber-500/10 border-b border-amber-500/20 px-3 py-1.5 flex items-center gap-1.5 text-[10px] text-amber-500 font-mono">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Menjawab menggunakan pangkalan maklumat terbina.</span>
          </div>
        )}

        {/* Messages Body */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4 flex flex-col">
          {messages.map((msg) => {
            const isGia = msg.sender === 'gia';
            return (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[80%] ${isGia ? 'self-start' : 'self-end'}`}
              >
                <div
                  className={`px-4 py-3 rounded-lg text-xs leading-relaxed ${
                    isGia
                      ? 'bg-ghz-blue-deep/35 border border-ghz-silver/5 text-ghz-white rounded-tl-none'
                      : 'bg-ghz-blue-electric text-ghz-white rounded-tr-none'
                  }`}
                >
                  <span className="whitespace-pre-line">{msg.text}</span>
                </div>
                <span className={`text-[9px] font-mono text-ghz-silver/60 mt-1 ${isGia ? 'self-start' : 'self-end'}`}>
                  {msg.time}
                </span>
              </div>
            );
          })}

          {/* GIA Typing Indicator */}
          {isTyping && (
            <div className="flex flex-col self-start max-w-[80%]">
              <div className="bg-ghz-blue-deep/35 border border-ghz-silver/5 px-4 py-3 rounded-lg rounded-tl-none flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-ghz-blue-electric animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-ghz-blue-electric animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-ghz-blue-electric animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies Strip */}
        <div className="px-4 py-2 bg-ghz-black border-t border-ghz-silver/5 flex flex-wrap gap-1.5">
          {quickReplies.map((reply, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(reply.text)}
              disabled={isTyping}
              className="px-2.5 py-1 rounded bg-ghz-blue-deep/20 border border-ghz-silver/10 hover:border-ghz-blue-electric/40 text-[10px] text-ghz-silver hover:text-ghz-white transition-all disabled:opacity-50 font-sans"
            >
              {reply.label}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleFormSubmit} className="p-3 bg-ghz-black border-t border-ghz-silver/10 flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Tulis soalan anda di sini..."
            disabled={isTyping}
            className="flex-grow px-3.5 py-2.5 bg-ghz-blue-deep/20 border border-ghz-silver/10 focus:border-ghz-blue-electric rounded text-xs text-ghz-white placeholder-ghz-silver/60 outline-none transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="p-2.5 rounded bg-ghz-blue-electric hover:bg-ghz-blue-electric/90 text-ghz-white disabled:opacity-40 disabled:bg-ghz-blue-deep/20 transition-all flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>

      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-ghz-blue-electric hover:bg-ghz-red text-ghz-white shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-[1.05] relative group focus:outline-none"
        style={{
          boxShadow: '0 0 15px rgba(46, 124, 246, 0.4)'
        }}
        aria-label="Buka Chatbot"
      >
        {/* Glow pulsing ring around button */}
        <span className="absolute inset-0 rounded-full border border-ghz-blue-electric/40 animate-ping group-hover:border-ghz-red/40"></span>
        
        {isOpen ? (
          <Minus className="w-6 h-6" />
        ) : (
          <MessageSquare className="w-6 h-6" />
        )}
      </button>

    </div>
  );
}
