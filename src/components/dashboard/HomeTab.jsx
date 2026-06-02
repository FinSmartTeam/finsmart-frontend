import { useMemo, useState, useRef, useEffect } from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft, Clock, PieChart as PieIcon, Edit2, Trash2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card-light/95 backdrop-blur-md border border-border-light px-3 py-2 md:px-4 md:py-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-in zoom-in-95 duration-200">
        <p className="text-[9px] md:text-[10px] font-bold text-text-mutedLight uppercase tracking-wider mb-1">{payload[0].name}</p>
        <p className="text-xs md:text-sm font-black" style={{ color: payload[0].payload.fill }}>
          Rp {payload[0].value.toLocaleString('id-ID')}
        </p>
      </div>
    );
  }
  return null;
};

const COLORS = ['#1680FF', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#F43F5E', '#06B6D4'];

const HomeTab = ({ transactions = [], totalSaldo = 0, totalPemasukan = 0, totalPengeluaran = 0, onEditTransaction, onDeleteTransaction }) => {

  // State & Ref untuk logika Long Press di Mobile
  const [activeActionId, setActiveActionId] = useState(null);
  const touchTimer = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.touch-item')) setActiveActionId(null);
    };
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleTouchStart = (id) => {
    touchTimer.current = setTimeout(() => {
      setActiveActionId(id === activeActionId ? null : id);
      if (window.navigator && window.navigator.vibrate) window.navigator.vibrate(50);
    }, 500);
  };

  const handleTouchEnd = () => {
    if (touchTimer.current) clearTimeout(touchTimer.current);
  };

  const safeTransactions = useMemo(() => {
    return Array.isArray(transactions) ? transactions : [];
  }, [transactions]);

  const pieData = useMemo(() => {
    const expenses = safeTransactions.filter(tx => tx.type === 'expense');
    const categoryTotals = expenses.reduce((acc, tx) => {
      const category = tx.category || 'Lainnya';
      acc[category] = (acc[category] || 0) + Number(tx.amount || 0);
      return acc;
    }, {});

    return Object.keys(categoryTotals)
      .map(key => ({ name: key, value: categoryTotals[key] }))
      .sort((a, b) => b.value - a.value);
  }, [safeTransactions]);

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-500">

      {/* MAIN CARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        <div className="p-4 md:p-6 bg-card-light border border-border-light shadow-sm rounded-2xl space-y-2 md:space-y-4 hover:shadow-md transition-shadow cursor-default">
          <div className="flex justify-between items-center">
            <span className="text-[10px] md:text-xs font-bold text-text-mutedLight uppercase tracking-wider">Total Saldo</span>
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Wallet className="text-primary w-3.5 h-3.5 md:w-4 md:h-4" />
            </div>
          </div>
          <p className="text-xl md:text-2xl font-black text-text-mainLight">
            Rp {Number(totalSaldo || 0).toLocaleString('id-ID')}
          </p>
        </div>

        <div className="p-4 md:p-6 bg-card-light border border-border-light shadow-sm rounded-2xl space-y-2 md:space-y-4 hover:shadow-md transition-shadow cursor-default">
          <div className="flex justify-between items-center">
            <span className="text-[10px] md:text-xs font-bold text-text-mutedLight uppercase tracking-wider">Pemasukan</span>
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-accent-light/10 flex items-center justify-center">
              <ArrowUpRight className="text-accent-light w-3.5 h-3.5 md:w-4 md:h-4" />
            </div>
          </div>
          <p className="text-xl md:text-2xl font-black text-accent-light">
            Rp {Number(totalPemasukan || 0).toLocaleString('id-ID')}
          </p>
        </div>

        <div className="p-4 md:p-6 bg-card-light border border-border-light shadow-sm rounded-2xl space-y-2 md:space-y-4 hover:shadow-md transition-shadow cursor-default">
          <div className="flex justify-between items-center">
            <span className="text-[10px] md:text-xs font-bold text-text-mutedLight uppercase tracking-wider">Pengeluaran</span>
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-danger-light/10 flex items-center justify-center">
              <ArrowDownLeft className="text-danger-light w-3.5 h-3.5 md:w-4 md:h-4" />
            </div>
          </div>
          <p className="text-xl md:text-2xl font-black text-danger-light">
            Rp {Number(totalPengeluaran || 0).toLocaleString('id-ID')}
          </p>
        </div>
      </div>

      {/* WORKSPACE AREA TENGAH */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">

        {/* KOTAK GRAFIK (PIE CHART) */}
        <div className="p-4 md:p-6 bg-card-light border border-border-light shadow-sm rounded-3xl flex flex-col min-h-65 md:min-h-75">
          <h4 className="text-xs md:text-sm font-bold text-text-mainLight mb-3 md:mb-4 border-b border-border-light pb-2 md:pb-3 flex items-center gap-2">
            <PieIcon className="text-primary w-4 h-4 md:w-4.5 md:h-4.5" />
            Distribusi Pengeluaran
          </h4>

          <div className="flex-1 flex flex-col justify-center items-center relative">
            {pieData.length === 0 ? (
              <div className="text-center space-y-2 opacity-60 mt-6 md:mt-8">
                <PieIcon size={32} className="text-text-mutedLight mx-auto mb-1 md:mb-2 md:w-9 md:h-9" />
                <p className="text-text-mainLight text-xs md:text-sm font-bold">Belum Ada Data</p>
                <p className="text-text-mutedLight text-[10px] md:text-xs max-w-50 md:max-w-xs font-medium">Catat pengeluaran pertamamu untuk melihat distribusinya di sini.</p>
              </div>
            ) : (
              <div className="w-full h-48 md:h-64 mt-1 md:mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius="50%" outerRadius="75%" paddingAngle={5} dataKey="value" stroke="none" isAnimationActive={true}>
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="hover:opacity-80 transition-opacity duration-300" />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} animationDuration={300} animationEasing="ease-out" />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: '600', color: '#64748B', paddingTop: '8px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>

        {/* KOTAK RIWAYAT TRANSAKSI */}
        <div className="p-4 md:p-6 bg-card-light border border-border-light shadow-sm rounded-3xl flex flex-col min-h-65 md:min-h-75">
          <h4 className="text-xs md:text-sm font-bold text-text-mainLight mb-3 md:mb-4 border-b border-border-light pb-2 md:pb-3">Riwayat Transaksi</h4>

          <div className="flex-1 overflow-y-auto max-h-60 md:max-h-80 space-y-2 md:space-y-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] pr-1">
            {safeTransactions.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center space-y-2 md:space-y-3 opacity-60 min-h-30 md:min-h-37.5">
                <Clock size={28} className="text-text-mutedLight md:w-8 md:h-8" />
                <p className="text-[10px] md:text-xs text-text-mutedLight italic font-medium">Belum ada aktivitas finansial tercatat.</p>
              </div>
            ) : (
              safeTransactions.map((tx, index) => {
                if (!tx) return null;
                const isIncome = tx.type === 'income';
                const txDate = tx.transactionDate || tx.date || tx.tanggal || tx.createdAt;
                const isActionActive = activeActionId === tx.id;

                return (
                  <div
                    key={tx.id || index}
                    className="touch-item flex justify-between items-center bg-base-light border border-border-light p-3 md:p-3.5 rounded-xl transition-all cursor-default relative overflow-hidden group"
                    onTouchStart={() => handleTouchStart(tx.id)}
                    onTouchEnd={handleTouchEnd}
                    onTouchMove={handleTouchEnd}
                  >
                    {/* AREA KIRI: ICON & DESKRIPSI */}
                    <div className="flex items-center gap-2.5 md:gap-3 flex-1 overflow-hidden z-0">
                      <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${isIncome ? 'bg-accent-light/10 text-accent-light' : 'bg-danger-light/10 text-danger-light'}`}>
                        {isIncome ? <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4" /> : <ArrowDownLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                      </div>
                      <div className="overflow-hidden pr-2">
                        <p className="text-xs md:text-sm font-bold text-text-mainLight truncate">{tx.description || 'Tanpa Judul'}</p>
                        <p className="text-[9px] md:text-[10px] text-text-mutedLight font-medium truncate mt-0.5">
                          {tx.category || 'Lainnya'} • {txDate ? new Date(txDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Hari ini'}
                        </p>
                      </div>
                    </div>

                    {/* AREA KANAN: NOMINAL (Statis di Mobile, Move Kiri di Desktop) */}
                    <div className="flex flex-col items-end shrink-0 z-0 relative h-8 justify-center min-w-20 md:min-w-25">
                      <span className={`text-xs md:text-sm font-black transition-transform duration-300 transform md:group-hover:-translate-x-18 ${isIncome ? 'text-accent-light' : 'text-danger-light'}`}>
                        {isIncome ? '+' : '-'}Rp {Number(tx.amount || 0).toLocaleString('id-ID')}
                      </span>
                    </div>

                    {/* OVERLAY ACTION MOBILE: Hold mobile */}
                    <div className={`md:hidden absolute inset-y-0 right-0 flex items-center justify-end pl-16 pr-3 gap-1.5 transition-transform duration-300 ease-out transform bg-linear-to-l from-base-light via-base-light to-transparent z-10 ${isActionActive ? 'translate-x-0' : 'translate-x-full'}`}>
                      <button onClick={(e) => { e.stopPropagation(); onEditTransaction && onEditTransaction(tx); setActiveActionId(null); }} className="p-1.5 bg-card-light shadow-sm text-text-mutedLight hover:text-primary transition-colors cursor-pointer rounded-lg hover:bg-primary/10">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); onDeleteTransaction && onDeleteTransaction(tx.id); setActiveActionId(null); }} className="p-1.5 bg-card-light shadow-sm text-text-mutedLight hover:text-danger-light transition-colors cursor-pointer rounded-lg hover:bg-danger-light/10">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* ACTION DESKTOP: Hover */}
                    <div className={`hidden md:flex absolute right-3.5 top-1/2 -translate-y-1/2 items-center gap-1 transition-all duration-300 opacity-0 translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 z-10`}>
                      <button onClick={(e) => { e.stopPropagation(); onEditTransaction && onEditTransaction(tx); setActiveActionId(null); }} className="p-1.5 text-text-mutedLight hover:text-primary transition-colors cursor-pointer rounded-md hover:bg-primary/10">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); onDeleteTransaction && onDeleteTransaction(tx.id); setActiveActionId(null); }} className="p-1.5 text-text-mutedLight hover:text-danger-light transition-colors cursor-pointer rounded-md hover:bg-danger-light/10">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

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