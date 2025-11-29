import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-primary/5">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
        <h3 className="text-2xl font-bold text-primary">ROLAND STUDIO</h3>
        <p className="text-primary/60 text-sm">
          © {new Date().getFullYear()} Roland Studio. All rights reserved.
        </p>
        <div className="flex justify-center gap-6 text-sm font-medium text-accent">
          <a href="#" className="hover:underline">Twitter</a>
          <a href="#" className="hover:underline">Instagram</a>
          <a href="#" className="hover:underline">Email</a>
        </div>
      </div>
    </footer>
  );
};
