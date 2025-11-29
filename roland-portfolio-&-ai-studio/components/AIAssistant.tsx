import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Sparkles, User, Bot } from 'lucide-react';
import { createChatSession, sendMessageToChat } from '../services/geminiService';
import { Message, AppStatus } from '../types';

export const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 'init', role: 'model', text: '你好！我是 Roland AI 小助手。有什么可以帮你的吗？', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const chatSession = useRef(createChatSession());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || status === AppStatus.LOADING) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setStatus(AppStatus.LOADING);

    try {
      const responseText = await sendMessageToChat(chatSession.current, userMsg.text);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, botMsg]);
      setStatus(AppStatus.SUCCESS);
    } catch (error) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "抱歉，我现在有点累，请稍后再试。",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMsg]);
      setStatus(AppStatus.ERROR);
    }
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-primary/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse gap-12 items-center">
        
        <div className="flex-1 space-y-6 text-right md:text-left">
          <div className="flex items-center justify-end md:justify-start gap-3 text-accent mb-2">
             <span className="text-lg font-bold">PROJECT 02</span>
             <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-primary">
            Roland<br/>AI 小助手
          </h2>
          <p className="text-xl text-primary/80 leading-relaxed">
            您的私人智能伴侣。随时为您解答问题、提供建议或仅仅是闲聊。
            <span className="block text-sm mt-2 opacity-60">
              Your personal intelligent companion.
            </span>
          </p>
        </div>

        <div className="flex-1 w-full max-w-md mx-auto">
          <div className="glass-panel rounded-3xl overflow-hidden h-[500px] flex flex-col shadow-2xl border-t border-white/40">
            
            {/* Chat Header */}
            <div className="bg-white/10 p-4 flex items-center gap-3 border-b border-white/10 backdrop-blur-md">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-2 text-sm font-bold opacity-70">Roland AI Chat</span>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-accent text-white'}`}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-3 rounded-2xl max-w-[80%] text-sm md:text-base leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-primary text-[#d9d5cd] rounded-tr-none' 
                      : 'bg-white/40 text-primary rounded-tl-none border border-white/30'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
               {status === AppStatus.LOADING && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
                      <Bot size={16} className="text-white" />
                    </div>
                     <div className="bg-white/40 p-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                        <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" />
                        <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce delay-100" />
                        <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce delay-200" />
                     </div>
                  </div>
               )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/20 backdrop-blur-md">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="glass-input w-full rounded-xl px-4 py-3 placeholder:text-primary/40 focus:outline-none"
                  disabled={status === AppStatus.LOADING}
                />
                <button 
                  onClick={handleSend}
                  disabled={status === AppStatus.LOADING}
                  className="glass-button p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
