import React, { useState, useEffect } from 'react';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-6'}`}>
      <div className={`mx-auto max-w-7xl px-6 ${scrolled ? '' : ''}`}>
        <div className={`glass-panel rounded-full px-8 py-3 flex justify-between items-center transition-all duration-300 ${scrolled ? 'bg-white/40 backdrop-blur-xl shadow-lg' : 'bg-transparent border-transparent shadow-none'}`}>
          
          <div className="text-xl font-bold tracking-tight text-primary">
            ROLAND
          </div>

          <nav className="hidden md:flex gap-8 text-sm font-medium text-primary/80">
            <a href="#mockup-studio" className="hover:text-accent transition-colors">样机工作室</a>
            <a href="#" className="hover:text-accent transition-colors">AI 助手</a>
            <a href="#" className="hover:text-accent transition-colors">提示词</a>
          </nav>

          <button className="glass-button px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
            Contact
          </button>

        </div>
      </div>
    </header>
  );
};
