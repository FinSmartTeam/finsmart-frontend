import { Wallet, ArrowUpRight, ArrowDownLeft, BarChart3, Clock } from 'lucide-react';

const HomeTab = ({ transactions = [], totalSaldo = 0, totalPemasukan = 0, totalPengeluaran = 0 }) => {
  const safeTransactions = Array.isArray(transactions) ? transactions : [];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* KARTU KEUNGGULAN UTAMA */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 bg-card-dark border border-border-dark rounded-2xl space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-text-mutedDark uppercase tracking-wider">Total Saldo</span>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Wallet className="text-primary" size={16} />
            </div>
          </div>
          <p className="text-2xl font-black text-text-mainDark">
            Rp {Number(totalSaldo || 0).toLocaleString('id-ID')}
          </p>
        </div>

        <div className="p-6 bg-card-dark border border-border-dark rounded-2xl space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-text-mutedDark uppercase tracking-wider">Pemasukan</span>
            <div className="w-8 h-8 rounded-full bg-accent-light/10 flex items-center justify-center">
              <ArrowUpRight className="text-accent-light" size={16} />
            </div>
          </div>
          <p className="text-2xl font-black text-accent-light">
            Rp {Number(totalPemasukan || 0).toLocaleString('id-ID')}
          </p>
        </div>

        <div className="p-6 bg-card-dark border border-border-dark rounded-2xl space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-text-mutedDark uppercase tracking-wider">Pengeluaran</span>
            <div className="w-8 h-8 rounded-full bg-danger-light/10 flex items-center justify-center">
              <ArrowDownLeft className="text-danger-light" size={16} />
            </div>
          </div>
          <p className="text-2xl font-black text-danger-light">
            Rp {Number(totalPengeluaran || 0).toLocaleString('id-ID')}
          </p>
        </div>
      </div>

      {/* WORKSPACE AREA TENGAH */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="p-6 bg-card-dark border border-border-dark rounded-3xl flex flex-col min-h-75">
          <h4 className="text-sm font-bold text-text-mainDark mb-4 border-b border-border-dark pb-3">Ringkasan Aktivitas</h4>
          <div className="flex-1 bg-base-dark border border-dashed border-border-dark rounded-2xl text-center flex flex-col justify-center items-center space-y-2 p-4">
            <BarChart3 size={36} className="text-text-mutedDark opacity-30 mb-2" />
            <p className="text-text-mainDark text-sm font-bold">Visualisasi Tren AI</p>
            <p className="text-text-mutedDark text-xs max-w-xs">Grafik alokasi otomatis akan aktif mendeteksi transaksi barumu.</p>
          </div>
        </div>

        <div className="p-6 bg-card-dark border border-border-dark rounded-3xl flex flex-col min-h-75">
          <h4 className="text-sm font-bold text-text-mainDark mb-4 border-b border-border-dark pb-3">Riwayat Transaksi Terbaru</h4>
          
          <div className="flex-1 overflow-y-auto max-h-80 space-y-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            {safeTransactions.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center space-y-3 opacity-60 min-h-37.5">
                <Clock size={32} className="text-text-mutedDark" />
                <p className="text-xs text-text-mutedDark italic">Belum ada aktivitas finansial tercatat.</p>
              </div>
            ) : (
              safeTransactions.map((tx, index) => {
                if (!tx) return null;
                const isIncome = tx.type === 'income';
                
                const txDate = tx.transactionDate || tx.date || tx.tanggal || tx.createdAt;
                
                return (
                  <div key={tx.id || index} className="flex justify-between items-center bg-base-dark border border-border-dark p-3.5 rounded-xl hover:bg-white/5 transition-all">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isIncome ? 'bg-accent-light/10 text-accent-light' : 'bg-danger-light/10 text-danger-light'}`}>
                        {isIncome ? <ArrowUpRight size={16} /> : <ArrowDownLeft size={16} />}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-bold text-text-mainDark truncate">{tx.description || 'Tanpa Judul'}</p>
                        <p className="text-[10px] text-text-mutedDark truncate mt-0.5">
                          {tx.category || 'Lainnya'} • {txDate ? new Date(txDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Hari ini'}
                        </p>
                      </div>
                    </div>
                    
                    <span className={`text-sm font-black shrink-0 ${isIncome ? 'text-accent-light' : 'text-danger-light'}`}>
                      {isIncome ? '+' : '-'}Rp {Number(tx.amount || 0).toLocaleString('id-ID')}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomeTab;