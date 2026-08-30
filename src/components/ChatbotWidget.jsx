import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, Bot, MessageSquare, Minus, Send, Sparkles, Trash2 } from 'lucide-react';
import { askGIA } from '../utils/gemini';

const welcomeMessage = {
  id: 'welcome',
  sender: 'gia',
  text: 'Hai! Saya GIA (Ghazwah Intelligent Assistant). Ada soalan tentang produk teknologi, anak syarikat, atau peluang kolaborasi bersama Ghazwah Group?',
  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

const quickReplies = [
  { text: 'Apa produk utama Ghazwah?', label: 'Produk utama' },
  { text: 'Bagaimana nak collab?', label: 'Jom collab' },
  { text: 'Boleh hubungi WhatsApp?', label: 'WhatsApp kami' },
];

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([welcomeMessage]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatMode, setChatMode] = useState('standby');
  const isSendingRef = useRef(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    messagesEndRef.current?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }, [messages, isTyping]);

  const resetChat = () => {
    setMessages([
      {
        ...welcomeMessage,
        text: 'Sembang dibersihkan. Hai! Saya GIA. Sila tanya apa-apa mengenai Ghazwah Group.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setChatMode('standby');
  };

  const handleSendMessage = async (textToSend) => {
    const cleanText = textToSend.trim();
    if (!cleanText || isSendingRef.current) return;

    isSendingRef.current = true;
    const userMsg = {
      id: `${Date.now()}-user`,
      sender: 'user',
      text: cleanText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    const history = messages
      .filter((message) => message.id !== 'welcome')
      .slice(-8)
      .map((message) => ({ sender: message.sender, text: message.text }));

    try {
      const response = await askGIA(history, cleanText);
      setChatMode(response.mode === 'online' ? 'online' : 'offline');
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-gia`,
          sender: 'gia',
          text: response.text,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch {
      setChatMode('offline');
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-gia-error`,
          sender: 'gia',
          text: 'Maaf, berlaku ralat sambungan. Sila hubungi kami terus melalui WhatsApp di +60 19-513 2821.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsTyping(false);
      isSendingRef.current = false;
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSendMessage(inputText);
  };

  const modeLabel = chatMode === 'online'
    ? 'Online dengan Gemini AI'
    : chatMode === 'offline'
      ? 'Mod offline'
      : 'Sedia membantu';

  return (
    <div className="fixed bottom-5 right-4 z-50 flex flex-col items-end sm:right-6">
      <div
        inert={!isOpen ? '' : undefined}
        className={`relative z-50 mb-4 flex h-[520px] w-[min(calc(100vw-2rem),24rem)] flex-col overflow-hidden rounded-3xl border border-white/10 bg-ghz-black-deep/95 shadow-corporate backdrop-blur-xl transition-all duration-300 ${
          isOpen ? 'pointer-events-auto translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-6 scale-95 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ghz-blue-electric/10 text-ghz-blue-electric ring-1 ring-ghz-blue-electric/20">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display text-sm font-semibold text-ghz-white">GIA Assistant</span>
                <Sparkles className="h-3.5 w-3.5 text-ghz-gold" />
              </div>
              <span className="mt-1 flex items-center gap-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ghz-silver-muted">
                <span className={`h-1.5 w-1.5 rounded-full ${chatMode === 'online' ? 'bg-ghz-green' : chatMode === 'offline' ? 'bg-ghz-gold' : 'bg-ghz-blue-electric'}`} />
                {modeLabel}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {messages.length > 1 && (
              <button
                type="button"
                onClick={resetChat}
                className="rounded-full p-2 text-ghz-silver-muted transition hover:bg-white/[0.06] hover:text-ghz-white focus:outline-none focus-visible:ring-2 focus-visible:ring-ghz-blue-electric"
                aria-label="Padam sembang"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 text-ghz-silver-muted transition hover:bg-white/[0.06] hover:text-ghz-white focus:outline-none focus-visible:ring-2 focus-visible:ring-ghz-blue-electric"
              aria-label="Tutup chatbot"
            >
              <Minus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {chatMode === 'offline' && (
          <div className="flex items-center gap-2 border-b border-ghz-gold/20 bg-ghz-gold/10 px-4 py-2 text-xs text-ghz-gold">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>GIA sedang menjawab menggunakan pangkalan maklumat terbina.</span>
          </div>
        )}

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
          {messages.map((message) => {
            const isGia = message.sender === 'gia';
            return (
              <div key={message.id} className={`flex max-w-[84%] flex-col ${isGia ? 'self-start' : 'self-end'}`}>
                <div
                  className={`rounded-2xl px-4 py-3 text-xs leading-6 ${
                    isGia
                      ? 'rounded-tl-md border border-white/10 bg-white/[0.055] text-ghz-silver'
                      : 'rounded-tr-md bg-ghz-blue-electric text-white'
                  }`}
                >
                  <span className="whitespace-pre-line">{message.text}</span>
                </div>
                <span className={`mt-1 text-[0.62rem] text-ghz-silver-muted ${isGia ? 'self-start' : 'self-end'}`}>
                  {message.time}
                </span>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex max-w-[84%] flex-col self-start">
              <div className="flex items-center gap-1 rounded-2xl rounded-tl-md border border-white/10 bg-white/[0.055] px-4 py-3">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ghz-blue-electric" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ghz-blue-electric [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ghz-blue-electric [animation-delay:300ms]" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
          {quickReplies.map((reply) => (
            <button
              key={reply.text}
              type="button"
              onClick={() => handleSendMessage(reply.text)}
              disabled={isTyping}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-ghz-silver-muted transition hover:border-ghz-blue-electric/40 hover:text-ghz-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {reply.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleFormSubmit} className="flex gap-2 border-t border-white/10 p-3">
          <input
            type="text"
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
            placeholder="Tulis soalan anda..."
            disabled={isTyping}
            className="input-field rounded-full py-2.5"
            aria-label="Mesej kepada GIA"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ghz-blue-electric text-white transition hover:bg-[#3b82e8] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-ghz-silver-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ghz-blue-electric"
            aria-label="Hantar mesej kepada GIA"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>

      {isOpen && <button type="button" className="fixed inset-0 z-40 cursor-default md:hidden" onClick={() => setIsOpen(false)} aria-label="Tutup chatbot" />}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="relative z-50 flex h-14 w-14 items-center justify-center rounded-full bg-ghz-blue-electric text-white shadow-blue-soft transition hover:-translate-y-0.5 hover:bg-[#3b82e8] focus:outline-none focus-visible:ring-2 focus-visible:ring-ghz-blue-electric focus-visible:ring-offset-2 focus-visible:ring-offset-ghz-black"
        aria-label={isOpen ? 'Tutup Chatbot GIA' : 'Buka Chatbot GIA'}
        aria-expanded={isOpen}
      >
        {isOpen ? <Minus className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>
    </div>
  );
}
