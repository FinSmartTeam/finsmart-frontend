import { BarChart3, PieChart } from 'lucide-react';

const StatsTab = ({ summaryStats = null, categoryStats = [] }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* 1. FILTER PERIODE  */}
      <div className="flex justify-between items-center bg-card-light shadow-sm p-4 rounded-2xl border border-border-light">
         <h3 className="text-sm font-bold text-text-mainLight">Laporan Analisis</h3>
         <div className="bg-base-light border border-border-light px-4 py-2 rounded-xl text-xs font-medium text-text-mutedLight">
           Menunggu Integrasi Data...
         </div>
      </div>

      {/* 2. PLACEHOLDER GRAFIK MAIN TREN */}
      <div className="p-8 bg-card-light shadow-sm border border-border-light rounded-3xl min-h-80 flex flex-col relative overflow-hidden">
        <h4 className="text-sm font-bold text-text-mainLight mb-6 flex items-center gap-2">
          <BarChart3 size={18} className="text-primary" />
          Tren Arus Kas Bulanan
        </h4>
        <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-border-light rounded-xl relative bg-base-light/50 overflow-hidden">

           <div className="absolute inset-x-0 bottom-0 h-1/2 flex items-end gap-1 px-4">
               {[...Array(7)].map((_, i) => (
                   <div key={i} className="flex-1 bg-border-light/60 rounded-t" style={{ height: `${Math.random() * 80 + 10}%` }}></div>
               ))}
           </div>
           <span className="text-xs text-text-mainLight font-bold z-10 bg-card-light/90 px-4 py-2 rounded-lg shadow-sm border border-border-light backdrop-blur-md">
             [ Area Integrasi Recharts Line/Bar Chart ]
           </span>
        </div>
      </div>

      {/* 3. GRID DISTRIBUSI & RINGKASAN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Placeholder Pie Chart */}
        <div className="lg:col-span-2 p-8 bg-card-light shadow-sm border border-border-light rounded-3xl flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="relative w-40 h-40 shrink-0 flex items-center justify-center bg-base-light rounded-full border-16 border-border-light/50">
             <span className="text-xs text-text-mutedLight font-bold">0%</span>
          </div>

          <div className="flex-1 w-full space-y-5">
            <h4 className="text-sm font-bold text-text-mainLight border-b border-border-light pb-3 flex items-center gap-2">
              <PieChart size={16} className="text-primary" /> Distribusi Kategori Pengeluaran
            </h4>
            {categoryStats.length === 0 ? (
                <p className="text-xs text-text-mutedLight font-medium italic pt-2">Belum ada data distribusi kategori.</p>
            ) : (
                <ul className="space-y-4">
                  {/* List Distribusi akan muncul di sini */}
                </ul>
            )}
          </div>
        </div>

        {/* Card summary right */}
        <div className="space-y-6">
          <div className="p-6 bg-card-light shadow-sm border border-border-light rounded-3xl group">
            <h4 className="text-[10px] font-bold text-text-mutedLight uppercase tracking-widest mb-2">Pengeluaran Terbesar</h4>
            <p className="text-xl font-black text-text-mainLight">Rp 0</p>
            <p className="text-[10px] font-bold text-text-mutedLight mt-2 flex items-center gap-1">
              -- % dari bulan lalu
            </p>
          </div>
          <div className="p-6 bg-card-light shadow-sm border border-border-light rounded-3xl group">
            <h4 className="text-[10px] font-bold text-text-mutedLight uppercase tracking-widest mb-2">Rata-rata Harian</h4>
            <p className="text-xl font-black text-text-mainLight">Rp 0</p>
            <p className="text-[10px] font-bold text-text-mutedLight mt-2 flex items-center gap-1">
              -- % dari bulan lalu
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StatsTab;