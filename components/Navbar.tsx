
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onScrollToPlans: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onScrollToPlans }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0a]/80 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-tr from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
            <i className="fa-solid fa-video text-white text-xl"></i>
          </div>
          <span className="text-2xl font-display font-bold tracking-tight">Talk to me<span className="text-pink-500">.</span></span>
        </div>

        <div className="hidden md:flex items-center space-x-8 text-sm font-medium uppercase tracking-wider">
          <a href="#" className="hover:text-pink-500 transition-colors">Home</a>
          <a href="#gallery" className="hover:text-pink-500 transition-colors">Gallery</a>
          <button onClick={onScrollToPlans} className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2.5 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-pink-600/20">
            Start Calling
          </button>
        </div>

        <button className="md:hidden text-2xl">
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
