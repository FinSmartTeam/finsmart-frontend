import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  PieChart, 
  Target, 
  TrendingUp,
  ArrowRight 
} from 'lucide-react';
import logo from '../assets/logo.svg';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-base-dark text-text-mainDark font-sans selection:bg-primary selection:text-white">

      {/* --- 1. NAVBAR --- */}
      <nav className="px-6 py-4 md:px-10 flex justify-between items-center fixed top-0 w-full bg-base-dark/80 backdrop-blur-xl z-50 border-b border-white/5">
        <img src={logo} alt="FinSmart Logo" className="h-6 object-contain cursor-pointer hover:opacity-80 transition-all" onClick={() => navigate('/')} />
        <button 
          onClick={() => navigate('/auth')}
          className="text-[10px] md:text-xs font-bold uppercase tracking-widest border border-border-dark px-5 py-2 rounded-lg hover:border-primary hover:text-primary transition-all duration-300 cursor-pointer"
        >
          Masuk
        </button>
      </nav>

      {/* --- 2. HERO SECTION  --- */}
      <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        {/* Subtle Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-primary/10 blur-[100px] -z-10 rounded-full animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-accent-dark/10 blur-[100px] -z-10 rounded-full"></div>

        <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center z-10 pt-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-bold tracking-widest uppercase mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            Fintech AI Generasi Muda
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tighter uppercase mb-6">
            Kelola Keuangan <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent-dark">
              Lebih Cerdas dengan AI
            </span>
          </h1>

          {/* Sub Headline */}
          <p className="text-sm md:text-lg text-text-mutedDark leading-relaxed max-w-2xl mx-auto font-medium mb-10">
            Bantu kamu memahami cashflow, menabung lebih efektif, dan membuat keputusan finansial lebih baik berdasarkan data.
          </p>

          {/* CTA */}
          <button
            onClick={() => navigate('/auth')}
            className="group w-full sm:w-auto min-w-50 bg-primary text-white font-bold py-3.5 px-8 rounded-xl shadow-[0_10px_30px_rgba(22,128,255,0.3)] hover:-translate-y-1 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs cursor-pointer"
          >
            Mulai Kelola Keuangan
            {/* <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> */}
          </button>
        </div>
      </section>

      {/* --- 3. PROBLEM HIGHLIGHT --- */}
      <section className="min-h-screen flex items-center px-6 bg-card-dark/20 border-y border-white/5 relative py-24">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text left */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="w-8 h-px bg-danger-dark"></div>
              <h3 className="text-[10px] font-black text-danger-dark uppercase tracking-widest">Realita Saat Ini</h3>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] font-black text-white/90 tracking-tight">
              Gaji seringkali <br className="hidden md:block" />
              cuma mampir, <br className="hidden md:block" />
              <span className="text-danger-dark">lalu hilang.</span>
            </h2>
            
            <p className="text-base md:text-lg text-text-mutedDark leading-relaxed max-w-lg mx-auto lg:mx-0">
              Literasi keuangan generasi muda masih di bawah <strong className="text-white">50%</strong>. Kita jago mencari uang, tapi sering kebingungan ke mana larinya uang tersebut setiap akhir bulan.
            </p>
          </div>

          {/* Card Masalah */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 relative">
            {/* background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-danger-dark/10 blur-[100px] -z-10 rounded-full"></div>
            
            {/* Point 1 */}
            <div className="p-6 md:p-8 bg-base-dark/60 backdrop-blur-xl border border-white/5 rounded-3xl hover:border-danger-dark/30 hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-danger-dark/10 flex items-center justify-center mb-5 text-danger-dark font-black text-xl">01</div>
              <h4 className="text-white font-bold text-lg mb-2">Lifestyle Inflation</h4>
              <p className="text-sm text-text-mutedDark leading-relaxed">Pengeluaran terus membengkak seiring bertambahnya pendapatan tanpa disadari.</p>
            </div>

            {/* Point 2 */}
            <div className="p-6 md:p-8 bg-base-dark/60 backdrop-blur-xl border border-white/5 rounded-3xl hover:border-danger-dark/30 hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-danger-dark/10 flex items-center justify-center mb-5 text-danger-dark font-black text-xl">02</div>
              <h4 className="text-white font-bold text-lg mb-2">Blind Spot Kas</h4>
              <p className="text-sm text-text-mutedDark leading-relaxed">Malas mencatat manual membuat kita tidak tahu persis porsi pengeluaran terbesar.</p>
            </div>

            {/* Point 3 */}
            <div className="p-6 md:p-8 bg-base-dark/60 backdrop-blur-xl border border-white/5 rounded-3xl hover:border-danger-dark/30 hover:-translate-y-1 transition-all duration-300 sm:col-span-2">
              <div className="w-10 h-10 rounded-xl bg-danger-dark/10 flex items-center justify-center mb-5 text-danger-dark font-black text-xl">03</div>
              <h4 className="text-white font-bold text-lg mb-2">Ragu Berinvestasi</h4>
              <p className="text-sm text-text-mutedDark leading-relaxed max-w-xl">Kondisi tabungan yang tidak stabil dan absennya target membuat kita selalu menunda untuk menyiapkan dana masa depan.</p>
            </div>
          </div>
          
        </div>
      </section>

      {/* --- 4. FEATURES SECTION  --- */}
      <section className="min-h-screen flex flex-col justify-center px-6 max-w-5xl mx-auto py-20">
        <div className="text-center md:text-left mb-12">
          <h3 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter">Fitur Cerdas</h3>
          <p className="text-[10px] text-text-mutedDark uppercase tracking-widest font-bold mt-2">Smart Protocol Technology</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          
          {/* Card 1: Kategorisasi AI */}
          <div className="md:col-span-2 p-8 md:p-10 bg-card-dark/50 backdrop-blur-md border border-white/5 rounded-3xl flex flex-col justify-center space-y-4 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex items-center gap-3">
              <h4 className="font-bold text-xl md:text-2xl text-white flex items-center gap-2">
                <PieChart className="w-6 h-6 text-primary shrink-0" />
                Kategorisasi AI
              </h4>
            </div>
            <p className="text-sm md:text-base text-text-mutedDark leading-relaxed max-w-lg">
              Model Machine Learning kami secara otomatis mengklasifikasikan setiap transaksimu. Pahami kebiasaan belanjamu tanpa perlu mencatat manual satu per satu.
            </p>
          </div>

          {/* Card 2: Anggaran Pintar */}
          <div className="p-8 md:p-10 bg-card-dark/50 backdrop-blur-md border border-white/5 rounded-3xl flex flex-col justify-center space-y-4 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 group">
            <h4 className="font-bold text-lg md:text-xl text-white flex items-center gap-2">
              <Target className="w-6 h-6 text-primary shrink-0" />
              Anggaran Pintar
            </h4>
            <p className="text-sm text-text-mutedDark leading-relaxed">
              Atur batas pengeluaran bulananmu. Sistem otomatis memberi peringatan dini sebelum kamu overbudget.
            </p>
          </div>

          {/* Card 3: Investment Readiness */}
          <div className="md:col-span-3 p-8 md:p-10 bg-card-dark/50 backdrop-blur-md border border-white/5 rounded-3xl flex flex-col justify-center hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 gap-3 group">
            <h4 className="font-bold text-xl md:text-2xl text-white flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary shrink-0" />
              Investment Readiness
            </h4>
            <p className="text-sm md:text-base text-text-mutedDark leading-relaxed max-w-4xl">
              Sistem akan mengevaluasi otomatis Basic Liquidity Ratio & Savings Ratio kamu setiap bulan untuk memberikan insight apakah kondisi kas kamu sudah siap untuk berinvestasi.
            </p>
          </div>
        </div>
      </section>

      {/* --- 5. FOOTER --- */}
      <footer className="px-6 md:px-10 py-10 bg-base-dark border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left flex flex-col items-center md:items-start space-y-2">
            <img src={logo} alt="FinSmart Logo" className="h-5 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" />
            <p className="text-[10px] text-text-mutedDark font-medium tracking-widest uppercase">
              &copy; 2026 FinSmart Project.
            </p>
          </div>
          <div className="text-center md:text-right space-y-1">
            <p className="text-[9px] uppercase tracking-widest text-text-mutedDark font-black">Powered By</p>
            <p className="text-xs font-bold tracking-tight text-white/80">DBS Foundation | Coding Camp 2026</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;