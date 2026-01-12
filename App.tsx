
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import { DEFAULT_PLANS, DEFAULT_IMAGES, DEFAULT_HERO_IMAGE } from './constants';
import { Plan, ImageItem } from './types';
import { supabase } from './lib/supabase';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'login' | 'admin'>('home');
  const [plans, setPlans] = useState<Plan[]>(DEFAULT_PLANS);
  const [images, setImages] = useState<ImageItem[]>(DEFAULT_IMAGES);
  const [heroImageUrl, setHeroImageUrl] = useState<string>(DEFAULT_HERO_IMAGE);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from Supabase
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const { data, error } = await supabase
          .from('site_configs')
          .select('data')
          .eq('id', 'main')
          .single();

        if (data && data.data) {
          const config = data.data;
          if (config.plans) setPlans(config.plans);
          if (config.images) setImages(config.images);
          if (config.heroImageUrl) setHeroImageUrl(config.heroImageUrl);
        } else if (error && error.code === 'PGRST116') {
          // Row not found, optionally initialize it
          console.log('No config found in Supabase, using defaults.');
        }
      } catch (err) {
        console.error('Error fetching Supabase config:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfig();
  }, []);

  const handleUpdatePlans = (updatedPlans: Plan[]) => {
    setPlans(updatedPlans);
  };

  const handleUpdateImages = (updatedImages: ImageItem[]) => {
    setImages(updatedImages);
  };

  const handleUpdateHero = (url: string) => {
    setHeroImageUrl(url);
  };

  const scrollToSection = (id: string) => {
    if (view !== 'home') {
      setView('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (view === 'login') {
    return <Login onBack={() => setView('home')} onLogin={() => setView('admin')} />;
  }

  if (view === 'admin') {
    return <AdminPanel 
      plans={plans} 
      images={images} 
      heroImageUrl={heroImageUrl}
      onUpdatePlans={handleUpdatePlans} 
      onUpdateImages={handleUpdateImages} 
      onUpdateHero={handleUpdateHero}
      onLogout={() => setView('home')} 
    />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar onScrollToPlans={() => scrollToSection('pricing')} />
      
      <main>
        <Hero 
          onScrollToPlans={() => scrollToSection('pricing')} 
          heroImageUrl={heroImageUrl} 
          trialUrl={plans.find(p => p.id === 'trial')?.redirectUrl}
        />
        
        <section id="gallery" className="py-20 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">A Glimpse Into My World</h2>
            <p className="text-gray-400 text-lg">Exclusive moments captured just for you.</p>
          </div>
          <Gallery images={images} />
        </section>

        <section id="pricing" className="py-20 bg-[#0f0f0f] relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-pink-500/10 blur-[120px] rounded-full"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-pink-500 font-semibold tracking-widest uppercase text-sm">Premium Access</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mt-2 mb-4">Video Call Subscriptions</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">Choose a plan that fits your desire for connection. I'm waiting to talk to you.</p>
            </div>
            <Pricing plans={plans} />
          </div>
        </section>
      </main>

      <Footer onContactSupport={() => setView('login')} />
      <ChatBot plans={plans} />
    </div>
  );
};

export default App;
