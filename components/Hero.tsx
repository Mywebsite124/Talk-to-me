
import React from 'react';

interface HeroProps {
  onScrollToPlans: () => void;
  heroImageUrl?: string;
  trialUrl?: string;
}

const Hero: React.FC<HeroProps> = ({ onScrollToPlans, heroImageUrl, trialUrl }) => {
  const handleAction = () => {
    if (trialUrl) {
      window.location.href = trialUrl;
    } else {
      onScrollToPlans();
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-black">
        <img 
          src={heroImageUrl || "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1920&auto=format&fit=crop"} 
          alt="Talk to me Hero" 
          className="w-full h-full object-cover opacity-60 animate-pulse-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-[#0a0a0a]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <span className="inline-block px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-500 text-sm font-semibold mb-6 tracking-widest uppercase">
          Private & Exclusive Access
        </span>
        <h1 className="text-5xl md:text-8xl font-display font-bold mb-8 leading-tight">
          Talk to <span className="gradient-text">Me</span> Directly
        </h1>
        <p className="text-gray-300 text-xl md:text-2xl mb-12 font-light max-w-2xl mx-auto">
          Welcome to my inner circle. Subscribe now to unlock high-definition video calls and private conversations in total privacy.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={onScrollToPlans}
            className="w-full sm:w-auto px-8 py-4 bg-pink-600 hover:bg-pink-700 text-white rounded-full text-lg font-bold transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-pink-600/30 flex items-center justify-center gap-3"
          >
            <i className="fa-solid fa-video"></i>
            Buy Video Call Subscription
          </button>
          <a 
            href="#gallery"
            className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full text-lg font-bold transition-all flex items-center justify-center gap-3"
          >
            See My Photos
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer opacity-50">
        <i className="fa-solid fa-chevron-down text-2xl"></i>
      </div>
    </div>
  );
};

export default Hero;
