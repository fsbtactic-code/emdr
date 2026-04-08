'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, ChevronRight } from 'lucide-react';

export const Sidebar = () => {
  const { messages, addMessage, isTyping, setIsTyping, currentPhase } = useStore();
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    
    addMessage({ id: Date.now().toString(), role: 'user', content: input });
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      addMessage({
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Я понимаю ваше состояние. Давайте начнем с медленной билатеральной стимуляции. Следите глазами за объектом.',
      });
      useStore.getState().setPlaying(true);
      useStore.getState().setSpeed(0.8);
    }, 2000);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`absolute right-0 top-1/2 -translate-y-1/2 bg-white/5 hover:bg-white/10 p-2 rounded-l-xl transition-all duration-300 z-40 ${isOpen ? 'translate-x-full' : 'translate-x-0'}`}
      >
        <Bot size={24} className="text-white/70" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
            className="absolute right-0 top-0 h-full w-96 glass-panel border-l border-white/10 shadow-2xl z-50 flex flex-col"
          >
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-900/40 flex items-center justify-center">
                  <Bot size={18} className="text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">EMDR AI Assistant</h3>
                  <p className="text-xs text-white/40">Phase: {currentPhase}</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <ChevronRight size={20} className="text-white/60" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 no-scrollbar">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === 'user' ? 'bg-white/10 text-white rounded-br-none' : 'bg-transparent border border-white/5 text-white/90 rounded-bl-none'}`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-transparent border border-white/5 px-4 py-3 rounded-2xl rounded-bl-none flex gap-1 items-center h-10 w-16 justify-center">
                    <motion.div className="w-1.5 h-1.5 bg-white/40 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} />
                    <motion.div className="w-1.5 h-1.5 bg-white/40 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} />
                    <motion.div className="w-1.5 h-1.5 bg-white/40 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-white/5">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ответить ассистенту..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
                />
                <button
                  onClick={handleSend}
                  className="absolute right-2 p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
