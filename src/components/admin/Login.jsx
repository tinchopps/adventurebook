import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import textures from '../../styles/textures.module.css';

/**
 * Login Component - Admin authentication form
 */
const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    if (!result.success) {
      setError('Credenciales incorrectas. Intenta de nuevo.');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900">
      <div className={`
        ${textures.kraftPaper}
        p-4 sm:p-6 md:p-8 rounded-lg shadow-2xl
        w-full max-w-sm sm:max-w-md
        relative
      `}>
        <div className={textures.agedPaper} style={{ position: 'absolute', inset: 0, opacity: 0.3, borderRadius: '0.5rem' }} />
        
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl font-caveat text-leather-burgundy text-center mb-1 sm:mb-2">
            📚 Admin
          </h1>
          <p className="text-center font-handwriting text-xs sm:text-sm text-amber-800/70 mb-4 sm:mb-6">
            Acceso para editar el libro
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block font-handwriting text-sm sm:text-base text-amber-900 mb-1 sm:mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md border-2 border-amber-300 
                  bg-white/80 font-handwriting text-sm sm:text-base
                  focus:outline-none focus:border-leather-burgundy
                  transition-colors"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div>
              <label className="block font-handwriting text-sm sm:text-base text-amber-900 mb-1 sm:mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md border-2 border-amber-300 
                  bg-white/80 font-handwriting text-sm sm:text-base
                  focus:outline-none focus:border-leather-burgundy
                  transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="bg-red-100 border border-red-300 text-red-700 px-3 py-2 sm:px-4 sm:py-3 rounded-md font-handwriting text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`
                w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-md
                bg-leather-burgundy hover:bg-leather-dark
                text-amber-100 font-caveat text-lg sm:text-xl
                transition-colors duration-300
                ${loading ? 'opacity-50 cursor-not-allowed' : ''}
                shadow-lg hover:shadow-xl
              `}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-4 sm:mt-6 text-center">
            <a 
              href="/" 
              className="font-handwriting text-sm sm:text-base text-amber-700 hover:text-leather-burgundy transition-colors"
            >
              ← Volver al libro
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
