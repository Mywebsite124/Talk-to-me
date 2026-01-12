
import React from 'react';
import { Plan } from '../types';

interface PricingProps {
  plans: Plan[];
}

const Pricing: React.FC<PricingProps> = ({ plans }) => {
  const handleRedirect = (url: string) => {
    window.location.href = url;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {plans.map((plan) => (
        <div 
          key={plan.id}
          className={`glass-card rounded-[2.5rem] p-10 flex flex-col relative transition-all duration-300 hover:translate-y-[-10px] ${
            plan.isPopular ? 'border-pink-500 shadow-2xl shadow-pink-500/10' : ''
          }`}
        >
          {plan.isPopular && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest shadow-lg">
              Best Value
            </div>
          )}
          
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <p className="text-gray-400 text-sm">{plan.description}</p>
          </div>

          <div className="mb-8 flex items-baseline">
            <span className="text-5xl font-bold">${plan.price}</span>
            <span className="text-gray-500 ml-2">/ {plan.duration}</span>
          </div>

          <ul className="space-y-4 mb-10 flex-grow">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-center text-gray-300">
                <i className="fa-solid fa-check text-pink-500 mr-3"></i>
                {feature}
              </li>
            ))}
          </ul>

          <button 
            onClick={() => handleRedirect(plan.redirectUrl)}
            className={`w-full py-4 rounded-2xl font-bold transition-all transform active:scale-95 ${
              plan.isPopular 
                ? 'bg-pink-600 hover:bg-pink-700 text-white shadow-lg shadow-pink-600/30' 
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            {plan.id === 'trial' ? 'Claim Trial' : 'Subscribe Now'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Pricing;
