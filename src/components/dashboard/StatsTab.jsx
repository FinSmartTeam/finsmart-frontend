import { BarChart3, PieChart, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const StatsTab = ({ summaryStats = null, categoryStats = [] }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* 1. FILTER PERIODE  */}
      <div className="flex justify-between items-center bg-card-dark p-4 rounded-2xl border border-white/5">
         <h3 className="text-sm font-bold text-white">Laporan Analisis</h3>
         <div className="bg-base-dark border border-white/10 px-4 py-2 rounded-xl text-xs font-medium text-white/50">
           Menunggu Integrasi Data...
         </div>
      </div>

      {/* 2. PLACEHOLDER GRAFIK MAIN TREN */}
      <div className="p-8 bg-card-dark border border-white/5 rounded-3xl min-h-[320px] flex flex-col relative overflow-hidden">
        <h4 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
          <BarChart3 size={18} className="text-primary" />
          Tren Arus Kas Bulanan
        </h4>
        <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-xl relative bg-base-dark/30 overflow-hidden">

           <div className="absolute inset-x-0 bottom-0 h-1/2 flex items-end gap-1 px-4">
               {[...Array(7)].map((_, i) => (
                   <div key={i} className="flex-1 bg-white/5 rounded-t" style={{ height: `${Math.random() * 80 + 10}%` }}></div>
               ))}
           </div>
           <span className="text-xs text-text-mutedDark font-medium z-10 bg-base-dark/80 px-4 py-2 rounded-lg border border-white/5 backdrop-blur-md">
             [ Area Integrasi Recharts Line/Bar Chart ]
           </span>
        </div>
      </div>

      {/* 3. GRID DISTRIBUSI & RINGKASAN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Placeholder Pie Chart */}
        <div className="lg:col-span-2 p-8 bg-card-dark border border-white/5 rounded-3xl flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="relative w-40 h-40 flex-shrink-0 flex items-center justify-center bg-white/5 rounded-full border-[16px] border-white/5">
             <span className="text-xs text-text-mutedDark font-bold">0%</span>
          </div>

          <div className="flex-1 w-full space-y-5">
            <h4 className="text-sm font-bold text-white border-b border-white/5 pb-3 flex items-center gap-2">
              <PieChart size={16} className="text-primary" /> Distribusi Kategori Pengeluaran
            </h4>
            {categoryStats.length === 0 ? (
                <p className="text-xs text-text-mutedDark italic pt-2">Belum ada data distribusi kategori.</p>
            ) : (
                <ul className="space-y-4">

                </ul>
            )}
          </div>
        </div>

        {/* Card summary right */}
        <div className="space-y-6">
          <div className="p-6 bg-card-dark border border-white/5 rounded-3xl group">
            <h4 className="text-[10px] font-bold text-text-mutedDark uppercase tracking-widest mb-2">Pengeluaran Terbesar</h4>
            <p className="text-xl font-black text-white">Rp 0</p>
            <p className="text-[10px] font-bold text-text-mutedDark mt-2 flex items-center gap-1">
              -- % dari bulan lalu
            </p>
          </div>
          <div className="p-6 bg-card-dark border border-white/5 rounded-3xl group">
            <h4 className="text-[10px] font-bold text-text-mutedDark uppercase tracking-widest mb-2">Rata-rata Harian</h4>
            <p className="text-xl font-black text-white">Rp 0</p>
            <p className="text-[10px] font-bold text-text-mutedDark mt-2 flex items-center gap-1">
              -- % dari bulan lalu
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StatsTab;