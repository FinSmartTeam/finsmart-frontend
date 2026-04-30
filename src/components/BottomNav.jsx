const BottomNav = () => {
  // Data navigasi agar mudah dikelola
  const navItems = [
    { id: 1, label: 'Home', icon: '🏠', active: true },
    { id: 2, label: 'Stats', icon: '📊', active: false },
    { id: 3, label: 'Vault', icon: '🎯', active: false },
    { id: 4, label: 'User', icon: '👤', active: false },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card-dark/80 backdrop-blur-xl border-t border-border-dark px-6 py-3 flex justify-between items-center z-50">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`flex flex-col items-center gap-1 transition-all ${
            item.active ? 'text-primary' : 'text-text-mutedDark'
          }`}
        >
          <span className="text-xl">{item.icon}</span>
          <span className="text-[9px] font-black uppercase tracking-widest">
            {item.label}
          </span>
          {/* Indikator Aktif */}
          {item.active && (
            <div className="w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_#1680FF]"></div>
          )}
        </button>
      ))}

      {/* Floating Action Button (FAB) untuk Tambah Transaksi */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-6">
        <button className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(22,128,255,0.5)] border-4 border-base-dark active:scale-90 transition-transform">
          +
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;