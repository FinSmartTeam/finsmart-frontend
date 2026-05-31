import { useNavigate } from 'react-router-dom';
import { 
  PieChart, 
  Target, 
  TrendingUp,
  ArrowRight 
} from 'lucide-react';
import logo from '../assets/logo.svg';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-base-light text-text-mainLight font-sans selection:bg-primary selection:text-white overflow-x-hidden">

      {/* --- 1. NAVBAR --- */}
      <nav className="px-6 py-4 md:px-10 flex justify-between items-center fixed top-0 w-full bg-base-light/80 backdrop-blur-xl z-50 border-b border-border-light/60">
        <img src={logo} alt="FinSmart Logo" className="h-6 object-contain cursor-pointer hover:opacity-80 transition-all" onClick={() => navigate('/')} />
        <button 
          onClick={() => navigate('/auth')}
          className="text-[10px] md:text-xs font-bold uppercase tracking-widest border border-border-light px-5 py-2 rounded-lg hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300 cursor-pointer text-text-mainLight"
        >
          Masuk
        </button>
      </nav>

      {/* --- 2. HERO SECTION --- */}
      <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        {/* Efek Glow Latar Belakang - Sesuai warna Logo (Biru & Hijau) */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-primary/10 blur-[100px] -z-10 rounded-full animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-accent-light/10 blur-[100px] -z-10 rounded-full"></div>

        <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center z-10 pt-16">
          
          {/* Headline dengan Gradient Transisi Biru ke Hijau (Matching Logo) */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight mb-6 text-text-mainLight">
            Kelola Keuangan <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#00c853] to-accent-light animate-gradient pb-2 block sm:inline">
              Lebih Cerdas dengan AI
            </span>
          </h1>

          {/* Sub Headline */}
          <p className="text-sm md:text-lg text-text-mutedLight leading-relaxed max-w-2xl mx-auto font-medium mb-10">
            Bantu kamu memahami cashflow, menabung lebih efektif, dan membuat keputusan finansial lebih baik berdasarkan data.
          </p>

          {/* CTA */}
          <button
            onClick={() => navigate('/auth')}
            className="group w-full sm:w-auto min-w-[200px] bg-primary text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-primary/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs cursor-pointer"
          >
            Mulai Sekarang
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* --- 3. PROBLEM HIGHLIGHT --- */}
      {/* Menggunakan bg-card-light (Putih murni) untuk membedakan section dari bg-base-light (Putih abu) */}
      <section className="min-h-screen flex items-center px-6 bg-card-light border-y border-border-light relative py-24">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text left */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="w-8 h-px bg-danger-light"></div>
              <h3 className="text-[10px] font-black text-danger-light uppercase tracking-widest">Realita Saat Ini</h3>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] font-black tracking-tight text-text-mainLight">
              Merasa gaji sekadar <br className="hidden md:block" />
              numpang lewat, <br className="hidden md:block" />
              <span className="text-danger-light">tanpa sisa?</span>
            </h2>
            
            <p className="text-base md:text-lg text-text-mutedLight leading-relaxed max-w-lg mx-auto lg:mx-0">
              Literasi keuangan generasi muda masih di bawah <strong>50%</strong>. Kita jago mencari uang, tapi sering kebingungan dan terjebak dalam <em>lifestyle inflation</em> yang tak berujung.
            </p>
          </div>

          {/* Card Masalah - Bento Box Style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-danger-light/5 blur-[100px] -z-10 rounded-full"></div>
            
            {/* Point 1 */}
            <div className="p-6 md:p-8 bg-base-light/80 backdrop-blur-xl border border-border-light rounded-3xl shadow-xs hover:shadow-md hover:border-danger-light/30 hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-danger-light/10 flex items-center justify-center mb-5 text-danger-light font-black text-xl">01</div>
              <h4 className="font-bold text-lg mb-2 text-text-mainLight">Lifestyle Inflation</h4>
              <p className="text-sm text-text-mutedLight leading-relaxed">Pengeluaran terus membengkak seiring bertambahnya pendapatan tanpa disadari.</p>
            </div>

            {/* Point 2 */}
            <div className="p-6 md:p-8 bg-base-light/80 backdrop-blur-xl border border-border-light rounded-3xl shadow-xs hover:shadow-md hover:border-danger-light/30 hover:-translate-y-1 transition-all duration-300 mt-0 sm:mt-8">
              <div className="w-10 h-10 rounded-xl bg-danger-light/10 flex items-center justify-center mb-5 text-danger-light font-black text-xl">02</div>
              <h4 className="font-bold text-lg mb-2 text-text-mainLight">Blind Spot Kas</h4>
              <p className="text-sm text-text-mutedLight leading-relaxed">Malas mencatat manual membuat kita tidak tahu persis ke mana porsi uang terbesar lari.</p>
            </div>

            {/* Point 3 */}
            <div className="p-6 md:p-8 bg-base-light/80 backdrop-blur-xl border border-border-light rounded-3xl shadow-xs hover:shadow-md hover:border-danger-light/30 hover:-translate-y-1 transition-all duration-300 sm:col-span-2">
              <div className="w-10 h-10 rounded-xl bg-danger-light/10 flex items-center justify-center mb-5 text-danger-light font-black text-xl">03</div>
              <h4 className="font-bold text-lg mb-2 text-text-mainLight">Ragu Berinvestasi</h4>
              <p className="text-sm text-text-mutedLight leading-relaxed max-w-xl">Kondisi tabungan yang tidak stabil dan absennya target membuat kita selalu menunda untuk menyiapkan dana masa depan.</p>
            </div>
          </div>
          
        </div>
      </section>

      {/* --- 4. FEATURES SECTION --- */}
      <section className="min-h-screen flex items-center px-6 py-24 bg-base-light">
        <div className="max-w-6xl mx-auto w-full space-y-12">
          <div className="text-center md:text-left">
            <h3 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-text-mainLight">Fitur Cerdas</h3>
            <p className="text-[10px] text-text-mutedLight uppercase tracking-widest font-bold mt-2">Smart Protocol Technology</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            
            {/* Card 1: Kategorisasi AI */}
            <div className="md:col-span-2 p-8 md:p-10 bg-card-light shadow-xs backdrop-blur-md border border-border-light rounded-3xl flex flex-col justify-center space-y-4 hover:border-primary/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-center gap-3">
                <h4 className="font-bold text-xl md:text-2xl flex items-center gap-2 text-text-mainLight">
                  <PieChart className="w-7 h-7 text-primary shrink-0" />
                  Kategorisasi AI
                </h4>
              </div>
              <p className="text-sm md:text-base text-text-mutedLight leading-relaxed max-w-lg">
                Model Machine Learning kami secara otomatis mengklasifikasikan setiap transaksimu. Pahami kebiasaan belanjamu tanpa perlu mencatat manual satu per satu.
              </p>
            </div>

            {/* Card 2: Anggaran Pintar */}
            <div className="p-8 md:p-10 bg-card-light shadow-xs backdrop-blur-md border border-border-light rounded-3xl flex flex-col justify-center space-y-4 hover:border-primary/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
              <h4 className="font-bold text-lg md:text-xl flex items-center gap-2 text-text-mainLight">
                <Target className="w-7 h-7 text-primary shrink-0" />
                Anggaran Pintar
              </h4>
              <p className="text-sm text-text-mutedLight leading-relaxed">
                Atur batas pengeluaran bulananmu. Sistem otomatis memberi peringatan dini sebelum kamu overbudget.
              </p>
            </div>

            {/* Card 3: Investment Readiness */}
            <div className="md:col-span-3 p-8 md:p-10 bg-card-light shadow-xs backdrop-blur-md border border-border-light rounded-3xl flex flex-col justify-center hover:border-primary/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300 gap-3 group">
              <h4 className="font-bold text-xl md:text-2xl flex items-center gap-2 text-text-mainLight">
                <TrendingUp className="w-7 h-7 text-primary shrink-0" />
                Investment Readiness
              </h4>
              <p className="text-sm md:text-base text-text-mutedLight leading-relaxed max-w-4xl">
                Sistem akan mengevaluasi otomatis Basic Liquidity Ratio & Savings Ratio kamu setiap bulan untuk memberikan insight apakah kondisi kas kamu sudah siap untuk berinvestasi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 5. FOOTER --- */}
      <footer className="px-6 md:px-10 py-10 bg-card-light border-t border-border-light">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left flex flex-col items-center md:items-start space-y-2">
            <img src={logo} alt="FinSmart Logo" className="h-5 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" />
            <p className="text-[10px] text-text-mutedLight font-medium tracking-widest uppercase">
              &copy; 2026 FinSmart Project.
            </p>
          </div>
          <div className="text-center md:text-right space-y-1">
            <p className="text-[9px] uppercase tracking-widest text-text-mutedLight font-black">Powered By</p>
            <p className="text-xs font-bold tracking-tight text-text-mainLight">DBS Foundation | Coding Camp 2026</p>
          </div>
        </div>
      </footer>

      {/* --- CSS ANIMATIONS --- */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient-shift 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;