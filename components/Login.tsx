
import React, { useState } from 'react';

interface LoginProps {
  onBack: () => void;
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onBack, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'Cardbig' && password === 'Cardbig123##') {
      onLogin();
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="max-w-md w-full glass-card p-10 rounded-[2.5rem] border border-white/10 relative">
        <button onClick={onBack} className="absolute top-8 left-8 text-gray-400 hover:text-white transition-colors">
          <i className="fa-solid fa-arrow-left text-xl"></i>
        </button>
        
        <div className="text-center mb-10 mt-4">
          <div className="w-16 h-16 bg-gradient-to-tr from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fa-solid fa-shield-halved text-white text-3xl"></i>
          </div>
          <h2 className="text-3xl font-display font-bold text-white">Admin Access</h2>
          <p className="text-gray-400 mt-2">Please enter credentials to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2 ml-1">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-pink-500/50 transition-all"
              placeholder="Enter username"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2 ml-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-pink-500/50 transition-all"
              placeholder="Enter password"
              required
            />
          </div>
          
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button 
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 rounded-2xl transition-all transform active:scale-95 shadow-lg shadow-pink-600/20"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
