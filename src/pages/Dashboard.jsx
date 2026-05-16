import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  Wallet, 
  Settings, 
  LogOut, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft,
  Bot,
  X
} from 'lucide-react';
import logo from '../assets/logo.svg'; // Import logo

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [transactions, setTransactions] = useState([]); 
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  // Perbaikan Error: Gunakan pola fetch data (simulasi)
  useEffect(() => {
    const fetchInitialData = () => {
      // Nanti ini diganti dengan pemanggilan API (axios.get)
      const dataDariServer = []; 
      setTransactions(dataDariServer);
      
      // Munculkan modal HANYA jika data yang ditarik kosong
      if (dataDariServer.length === 0) {
        setShowWelcomeModal(true);
      }
    };

    fetchInitialData();
  }, []); // Array kosong berarti hanya dijalankan 1x saat halaman dimuat

  const handleLogout = () => {
    localStorage.removeItem('finSmart_token');
    navigate('/auth');
  };

  const menuItems = [
    { id: 'home', label: 'Home', icon: LayoutDashboard },
    { id: 'stats', label: 'Stats', icon: BarChart3 },
    { id: 'vault', label: 'Vault', icon: Wallet },
    { id: 'finbot', label: 'FinBot', icon: Bot }, 
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-base-dark text-text-mainDark font-sans flex flex-col md:flex-row relative">
      
      {/* --- SIDEBAR DESKTOP --- */}
      <aside className="hidden md:flex flex-col w-64 bg-card-dark/50 border-r border-white/5 p-6 justify-between sticky top-0 h-screen">
        <div className="space-y-8">
          <div className="px-2">
            {/* Menggunakan Logo SVG */}
            <img src={logo} alt="FinSmart Logo" className="h-7 object-contain" />
          </div>

          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                    activeTab === item.id 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                      : 'text-text-mutedDark hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-bold text-danger-dark hover:bg-danger-dark/10 transition-all cursor-pointer w-full"
        >
          <LogOut size={18} />
          Keluar Sistem
        </button>
      </aside>

      {/* --- HEADER MOBILE --- */}
      <header className="md:hidden p-4 border-b border-white/5 flex items-center justify-between sticky top-0 bg-base-dark/80 backdrop-blur-md z-40">
        {/* Menggunakan Logo SVG */}
        <img src={logo} alt="FinSmart Logo" className="h-5 object-contain" />
        
        {/* Tombol Input Transaksi Mobile */}
        <button className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/20 active:scale-95 transition-transform cursor-pointer">
          <Plus size={18} />
        </button>
      </header>

      {/* --- AREA KONTEN UTAMA --- */}
      <main className="flex-1 p-5 md:p-10 pb-28 md:pb-10 overflow-y-auto">
        
        {/* Header Konten Desktop */}
        <div className="hidden md:flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white capitalize">{activeTab}</h2>
            <p className="text-sm text-text-mutedDark">Sistem pemantauan keuangan personal berbasis AI.</p>
          </div>
          <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-primary/10">
            <Plus size={16} /> Transaksi Baru
          </button>
        </div>

        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* 3 Kartu Ringkasan */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 bg-card-dark border border-white/5 rounded-2xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-text-mutedDark uppercase tracking-wider">Total Saldo</span>
                  <Wallet className="text-primary" size={20} />
                </div>
                <p className="text-2xl font-black text-white">Rp 0</p>
              </div>
              <div className="p-6 bg-card-dark border border-white/5 rounded-2xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-text-mutedDark uppercase tracking-wider">Pemasukan</span>
                  <ArrowUpRight className="text-emerald-500" size={20} />
                </div>
                <p className="text-2xl font-black text-white">Rp 0</p>
              </div>
              <div className="p-6 bg-card-dark border border-white/5 rounded-2xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-text-mutedDark uppercase tracking-wider">Pengeluaran</span>
                  <ArrowDownLeft className="text-danger-dark" size={20} />
                </div>
                <p className="text-2xl font-black text-white">Rp 0</p>
              </div>
            </div>

            {/* Grid Blok Bawah */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Blok Grafik Kiri */}
              <div className="lg:col-span-2 space-y-6">
                <div className="p-10 bg-card-dark border border-white/5 rounded-3xl text-center min-h-75 flex flex-col justify-center items-center space-y-2">
                  <BarChart3 size={36} className="text-text-mutedDark opacity-40 mb-2" />
                  <p className="text-white font-bold">Visualisasi Statistik & Grafik Tren</p>
                  <p className="text-text-mutedDark text-xs max-w-xs">Komponen visual grafik akan dirender di sini saat data tersedia.</p>
                </div>
              </div>

              {/* Blok Daftar Transaksi Kanan */}
              <div className="p-6 bg-card-dark/80 border border-white/5 rounded-3xl min-h-75 flex flex-col">
                <h4 className="text-sm font-bold text-white mb-4 border-b border-white/5 pb-3">Riwayat Transaksi</h4>
                <div className="flex-1 flex items-center justify-center">
                  {transactions.length === 0 ? (
                    <p className="text-xs text-text-mutedDark text-center italic">Belum ada transaksi tercatat.</p>
                  ) : (
                    <ul className="w-full space-y-3">
                      {/* Mapping data transaksi */}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab !== 'home' && (
          <div className="p-12 bg-card-dark border border-dashed border-white/10 rounded-3xl text-center">
            <p className="text-text-mutedDark text-sm">Modul halaman <span className="text-white font-bold capitalize">{activeTab}</span> sedang dalam persiapan.</p>
          </div>
        )}
      </main>

      {/* --- MODAL INPUT TRANSAKSI (ONBOARDING) --- */}
      {showWelcomeModal && (
        <div className="fixed inset-0 bg-base-dark/95 backdrop-blur-sm z-100 flex items-center justify-center p-6">
          <div className="bg-card-dark border border-white/10 p-8 rounded-4xl shadow-2xl max-w-md w-full relative">
            <button 
              onClick={() => setShowWelcomeModal(false)}
              className="absolute top-6 right-6 text-text-mutedDark hover:text-white cursor-pointer"
            >
              <X size={20} />
            </button>
            <div className="text-center space-y-2 mb-8">
              <div className="w-16 h-16 bg-primary/20 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Wallet size={32} />
              </div>
              <h3 className="text-2xl font-black text-white">Mulai Perjalananmu</h3>
              <p className="text-sm text-text-mutedDark leading-relaxed">
                Grafikmu masih kosong. Ayo masukkan transaksi atau saldo awal pertamamu agar FinBot bisa mulai menganalisis.
              </p>
            </div>

            <form className="space-y-4">
              <input type="number" placeholder="Nominal (Contoh: 500000)" className="w-full bg-base-dark border border-white/10 px-4 py-3.5 rounded-xl text-white outline-none focus:border-primary text-sm" />
              <select className="w-full bg-base-dark border border-white/10 px-4 py-3.5 rounded-xl text-white outline-none focus:border-primary text-sm appearance-none">
                <option value="pemasukan">Pemasukan (Saldo Awal)</option>
                <option value="pengeluaran">Pengeluaran</option>
              </select>
              <input type="text" placeholder="Keterangan (Contoh: Uang Saku)" className="w-full bg-base-dark border border-white/10 px-4 py-3.5 rounded-xl text-white outline-none focus:border-primary text-sm" />
              
              <button 
                type="button" 
                onClick={() => setShowWelcomeModal(false)} 
                className="w-full bg-primary text-white font-bold py-4 rounded-xl mt-4 hover:-translate-y-1 shadow-[0_10px_20px_rgba(22,128,255,0.3)] transition-all cursor-pointer"
              >
                Simpan Transaksi Pertama
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- FLOATING ACTION BUTTON FINBOT (MOBILE) --- */}
      {/* Hapus animasi bounce agar lebih elegan */}
      <button 
        onClick={() => setActiveTab('finbot')}
        className="md:hidden fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(22,128,255,0.5)] border-2 border-base-dark z-40 active:scale-95 transition-transform"
      >
        <Bot size={24} />
      </button>

      {/* --- NAVIGATION NAV BAR MOBILE --- */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card-dark/95 backdrop-blur-xl border-t border-white/5 px-6 py-3 flex justify-between items-center z-50 md:hidden">
        {menuItems.filter(item => item.id !== 'finbot').map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 transition-all cursor-pointer ${
                isActive ? 'text-primary' : 'text-text-mutedDark'
              }`}
            >
              <Icon size={20} />
              <span className="text-[9px] font-black uppercase tracking-wider">{item.label}</span>
              {isActive && <div className="w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_#1680FF]"></div>}
            </button>
          );
        })}
      </nav>

    </div>
  );
};

export default Dashboard;