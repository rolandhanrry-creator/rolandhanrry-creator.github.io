import React, { useState } from 'react';
import { Wand2, Copy, Check } from 'lucide-react';
import { generateRefinedPrompt } from '../services/geminiService';
import { AppStatus } from '../types';

export const PromptAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [copied, setCopied] = useState(false);

  const handleRefine = async () => {
    if (!input.trim()) return;
    setStatus(AppStatus.LOADING);
    setOutput('');
    
    try {
      const refined = await generateRefinedPrompt(input);
      setOutput(refined);
      setStatus(AppStatus.SUCCESS);
    } catch (e) {
      setOutput("Could not refine prompt. Please try again.");
      setStatus(AppStatus.ERROR);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-12">
        
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-3 text-accent mb-2">
             <Wand2 className="w-6 h-6" />
             <span className="text-lg font-bold">PROJECT 03</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-primary">
            Roland<br/>AI 提示词助手
          </h2>
          <p className="text-xl text-primary/80 leading-relaxed">
            将简单的想法转化为专业级 AI 提示词。释放创造力，从未如此简单。
            <span className="block text-sm mt-2 opacity-60">
              Transform simple ideas into professional-grade AI prompts.
            </span>
          </p>
        </div>

        <div className="flex-1 w-full space-y-4">
          
          {/* Input Card */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <label className="text-sm font-bold uppercase tracking-wider text-primary/60">Input Idea</label>
            <textarea 
              className="w-full h-32 glass-input rounded-xl p-4 resize-none focus:outline-none"
              placeholder="e.g., A cyberpunk cat in neon city..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="flex justify-end">
              <button 
                onClick={handleRefine}
                disabled={status === AppStatus.LOADING || !input.trim()}
                className="glass-button px-6 py-2 rounded-xl flex items-center gap-2 font-bold disabled:opacity-50"
              >
                {status === AppStatus.LOADING ? (
                  <>Thinking...</>
                ) : (
                  <>
                    <Wand2 size={16} /> Refine
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Output Card */}
          {(output || status === AppStatus.LOADING) && (
             <div className="glass-panel p-6 rounded-3xl space-y-4 border-accent/30 relative overflow-hidden transition-all duration-500 animate-fade-in">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold uppercase tracking-wider text-accent">Refined Prompt</label>
                  {output && (
                    <button 
                      onClick={copyToClipboard}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors text-primary"
                      title="Copy"
                    >
                      {copied ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
                    </button>
                  )}
                </div>
                
                <div className="bg-white/40 p-4 rounded-xl min-h-[120px] text-primary/90 leading-relaxed border border-white/20">
                  {status === AppStatus.LOADING ? (
                    <div className="space-y-2 animate-pulse">
                      <div className="h-4 bg-primary/10 rounded w-3/4"></div>
                      <div className="h-4 bg-primary/10 rounded w-full"></div>
                      <div className="h-4 bg-primary/10 rounded w-5/6"></div>
                    </div>
                  ) : (
                    output
                  )}
                </div>
             </div>
          )}

        </div>

      </div>
    </section>
  );
};
