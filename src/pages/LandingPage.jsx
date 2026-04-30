const LandingPage = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-base-dark text-text-mainDark font-sans selection:bg-primary selection:text-white">
      
      {/* 1. Header Navigation - More Sleek */}
      <nav className="px-6 py-5 flex justify-between items-center sticky top-0 bg-base-dark/70 backdrop-blur-xl z-50 border-b border-white/5">
        <h1 className="text-xl font-black italic tracking-tighter">
          FIN<span className="text-primary font-normal">SMART</span>
        </h1>
        <button className="text-[10px] font-bold uppercase tracking-[0.2em] border border-border-dark px-5 py-2 rounded-xl hover:border-primary hover:text-primary transition-all duration-300">
          Login
        </button>
      </nav>

      {/* 2. Hero Section - Typography Focus */}
      <header className="px-6 pt-16 pb-24 text-center space-y-10 relative overflow-hidden">
        {/* Background Glow Ornament */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 blur-[100px] -z-10"></div>
        
        <div className="space-y-6">
          <h2 className="text-5xl font-black leading-[1] tracking-tight uppercase">
            Revolusi Keuangan <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-dark">
              Generasi Muda
            </span>
          </h2>
          <p className="text-sm text-text-mutedDark leading-relaxed max-w-[280px] mx-auto font-medium">
            Kuasai finansialmu dengan asisten AI cerdas, personal, dan berkelanjutan.
          </p>
        </div>
        
        <button 
          onClick={onStart}
          className="w-full max-w-[280px] bg-primary text-white font-black py-4.5 rounded-2xl shadow-[0_15px_35px_rgba(22,128,255,0.3)] active:scale-95 transition-all uppercase tracking-widest text-xs"
        >
          Mulai Sekarang
        </button>
      </header>

      {/* 3. Problem Highlight - Minimalist Box */}
      <section className="px-6 py-14 bg-card-dark/30 border-y border-white/5">
        <div className="space-y-5">
          <div className="flex items-center gap-2">
             <div className="w-8 h-[1px] bg-danger-dark"></div>
             <h3 className="text-[10px] font-black text-danger-dark uppercase tracking-[0.3em]">The Problem</h3>
          </div>
          <div className="p-6 bg-gradient-to-br from-card-dark to-base-dark border border-white/5 rounded-3xl">
            <p className="text-sm leading-relaxed font-medium">
              Literasi keuangan pemuda masih di bawah <span className="text-danger-dark font-bold underline decoration-2">50%</span>. Saatnya berhenti terjebak dalam <span className="italic">lifestyle inflation</span>.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Fitur Unggulan - Glass Bento Grid */}
      <section className="px-6 py-20 space-y-10">
        <div className="space-y-2">
            <h3 className="text-2xl font-black italic uppercase tracking-tighter">Fitur Cerdas</h3>
            <p className="text-[10px] text-text-mutedDark uppercase tracking-widest font-bold">Teknologi Masa Depan</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 p-7 bg-card-dark/50 backdrop-blur-md border border-white/5 rounded-[2.5rem] space-y-4 group">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">🤖</div>
            <div>
                <h4 className="font-bold text-lg">FinBot AI</h4>
                <p className="text-xs text-text-mutedDark mt-1 leading-relaxed">Asisten virtual berbasis NLP yang siap menjawab teka-teki keuanganmu 24/7.</p>
            </div>
          </div>
          
          <div className="p-7 bg-card-dark/50 backdrop-blur-md border border-white/5 rounded-[2.5rem] space-y-4">
            <div className="text-2xl">📊</div>
            <h4 className="font-bold text-sm">Real-time <br/> Dashboard</h4>
          </div>
          
          <div className="p-7 bg-card-dark/50 backdrop-blur-md border border-white/5 rounded-[2.5rem] space-y-4">
            <div className="text-2xl">📈</div>
            <h4 className="font-bold text-sm">Smart <br/> Investment</h4>
          </div>
        </div>
      </section>

      {/* 5. Footer - Clean & Professional */}
      <footer className="px-10 py-16 bg-card-dark/80 border-t border-white/5 text-center space-y-10">
        <div className="space-y-4">
          <p className="text-[10px] uppercase tracking-[0.4em] text-text-mutedDark font-black">Official Partner</p>
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs font-bold tracking-tight">DBS Foundation | Coding Camp 2026</p>
            <div className="w-12 h-[2px] bg-primary/30"></div>
          </div>
        </div>
        
        <div className="space-y-4 pt-4">
          <h1 className="text-lg font-black italic tracking-tighter opacity-50">
            FIN<span className="text-primary font-normal">SMART</span>
          </h1>
          <p className="text-[9px] text-text-mutedDark font-medium tracking-widest uppercase">
            &copy; 2026 FinSmart Project. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;