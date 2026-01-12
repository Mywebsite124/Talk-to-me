
import React, { useState } from 'react';
import { Plan, ImageItem } from '../types';
import { supabase } from '../lib/supabase';

interface AdminPanelProps {
  plans: Plan[];
  images: ImageItem[];
  heroImageUrl: string;
  onUpdatePlans: (plans: Plan[]) => void;
  onUpdateImages: (images: ImageItem[]) => void;
  onUpdateHero: (url: string) => void;
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  plans, 
  images, 
  heroImageUrl, 
  onUpdatePlans, 
  onUpdateImages, 
  onUpdateHero, 
  onLogout 
}) => {
  const [activeTab, setActiveTab] = useState<'images' | 'pricing'>('images');
  const [localPlans, setLocalPlans] = useState<Plan[]>([...plans]);
  const [localImages, setLocalImages] = useState<ImageItem[]>([...images]);
  const [localHeroUrl, setLocalHeroUrl] = useState<string>(heroImageUrl);
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    try {
      // This configData object captures EVERYTHING to be saved in Supabase
      const configData = {
        plans: localPlans,        // Contains prices and REDIRECT URLs for all buttons
        images: localImages,      // Contains all 10 gallery image URLs
        heroImageUrl: localHeroUrl // Contains the main header image URL
      };

      // Upsert: Updates the row if 'main' exists, otherwise inserts it.
      const { error: upsertError } = await supabase
        .from('site_configs')
        .upsert({ id: 'main', data: configData }, { onConflict: 'id' });

      if (upsertError) throw upsertError;

      // Update the main App state so the changes show up immediately on the home page
      onUpdatePlans(localPlans);
      onUpdateImages(localImages);
      onUpdateHero(localHeroUrl);

      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err: any) {
      console.error('Error syncing with Supabase:', err);
      setError(err.message || 'Database sync failed. Please check your SQL policies.');
    } finally {
      setIsSaving(false);
    }
  };

  const updatePlan = (id: string, field: keyof Plan, value: string | number) => {
    setLocalPlans(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const updateImage = (id: number, url: string) => {
    setLocalImages(prev => prev.map(img => img.id === id ? { ...img, url } : img));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-pink-500/20">
              <i className="fa-solid fa-cloud-bolt"></i>
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold">Cloud Sync Dashboard</h1>
              <p className="text-gray-400">Manage your dating site content live via Supabase</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className={`bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-bold transition-all flex items-center space-x-3 shadow-xl shadow-green-900/20 ${isSaving ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
            >
              {isSaving ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <i className="fa-solid fa-floppy-disk"></i>
              )}
              <span>{isSaving ? 'Updating...' : 'Save & Publish'}</span>
            </button>
            <button 
              onClick={onLogout}
              className="bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-2xl font-bold border border-white/10 transition-all active:scale-95"
            >
              Back to Home
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-5 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl flex items-center gap-4 animate-shake">
            <i className="fa-solid fa-circle-exclamation text-xl"></i>
            <div>
              <p className="font-bold">Sync Error</p>
              <p className="text-sm opacity-80">{error}</p>
            </div>
          </div>
        )}

        <div className="flex space-x-8 mb-10 border-b border-white/5">
          <button 
            onClick={() => setActiveTab('images')}
            className={`pb-4 px-2 font-bold transition-all border-b-2 ${activeTab === 'images' ? 'border-pink-500 text-pink-500' : 'border-transparent text-gray-500 hover:text-white'}`}
          >
            Visual Images
          </button>
          <button 
            onClick={() => setActiveTab('pricing')}
            className={`pb-4 px-2 font-bold transition-all border-b-2 ${activeTab === 'pricing' ? 'border-pink-500 text-pink-500' : 'border-transparent text-gray-500 hover:text-white'}`}
          >
            Subscription & Links
          </button>
        </div>

        {activeTab === 'images' && (
          <div className="space-y-12 animate-in fade-in duration-500">
            {/* Main Hero Image Section */}
            <div className="glass-card p-10 rounded-[2.5rem] border border-pink-500/20 bg-pink-500/5 shadow-2xl">
              <div className="flex items-center gap-3 mb-8">
                <i className="fa-solid fa-image text-pink-500 text-xl"></i>
                <h3 className="text-xl font-bold text-white tracking-wide">Website Header Background</h3>
              </div>
              <div className="flex flex-col md:flex-row gap-10">
                <div className="w-full md:w-80 aspect-[16/9] md:aspect-square rounded-3xl overflow-hidden bg-neutral-900 flex-shrink-0 border-4 border-white/5 shadow-xl">
                  <img src={localHeroUrl} alt="Header Preview" className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow w-full space-y-6">
                  <div>
                    <label className="block text-gray-400 text-sm font-semibold mb-3">Header Image URL</label>
                    <input 
                      type="text" 
                      value={localHeroUrl}
                      onChange={(e) => setLocalHeroUrl(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-pink-500 transition-all shadow-inner"
                      placeholder="Paste your main background image link..."
                    />
                  </div>
                  <p className="text-sm text-gray-400 opacity-60 italic">
                    Note: Changing this URL and hitting "Save" will update the top image on your live website instantly.
                  </p>
                </div>
              </div>
            </div>

            {/* Gallery Images Section */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <i className="fa-solid fa-images text-pink-500 text-xl"></i>
                <h3 className="text-xl font-bold text-white tracking-wide">Gallery Images (10 Slots)</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {localImages.map((img) => (
                  <div key={img.id} className="glass-card p-6 rounded-3xl flex items-center space-x-6 border border-white/5 hover:border-white/20 transition-all">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-neutral-900 border border-white/10">
                      <img src={img.url} alt={`Preview ${img.id}`} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Slot {img.id} URL</label>
                      <input 
                        type="text" 
                        value={img.url}
                        onChange={(e) => updateImage(img.id, e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition-all"
                        placeholder="Image URL..."
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div className="space-y-10 animate-in fade-in duration-500">
            <div className="bg-pink-500/10 border border-pink-500/20 p-6 rounded-3xl mb-4">
              <p className="text-pink-500 text-sm flex items-center gap-3 font-medium">
                <i className="fa-solid fa-link"></i>
                Redirection URLs: These are the links where users go when they click your "Subscribe" or "Claim Trial" buttons.
              </p>
            </div>
            
            {localPlans.map((plan) => (
              <div key={plan.id} className="glass-card p-10 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-all">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-500">
                    <i className={`fa-solid ${plan.id === 'trial' ? 'fa-hourglass-start' : plan.id === 'weekly' ? 'fa-calendar-days' : 'fa-star'}`}></i>
                  </div>
                  <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{plan.name}</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <label className="block text-gray-400 text-sm font-semibold mb-3">Price in USD ($)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500 font-bold">$</span>
                      <input 
                        type="number" 
                        value={plan.price}
                        onChange={(e) => updatePlan(plan.id, 'price', parseInt(e.target.value) || 0)}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl pl-10 pr-6 py-4 text-white font-bold focus:outline-none focus:border-pink-500 transition-all"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-400 text-sm font-semibold mb-3">Redirection Link (External Platform)</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={plan.redirectUrl}
                        onChange={(e) => updatePlan(plan.id, 'redirectUrl', e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-pink-500 transition-all pl-12"
                        placeholder="https://t.me/yourprofile or your-pay-link..."
                      />
                      <i className="fa-solid fa-up-right-from-square absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showToast && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-green-500 text-white px-10 py-5 rounded-[2rem] shadow-2xl font-bold flex items-center space-x-4 animate-bounce z-[200]">
          <i className="fa-solid fa-check-double text-xl"></i>
          <span>Synced to Supabase successfully!</span>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
