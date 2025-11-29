import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MockupStudio } from './components/MockupStudio';
import { AIAssistant } from './components/AIAssistant';
import { PromptAssistant } from './components/PromptAssistant';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen text-primary selection:bg-accent selection:text-white">
      <Header />
      <main>
        <Hero />
        <MockupStudio />
        <AIAssistant />
        <PromptAssistant />
      </main>
      <Footer />
    </div>
  );
};

export default App;
