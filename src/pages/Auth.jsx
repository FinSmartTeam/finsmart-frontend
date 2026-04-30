import { useState } from 'react';

const Auth = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-base-dark text-text-mainDark font-sans flex flex-col px-8 py-10 relative overflow-hidden">
      
      {/* Glow Effect Ornament */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Header Branding */}
      <div className="text-center mt-12 mb-12 relative z-10">
        <h1 className="text-4xl font-black italic tracking-tighter text-white mb-2">
          FIN<span className="text-primary font-normal">SMART</span>
        </h1>
        <p className="text-[10px] uppercase tracking-[0.3em] text-text-mutedDark font-bold">
          {isLogin ? 'Mulai langkah finansial cerdasmu' : 'Buat akun untuk pantau keuanganmu'}
        </p>
      </div>

      {/* Form Area */}
      <div className="flex-1 relative z-10 max-w-sm mx-auto w-full">
        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
          
          {/* Input Nama Lengkap (Register Only) */}
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-primary ml-1">Nama Lengkap</label>
              <input 
                type="text" 
                placeholder="Siapa namamu?" 
                className="w-full p-4 bg-card-dark border border-white/5 rounded-2xl text-sm text-white outline-none focus:border-primary/50 transition-all placeholder:text-text-mutedDark"
              />
            </div>
          )}

          {/* Input Email */}
          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase tracking-widest text-primary ml-1">Email</label>
            <input 
              type="email" 
              placeholder={isLogin ? "contoh@mail.com" : "gunakan email aktif"} 
              className="w-full p-4 bg-card-dark border border-white/5 rounded-2xl text-sm text-white outline-none focus:border-primary/50 transition-all placeholder:text-text-mutedDark"
            />
          </div>

          {/* Input Password */}
          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase tracking-widest text-primary ml-1">Kata Sandi</label>
            <input 
              type="password" 
              placeholder={isLogin ? "Masukkan kata sandi" : "Minimal 8 karakter"} 
              className="w-full p-4 bg-card-dark border border-white/5 rounded-2xl text-sm text-white outline-none focus:border-primary/50 transition-all placeholder:text-text-mutedDark"
            />
            {isLogin && (
              <div className="text-right pr-1">
                <a href="#" className="text-[10px] text-primary font-bold hover:underline">Lupa Kata Sandi?</a>
              </div>
            )}
          </div>

          {/* Tombol Authorize */}
          <button 
            onClick={onAuthSuccess}
            className="w-full bg-primary text-white font-black py-4 rounded-2xl shadow-[0_15px_30px_rgba(22,128,255,0.2)] mt-2 active:scale-95 transition-all uppercase tracking-[0.2em] text-xs"
          >
            {isLogin ? 'Authorize' : 'Initialize'}
          </button>
        </form>

        {/* Switcher */}
        <div className="text-center mt-8 text-[12px] text-text-mutedDark">
          {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
          <span 
            onClick={() => setIsLogin(!isLogin)}
            className="text-white font-bold cursor-pointer hover:text-primary transition-colors underline decoration-primary/30 underline-offset-4"
          >
            {isLogin ? 'Daftar Sekarang' : 'Masuk di sini'}
          </span>
        </div>

        {/* Divider */}
        <div className="flex items-center my-8 gap-4">
          <div className="flex-1 h-px bg-white/5"></div>
          <span className="text-[10px] font-black text-text-mutedDark uppercase tracking-widest">Atau</span>
          <div className="flex-1 h-px bg-white/5"></div>
        </div>

        {/* Google Button */}
        <button className="w-full bg-transparent text-white border border-white/10 font-bold py-3.5 rounded-2xl flex items-center justify-center gap-3 active:bg-white/5 transition-all text-xs tracking-wider">
          <img src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" className="w-4 h-4" alt="Google" />
          MASUK DENGAN GOOGLE
        </button>
      </div>

      {/* Security Info */}
      <footer className="mt-auto pt-10 text-center opacity-30">
        <p className="text-[9px] font-black uppercase tracking-[0.3em]">Encrypted Protocol Active</p>
      </footer>
    </div>
  );
};

export default Auth;