import BottomNav from '../components/BottomNav';

const MobileLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-base-dark text-text-mainDark font-sans">
      {/* Header Dashboard - Berbeda dengan Header Landing Page */}
      <header className="p-4 border-b border-border-dark flex justify-between items-center sticky top-0 bg-base-dark/80 backdrop-blur-md z-40">
        <h1 className="text-xl font-black italic tracking-tighter">
          FIN<span className="text-accent-dark font-normal">SMART</span>
        </h1>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold shadow-[0_0_10px_rgba(22,128,255,0.3)] border border-white/20">
          RA
        </div>
      </header>

      {/* Area Konten Dinamis */}
      <main className="flex-1 p-5 pb-28">
        {children}
      </main>

      {/* Navigasi Bawah */}
      <BottomNav />
    </div>
  );
};

export default MobileLayout;