import logo from '../assets/logo.svg';

const LandingPage = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-base-dark text-text-mainDark font-sans selection:bg-primary selection:text-white">

      {/* 1. Header Navigation */}
      <nav className="px-6 py-3 md:px-12 md:py-4 flex justify-between items-center sticky top-0 bg-base-dark/70 backdrop-blur-xl z-50 border-b border-white/5">
        <img src={logo} alt="FinSmart Logo" className="h-6 md:h-8 object-contain" />
        <button className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] border border-border-dark px-5 py-2 md:px-6 md:py-2.5 rounded-xl hover:border-primary hover:text-primary transition-all duration-300 cursor-pointer">
          Login
        </button>
      </nav>

      {/* 2. Hero Section */}
      <header className="min-h-screen flex items-center px-6 md:px-12 relative overflow-hidden max-w-7xl mx-auto">
        <div className="absolute top-1/4 left-1/2 md:left-1/4 -translate-x-1/2 w-64 h-64 md:w-96 md:h-96 bg-primary/10 blur-[120px] -z-10"></div>

        <div className="md:grid md:grid-cols-2 md:items-center md:gap-12 w-full -mt-20 md:-mt-32">
          <div className="space-y-6 md:space-y-10 text-center md:text-left">
            <h2 className="text-5xl md:text-8xl font-black leading-[0.95] tracking-tighter uppercase">
              Revolusi Keuangan <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent-dark">
                Generasi Muda
              </span>
            </h2>
            <p className="text-sm md:text-xl text-text-mutedDark leading-relaxed max-w-70 md:max-w-lg mx-auto md:mx-0 font-medium">
              Kuasai finansialmu dengan asisten AI cerdas, personal, dan berkelanjutan.
            </p>
            <button
              onClick={onStart}
              className="w-full max-w-70 md:max-w-xs bg-primary text-white font-black py-4 md:py-5 rounded-2xl shadow-[0_20px_40px_rgba(22,128,255,0.3)] hover:-translate-y-1 hover:shadow-primary/40 transition-all uppercase tracking-widest text-xs cursor-pointer mx-auto md:mx-0 block"
            >
              Mulai Sekarang
            </button>
          </div>

          <div className="hidden md:flex justify-end relative">
            <div className="w-full max-w-md h-125 bg-card-dark/40 border border-white/5 rounded-[3.5rem] shadow-2xl flex flex-col items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent-dark/5 opacity-50"></div>
              <span className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-500"></span>
              <span className="italic text-text-mutedDark text-sm font-medium tracking-wide">[ Visualisasi Antarmuka FinSmart ]</span>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Problem Highlight */}
      <section className="min-h-screen flex items-center px-6 py-20 bg-card-dark/20 border-y border-white/5">
        <div className="max-w-5xl mx-auto w-full space-y-10">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-12 h-px bg-danger-dark"></div>
            <h3 className="text-xs font-black text-danger-dark uppercase tracking-[0.4em]">The Problem</h3>
          </div>
          <div className="p-8 md:p-20 bg-gradint-to-br from-card-dark to-base-dark border border-white/5 rounded-[3rem] md:rounded-[4rem] text-center md:text-left shadow-2xl relative overflow-hidden">
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-danger-dark/5 blur-[100px]"></div>
            <p className="text-xl md:text-4xl md:leading-[1.4] font-semibold text-white/90">
              Literasi keuangan pemuda masih di bawah <span className="text-danger-dark font-extrabold underline decoration-4 underline-offset-8">50%</span>. <br className="hidden md:block" />
              Saatnya berhenti terjebak dalam <span className="italic text-white">lifestyle inflation</span> yang tidak berujung.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Fitur Unggulan */}
      <section className="min-h-screen flex flex-col justify-center px-6 py-24 max-w-7xl mx-auto space-y-16">
        <div className="space-y-3 text-center md:text-left">
          <h3 className="text-3xl md:text-6xl font-black italic uppercase tracking-tighter">Fitur Cerdas</h3>
          <p className="text-xs text-text-mutedDark uppercase tracking-[0.3em] font-bold">Smart Protocol Technology</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Kotak 1 */}
          <div className="md:col-span-2 p-10 md:p-14 bg-card-dark/50 backdrop-blur-md border border-white/5 rounded-[3rem] flex flex-col justify-center space-y-5 hover:bg-card-dark/80 hover:border-primary/50 hover:-translate-y-2 transition-all duration-500 group">
            <div className="flex items-center gap-4">
              <div className="w-2 h-8 bg-primary rounded-full group-hover:h-12 transition-all duration-500"></div>
              <h4 className="font-bold text-2xl md:text-4xl text-white">FinBot AI</h4>
            </div>
            <p className="text-sm md:text-lg text-text-mutedDark leading-relaxed max-w-xl">
              Asisten virtual berbasis NLP yang siap menjawab teka-teki keuanganmu 24/7. Dapatkan saran finansial personal secara instan untuk strategi masa depan.
            </p>
          </div>

          {/* Kotak 2 */}
          <div className="p-10 bg-card-dark/50 backdrop-blur-md border border-white/5 rounded-[3rem] flex flex-col justify-center space-y-5 hover:bg-card-dark/80 hover:border-primary/50 hover:-translate-y-2 transition-all duration-500">
            <h4 className="font-bold text-2xl text-white">Real-time Dashboard</h4>
            <p className="text-sm text-text-mutedDark leading-relaxed">
              Visualisasi arus kas harian secara instan dan akurat langsung di pusat kendali Anda.
            </p>
          </div>

          {/* Kotak 3 */}
          <div className="md:col-span-3 p-10 md:p-14 bg-card-dark/50 backdrop-blur-md border border-white/5 rounded-[3rem] flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-card-dark/80 hover:border-primary/50 hover:-translate-y-2 transition-all duration-500 gap-8">
            <div className="space-y-4">
              <h4 className="font-bold text-2xl md:text-4xl text-white flex items-center gap-3">
                <span className="text-primary">✨</span>
                Investment Readiness
              </h4>
              <p className="text-sm md:text-lg text-text-mutedDark leading-relaxed max-w-3xl">
                Analisis pola keuangan otomatis untuk menghasilkan insight kesiapan investasi serta rekomendasi instrumen yang sesuai dengan profil risiko Anda.
              </p>
            </div>
            <button className="px-8 py-4 bg-white/5 rounded-2xl text-xs font-black uppercase tracking-widest border border-white/10 hover:bg-primary hover:text-white transition-all cursor-pointer whitespace-nowrap">
              Detail Fitur
            </button>
          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="px-10 py-16 bg-base-dark border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left flex flex-col items-center md:items-start space-y-4">
            <img src={logo} alt="FinSmart Logo" className="h-6 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" />
            <p className="text-[10px] text-text-mutedDark font-medium tracking-[0.2em] uppercase">
              &copy; 2026 FinSmart Project. Crafted for Excellence.
            </p>
          </div>
          <div className="text-center md:text-right space-y-4">
            <p className="text-[10px] uppercase tracking-[0.4em] text-text-mutedDark font-black">Powered By</p>
            <p className="text-sm font-bold tracking-tight text-white/80">DBS Foundation | Coding Camp 2026</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;