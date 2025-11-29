import React from 'react';
import { ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToContent = () => {
    const element = document.getElementById('mockup-studio');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-float -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float -z-10" style={{ animationDelay: '2s' }} />

      <div className="z-10 max-w-4xl mx-auto space-y-6 animate-fade-in">
        <h2 className="text-xl md:text-2xl text-accent font-medium tracking-wide uppercase">
          Design & Intelligence
        </h2>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-primary tracking-tighter leading-none">
          ROLAND<br />STUDIO
        </h1>
        <p className="text-lg md:text-xl text-primary/80 max-w-2xl mx-auto mt-8 font-light">
          探索 Roland 样机工作室、AI 智能助手与提示词专家的创意世界。
          <br />
          <span className="text-sm opacity-60 mt-2 block">Exploring the creative world of Roland Mockup Studio, AI Assistant, and Prompt Expert.</span>
        </p>

        <div className="pt-12">
          <button 
            onClick={scrollToContent}
            className="glass-button rounded-full p-4 animate-bounce"
            aria-label="Scroll down"
          >
            <ArrowDown className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};
