const LandingPage = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-base-dark text-text-mainDark font-sans selection:bg-primary selection:text-white">

      {/* 1. Header Navigation */}
      <nav className="px-6 py-5 md:px-12 md:py-8 flex justify-between items-center sticky top-0 bg-base-dark/70 backdrop-blur-xl z-50 border-b border-white/5">
        <h1 className="text-xl md:text-2xl font-black italic tracking-tighter">
          FIN<span className="text-primary font-normal">SMART</span>
        </h1>
        <button className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] border border-border-dark px-5 py-2 md:px-8 md:py-3 rounded-xl hover:border-primary hover:text-primary transition-all duration-300">
          Login
        </button>
      </nav>

      {/* 2. Hero Section */}
      <header className="px-6 pt-16 pb-20 md:pt-32 md:pb-40 text-center md:text-left relative overflow-hidden max-w-7xl mx-auto md:grid md:grid-cols-2 md:items-center md:gap-12">
        <div className="absolute top-20 left-1/2 md:left-1/4 -translate-x-1/2 w-64 h-64 md:w-96 md:h-96 bg-primary/10 blur-[100px] -z-10"></div>

        <div className="space-y-6 md:space-y-10">
          <h2 className="text-5xl md:text-7xl font-black leading-none tracking-tight uppercase">
            Revolusi Keuangan <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent-dark">
              Generasi Muda
            </span>
          </h2>
          <p className="text-sm md:text-lg text-text-mutedDark leading-relaxed max-w-70 md:max-w-md mx-auto md:mx-0 font-medium">
            Kuasai finansialmu dengan asisten AI cerdas, personal, dan berkelanjutan.
          </p>
          <button
            onClick={onStart}
            className="w-full max-w-70 md:max-w-55 bg-primary text-white font-black py-4.5 rounded-2xl shadow-[0_15px_35px_rgba(22,128,255,0.3)] active:scale-95 transition-all uppercase tracking-widest text-xs"
          >
            Mulai Sekarang
          </button>
        </div>

        {/* Mockup Desktop */}
        <div className="hidden md:block relative mt-12 md:mt-0">
          <div className="w-full h-112.5 bg-card-dark/40 border border-white/5 rounded-[3rem] shadow-2xl flex items-center justify-center italic text-text-mutedDark text-sm">
            [ Dashboard Preview Mockup ]
          </div>
        </div>
      </header>

      {/* 3. Problem Highlight */}
      <section className="px-6 py-14 md:py-24 bg-card-dark/30 border-y border-white/5">
        <div className="max-w-4xl mx-auto space-y-5 md:space-y-8">
          <div className="flex items-center gap-2 md:justify-center">
            <div className="w-8 h-px bg-danger-dark"></div>
            <h3 className="text-[10px] md:text-xs font-black text-danger-dark uppercase tracking-[0.3em]">The Problem</h3>
          </div>
          <div className="p-6 md:p-12 bg-linear-to-br from-card-dark to-base-dark border border-white/5 rounded-3xl md:rounded-[3rem]">
            <p className="text-sm md:text-2xl leading-relaxed font-medium md:text-center">
              Literasi keuangan pemuda masih di bawah <span className="text-danger-dark font-bold underline decoration-2 md:decoration-4">50%</span>. Saatnya berhenti terjebak dalam <span className="italic">lifestyle inflation</span>.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Fitur Unggulan - BENTO GRID MOBILE (Grid-cols-2) & DESKTOP (Grid-cols-3) */}
      <section className="px-6 py-20 md:py-32 space-y-10 md:space-y-16 max-w-7xl mx-auto">
        <div className="space-y-2 md:text-center">
          <h3 className="text-2xl md:text-5xl font-black italic uppercase tracking-tighter">Fitur Cerdas</h3>
          <p className="text-[10px] md:text-xs text-text-mutedDark uppercase tracking-widest font-bold">Teknologi Masa Depan</p>
        </div>

        {/* grid-cols-2 di HP, grid-cols-3 di Desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">

          {/* Fitur 1 */}
          <div className="col-span-2 md:col-span-1 p-7 md:p-10 bg-card-dark/50 backdrop-blur-md border border-white/5 rounded-[2.5rem] space-y-4 group">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-2xl md:text-4xl group-hover:scale-110 transition-transform">🤖</div>
            <div>
              <h4 className="font-bold text-lg md:text-xl">FinBot AI</h4>
              <p className="text-xs md:text-sm text-text-mutedDark mt-1 leading-relaxed">Asisten virtual berbasis NLP yang siap menjawab teka-teki keuanganmu 24/7.</p>
            </div>
          </div>

          {/* Fitur 2*/}
          <div className="p-6 md:p-10 bg-card-dark/50 backdrop-blur-md border border-white/5 rounded-4xl md:rounded-[2.5rem] space-y-2 md:space-y-4 flex flex-col justify-center">
            <div className="text-2xl md:text-4xl">📊</div>
            <h4 className="font-bold text-sm md:text-xl leading-tight">Dashboard</h4>
            <p className="text-[10px] md:text-sm text-text-mutedDark leading-relaxed">Visualisasi arus kas harian secara instan dan akurat.</p>
          </div>

          {/* Fitur 3*/}
          <div className="p-6 md:p-10 bg-card-dark/50 backdrop-blur-md border border-white/5 rounded-4xl md:rounded-[2.5rem] space-y-2 md:space-y-4 flex flex-col justify-center">
            <div className="text-2xl md:text-4xl">📈</div>
            <h4 className="font-bold text-sm md:text-xl leading-tight">Investment</h4>
            <p className="text-[10px] md:text-sm text-text-mutedDark leading-relaxed">Pantau kesiapan investasi masa depan dengan AI.</p>
          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="px-10 py-16 md:py-24 bg-card-dark/80 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 md:gap-0">
          <div className="text-center md:text-left space-y-4">
            <h1 className="text-lg md:text-2xl font-black italic tracking-tighter">
              FIN<span className="text-primary font-normal">SMART</span>
            </h1>
            <p className="text-[9px] md:text-xs text-text-mutedDark font-medium tracking-widest uppercase">
              &copy; 2026 FinSmart Project. All rights reserved.
            </p>
          </div>

          <div className="text-center md:text-right space-y-4">
            <p className="text-[10px] uppercase tracking-[0.4em] text-text-mutedDark font-black">Official Partner</p>
            <div className="flex flex-col items-center md:items-end gap-2">
              <p className="text-xs md:text-sm font-bold tracking-tight">DBS Foundation | Coding Camp 2026</p>
              <div className="w-12 h-0.5 bg-primary/30"></div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;