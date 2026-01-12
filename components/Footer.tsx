
import React from 'react';

interface FooterProps {
  onContactSupport: () => void;
}

const Footer: React.FC<FooterProps> = ({ onContactSupport }) => {
  return (
    <footer className="bg-black py-20 px-4 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-tr from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-video text-white"></i>
              </div>
              <span className="text-2xl font-display font-bold">Talk to me<span className="text-pink-500">.</span></span>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              An exclusive digital space for premium video calls. 
              Connect with me in a safe, private, and intimate environment.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-pink-500 transition-colors">Home</a></li>
              <li><a href="#gallery" className="hover:text-pink-500 transition-colors">Gallery</a></li>
              <li><a href="#pricing" className="hover:text-pink-500 transition-colors">Plans</a></li>
              <li><button onClick={onContactSupport} className="hover:text-pink-500 transition-colors">Contact Support</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Follow Me</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-pink-600 transition-all">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-pink-600 transition-all">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-pink-600 transition-all">
                <i className="fa-brands fa-tiktok"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:row justify-between items-center text-gray-500 text-sm gap-4">
          <p>© 2024 Talk to me. All rights reserved.</p>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
