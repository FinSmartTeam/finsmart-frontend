import { useState } from 'react';
import logo from '../assets/logo.svg';

import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

const Auth = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-base-dark text-text-mainDark font-sans flex md:grid md:grid-cols-2">
      
      {/* --- BRANDING (Desktop Only) --- */}
      <div className="hidden md:flex flex-col justify-center px-20 bg-card-dark/30 border-r border-white/5">
        <div className="max-w-md space-y-6">
          <img src={logo} alt="FinSmart" className="h-10 mb-8" />
          <h2 className="text-5xl font-extrabold text-white leading-tight">
            Kelola Keuangan <br />
            <span className="text-primary text-4xl font-medium">Tanpa Ribet.</span>
          </h2>
          <p className="text-text-mutedDark text-lg leading-relaxed">
            Mulai langkah cerdasmu hari ini. Bergabung dengan komunitas yang melek finansial dengan bantuan teknologi AI.
          </p>
          <div className="pt-8 flex items-center gap-4">
             <div className="w-10 h-px bg-primary/50"></div>
             <span className="text-[10px] uppercase tracking-[0.3em] text-text-mutedDark font-bold">FinSmart Protocol v1.0</span>
          </div>
        </div>
      </div>

      {/* --- FORMULIR --- */}
      <div className="flex-1 flex items-center justify-center px-8 py-10 bg-base-dark">
        <div className="w-full max-w-90 space-y-8">
          
          <div className="text-center space-y-2">
            <img src={logo} alt="FinSmart" className="h-8 mx-auto mb-6 md:hidden" />
            <h3 className="text-2xl font-bold text-white tracking-tight">
              {isLogin ? 'Selamat Datang' : 'Daftar Akun'}
            </h3>
            <p className="text-sm text-text-mutedDark">
              {isLogin ? 'Masukkan kredensial akun Anda.' : 'Lengkapi data untuk akses penuh sistem.'}
            </p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-primary uppercase ml-1 tracking-widest">Nama Lengkap</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-mutedDark" />
                  <input 
                    type="text" 
                    placeholder="Nama Lengkap Anda" 
                    className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white outline-none focus:border-primary transition-all"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-primary uppercase ml-1 tracking-widest">Alamat Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-mutedDark" />
                <input 
                  type="email" 
                  placeholder="nama@email.com" 
                  className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white outline-none focus:border-primary transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-bold text-primary uppercase tracking-widest">Kata Sandi</label>
                {isLogin && <a href="#" className="text-[10px] text-text-mutedDark hover:text-primary transition-colors">Lupa?</a>}
              </div>
              
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-mutedDark" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="w-full pl-11 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white outline-none focus:border-primary transition-all"
                />
                {/* Tombol Icon Show/Hide */}
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-mutedDark hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              onClick={onAuthSuccess}
              className="w-full bg-primary text-white font-bold py-4 rounded-xl mt-4 shadow-lg shadow-primary/20 active:scale-[0.98] transition-all text-sm cursor-pointer"
            >
              {isLogin ? 'Masuk ke Sistem' : 'Buat Akun Sekarang'}
            </button>
          </form>

          {/* Divider & Social */}
          <div className="flex items-center gap-4 py-2">
            <div className="flex-1 h-px bg-white/5"></div>
            <span className="text-[9px] text-text-mutedDark uppercase tracking-widest font-bold">Atau</span>
            <div className="flex-1 h-px bg-white/5"></div>
          </div>

          <div className="space-y-6">
            <button className="w-full bg-transparent text-white border border-white/10 font-medium py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-white/5 transition-all text-xs cursor-pointer">
              <img src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" className="w-4 h-4" alt="Google" />
              Lanjutkan dengan Google
            </button>

            <p className="text-center text-xs text-text-mutedDark">
              {isLogin ? "Belum punya akun? " : "Sudah memiliki akun? "}
              <span 
                onClick={() => {
                  setIsLogin(!isLogin);
                  setShowPassword(false);
                }}
                className="text-primary font-bold cursor-pointer hover:underline"
              >
                {isLogin ? 'Daftar Gratis' : 'Masuk di sini'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;