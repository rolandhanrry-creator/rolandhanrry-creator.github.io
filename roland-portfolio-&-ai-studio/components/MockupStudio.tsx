import React from 'react';
import { Layers, Image as ImageIcon, Upload, Monitor } from 'lucide-react';

export const MockupStudio: React.FC = () => {
  return (
    <section id="mockup-studio" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        
        {/* Text Content */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-3 text-accent mb-2">
            <Layers className="w-6 h-6" />
            <span className="text-lg font-bold">PROJECT 01</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-primary">
            Roland<br/>样机工作室
          </h2>
          <p className="text-xl text-primary/80 leading-relaxed">
            一键样机生成工具。无需复杂的 PS 操作，只需拖拽即可将您的设计融入真实场景。
            <span className="block text-sm mt-2 opacity-60">
              One-click mockup generator. Integrate your designs into real scenes instantly.
            </span>
          </p>
          <button className="glass-button px-8 py-3 rounded-xl font-bold text-lg mt-4 flex items-center gap-2">
            立即体验 <Monitor className="w-4 h-4" />
          </button>
        </div>

        {/* Visual/Demo Area */}
        <div className="flex-1 w-full">
          <div className="glass-panel rounded-3xl p-8 aspect-square md:aspect-[4/3] relative flex flex-col items-center justify-center text-primary/50 border-2 border-dashed border-primary/20 hover:border-accent/50 transition-colors cursor-pointer group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none rounded-3xl" />
            
            <div className="relative z-10 flex flex-col items-center gap-4 group-hover:scale-105 transition-transform duration-300">
              <div className="w-24 h-24 rounded-full bg-background flex items-center justify-center shadow-inner">
                <Upload className="w-10 h-10 text-accent" />
              </div>
              <p className="text-lg font-medium group-hover:text-accent transition-colors">
                拖拽图片到此处上传
              </p>
              <p className="text-sm opacity-60">支持 PNG, JPG, WEBP</p>
            </div>

            {/* Decorative Mockup Elements */}
            <div className="absolute bottom-6 right-6 p-4 glass-panel rounded-xl shadow-lg transform rotate-[-5deg]">
              <ImageIcon className="w-6 h-6 text-primary" />
            </div>
            <div className="absolute top-6 left-6 p-4 glass-panel rounded-xl shadow-lg transform rotate-[5deg]">
              <Layers className="w-6 h-6 text-accent" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
