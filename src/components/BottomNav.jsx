import { LayoutDashboard, BarChart3, Wallet, Plus } from 'lucide-react';

const BottomNav = ({ activeTab, setActiveTab, onAddClick }) => {
  const menuItems = [
    { id: 'home', icon: LayoutDashboard },
    { id: 'stats', icon: BarChart3 },
    { id: 'vault', icon: Wallet },
  ];

  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 md:hidden px-4 bg-transparent pointer-events-none">
      <div className="flex items-center justify-between bg-card-light/95 backdrop-blur-xl border border-border-light/80 p-2 px-3 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] pointer-events-auto max-w-sm mx-auto">

        {/* Navigasi */}
        <div className="flex flex-1 items-center justify-center gap-6 sm:gap-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`p-2.5 rounded-xl transition-all cursor-pointer ${activeTab === item.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-text-mutedLight hover:text-text-mainLight'
                }`}
            >
              <item.icon size={22} className={activeTab === item.id ? "stroke-[2.5px]" : "stroke-2"} />
            </button>
          ))}
        </div>

        {/* Line Pemisah  */}
        <div className="w-px h-8 bg-border-light mx-2"></div>

        {/* Btn Tambah Transaksi */}
        <button
          onClick={onAddClick}
          className="w-11 h-11 shrink-0 bg-primary text-white rounded-xl flex items-center justify-center shadow-[0_4px_14px_rgba(22,128,255,0.3)] active:scale-95 transition-transform cursor-pointer"
        >
          <Plus size={20} className="stroke-[3px]" />
        </button>
      </div>
    </div>
  );
};

export default BottomNav;