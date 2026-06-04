import { useState, useEffect, useMemo } from 'react';
import { BarChart3, PieChart as PieIcon, TrendingDown, BrainCircuit, Rocket } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import api from '../../services/api';

const COLORS = ['#1680FF', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#F43F5E', '#06B6D4', '#64748B'];

const CustomBarTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card-light/95 backdrop-blur-md border border-border-light p-3 rounded-2xl shadow-lg animate-in zoom-in-95 duration-200">
        <p className="text-[10px] font-bold text-text-mutedLight uppercase tracking-wider mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-xs md:text-sm font-black flex items-center justify-between gap-4" style={{ color: entry.color }}>
            <span className="capitalize">{entry.name}:</span>
            <span>Rp {Number(entry.value).toLocaleString('id-ID')}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const StatsTab = ({ summaryStats, categoryStats = [], allTransactions = [], selectedMonth, selectedYear, refreshTrigger }) => {
  const safeTransactions = Array.isArray(categoryStats) ? categoryStats : [];
  const safeAllTransactions = Array.isArray(allTransactions) ? allTransactions : [];

  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [aiBehavior, setAiBehavior] = useState(null);
  const [aiInvestment, setAiInvestment] = useState(null);
  const [financialProfile, setFinancialProfile] = useState({ totalSavings: 0 });
  const [apiBarData, setApiBarData] = useState([]);
  const [isAiLoading, setIsAiLoading] = useState(true);

  const income = summaryStats?.totalPemasukan || 0;
  const expense = summaryStats?.totalPengeluaran || 0;
  const savings = income - expense;

  const { wants, needs } = useMemo(() => {
    let w = 0, n = 0;
    safeTransactions.forEach(tx => {
      if (tx.type === 'expense') {
        if (['Shopping', 'Entertainment', 'Others'].includes(tx.category)) w += Number(tx.amount || 0);
        else n += Number(tx.amount || 0);
      }
    });
    return { wants: w, needs: n };
  }, [safeTransactions]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsAiLoading(true);
      try {
        setAiBehavior(null); setAiInvestment(null);
        
        let profSavings = 0;
        try {
          const profRes = await api.get('/financial-profile');
          profSavings = Number(profRes.data?.data?.profile?.total_savings || profRes.data?.data?.profile?.totalSavings || 0);
          setFinancialProfile({ totalSavings: profSavings });
        } catch (e) {}

        try {
          const behaviorRes = await api.get(`/insights/behavior?month=${selectedMonth}&year=${selectedYear}&income=${income}&needs=${needs}&wants=${wants}&savings=${savings}`).catch(() => ({ data: null }));
          if (behaviorRes.data) {
             setAiBehavior(behaviorRes.data?.data?.insight || behaviorRes.data?.behavior);
          }
        } catch (e) {}

        try {
          const investRes = await api.get(`/insights/rekomendasi?month=${selectedMonth}&year=${selectedYear}&total_savings=${profSavings}&monthly_income=${income}&monthly_expense=${expense}`).catch(() => ({ data: null }));
          if (investRes.data) {
             setAiInvestment(investRes.data?.data?.insight || investRes.data?.rekomendasi);
          }
        } catch (e) {}

        try {
          const trendRes = await api.get(`/dashboard/monthly?year=${selectedYear}`).catch(() => ({ data: null }));
          if (trendRes.data) setApiBarData(trendRes.data?.data?.months || trendRes.data?.months || []);
        } catch (e) {}

      } finally {
        setIsAiLoading(false);
      }
    };

    if (selectedMonth && selectedYear) fetchAnalytics();
  }, [selectedMonth, selectedYear, refreshTrigger, income, expense, wants, needs, savings]);

  const calculatedBehavior = useMemo(() => {
    if (aiBehavior) return aiBehavior; 
    if (income === 0 && expense === 0) return "Belum Ada Data";
    if (income === 0 && expense > 0) return "Boros";
    if ((savings/income) > 0.2 && (wants/income) < 0.3) return "Hemat";
    if ((savings/income) < 0.2 && (wants/income) > 0.3) return "Boros";
    return "Normal";
  }, [aiBehavior, income, expense, savings, wants]);

  const calculatedInvestment = useMemo(() => {
    if (aiInvestment) return aiInvestment;
    if (income === 0 && expense === 0) return "Belum Ada Data";
    const blr = expense > 0 ? (financialProfile.totalSavings / expense) : (financialProfile.totalSavings > 0 ? 4 : 0); 
    const sr = income > 0 ? ((income - expense) / income) * 100 : 0;
    if (blr < 1) return "Not Ready";
    if (blr >= 1 && blr <= 3) return sr < 10 ? "Not Ready" : "Moderately Ready";
    return sr < 10 ? "Moderately Ready" : "Ready";
  }, [aiInvestment, income, expense, financialProfile.totalSavings]);

  const barData = useMemo(() => {
    const monthsTemplate = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'].map(name => ({ name, Pemasukan: 0, Pengeluaran: 0 }));
    if (apiBarData && apiBarData.length > 0) {
      apiBarData.forEach(item => {
         let monthStr = "";
         if (typeof item.month === 'number') monthStr = monthsTemplate[item.month - 1]?.name || "";
         else if (typeof item.month === 'string') monthStr = item.month.substring(0,3);
         const idx = monthsTemplate.findIndex(m => m.name.toLowerCase() === monthStr.toLowerCase());
         if(idx !== -1) { 
            monthsTemplate[idx].Pemasukan = Number(item.income || item.total_income || item.totalIncome || 0); 
            monthsTemplate[idx].Pengeluaran = Number(item.expense || item.total_expense || item.totalExpense || 0); 
         }
      });
      return monthsTemplate;
    }
    safeAllTransactions.forEach(tx => {
      const date = new Date(tx.transactionDate || tx.date || tx.createdAt);
      if (date && date.getFullYear() === selectedYear) {
         const amt = Number(tx.amount || 0);
         if (tx.type === 'income') monthsTemplate[date.getMonth()].Pemasukan += amt;
         else if (tx.type === 'expense') monthsTemplate[date.getMonth()].Pengeluaran += amt;
      }
    });
    return monthsTemplate;
  }, [apiBarData, safeAllTransactions, selectedYear]);

  const pieData = useMemo(() => {
    const expenses = safeTransactions.filter(tx => tx.type === 'expense');
    const totals = expenses.reduce((acc, tx) => {
      acc[tx.category || 'Lainnya'] = (acc[tx.category || 'Lainnya'] || 0) + Number(tx.amount || 0);
      return acc;
    }, {});
    return Object.keys(totals).map(key => ({ name: key, value: totals[key] })).sort((a, b) => b.value - a.value);
  }, [safeTransactions]);

  const largestExpense = pieData.length > 0 ? pieData[0] : { name: '-', value: 0 };
  
  const behaviorKey = String(calculatedBehavior).toLowerCase().trim();
  const behaviorUI = {
    "belum ada data": { text: "Belum Cukup", color: "text-text-mutedLight", bg: "bg-base-light", hoverBorder: "hover:border-border-light" },
    "hemat": { text: "Hemat", color: "text-accent-light", bg: "bg-accent-light/10", hoverBorder: "hover:border-accent-light/40" },
    "boros": { text: "Boros", color: "text-danger-light", bg: "bg-danger-light/10", hoverBorder: "hover:border-danger-light/40" },
    "normal": { text: "Normal", color: "text-primary", bg: "bg-primary/10", hoverBorder: "hover:border-primary/40" },
    "normal / stabil": { text: "Normal", color: "text-primary", bg: "bg-primary/10", hoverBorder: "hover:border-primary/40" }
  }[behaviorKey] || { text: "Normal", color: "text-primary", bg: "bg-primary/10", hoverBorder: "hover:border-primary/40" };

  const investmentKey = String(calculatedInvestment).toLowerCase().trim();
  const investmentUI = {
    "belum ada data": { text: "Belum Cukup", color: "text-text-mutedLight", bg: "bg-base-light", hoverBorder: "hover:border-border-light" },
    "ready": { text: "Siap Investasi", color: "text-accent-light", bg: "bg-accent-light/10", hoverBorder: "hover:border-accent-light/40" },
    "moderately ready": { text: "Cukup Siap", color: "text-primary", bg: "bg-primary/10", hoverBorder: "hover:border-primary/40" },
    "not ready": { text: "Belum Siap", color: "text-danger-light", bg: "bg-danger-light/10", hoverBorder: "hover:border-danger-light/40" }
  }[investmentKey] || { text: "Belum Siap", color: "text-danger-light", bg: "bg-danger-light/10", hoverBorder: "hover:border-danger-light/40" };

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-500">
      
      {/* 1. KARTU HIGHLIGHT ATAS */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        
        <div className={`p-4 bg-card-light border border-border-light rounded-2xl md:rounded-3xl flex flex-col md:flex-row md:items-center gap-3 shadow-sm transition-all duration-300 ${behaviorUI.hoverBorder} group`}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${behaviorUI.bg}`}>
            <BrainCircuit size={18} className={behaviorUI.color} />
          </div>
          <div className="overflow-hidden">
            <p className="text-[10px] md:text-xs font-bold text-text-mutedLight uppercase tracking-widest mb-0.5">Perilaku</p>
            <p className={`text-base md:text-lg font-black truncate text-text-mainLight group-hover:${behaviorUI.color} transition-colors`}>{behaviorUI.text}</p>
          </div>
        </div>

        <div className={`p-4 bg-card-light border border-border-light rounded-2xl md:rounded-3xl flex flex-col md:flex-row md:items-center gap-3 shadow-sm transition-all duration-300 ${investmentUI.hoverBorder} group`}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${investmentUI.bg}`}>
            <Rocket size={18} className={investmentUI.color} />
          </div>
          <div className="overflow-hidden">
            <p className="text-[10px] md:text-xs font-bold text-text-mutedLight uppercase tracking-widest mb-0.5">Investasi</p>
            <p className={`text-base md:text-lg font-black truncate text-text-mainLight group-hover:${investmentUI.color} transition-colors`}>{investmentUI.text}</p>
          </div>
        </div>

        <div className="hidden md:flex p-4 bg-card-light border border-border-light rounded-3xl items-center gap-3 shadow-sm hover:border-danger-light/40 transition-all duration-300 group">
          <div className="w-10 h-10 rounded-xl bg-danger-light/10 flex items-center justify-center shrink-0">
            <TrendingDown size={18} className="text-danger-light" />
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-xs font-bold text-text-mutedLight uppercase tracking-widest mb-0.5">Pengeluaran Terbesar</p>
            <p className="text-lg font-black text-text-mainLight group-hover:text-danger-light transition-colors truncate">Rp {largestExpense.value.toLocaleString('id-ID')}</p>
            <p className="text-[11px] font-bold text-text-mutedLight truncate mt-0.5">{largestExpense.name}</p>
          </div>
        </div>

      </div>

      {/* 2. GRAFIK TREN ARUS KAS */}
      <div className="p-5 md:p-6 bg-card-light shadow-sm border border-border-light rounded-3xl overflow-hidden">
        <h4 className="text-sm font-bold text-text-mainLight mb-4 flex items-center gap-2">Tren Arus Kas</h4>
        
        <div className="w-full overflow-x-auto pb-4 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-border-light [&::-webkit-scrollbar-track]:bg-transparent">
          <div className="min-w-162.5 w-full" style={{ height: '300px' }}>
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e5f2" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#64748B' }} dy={10} />
                  <YAxis width={60} axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#64748B' }} tickFormatter={(value) => value >= 1000000 ? `${(value/1000000).toFixed(1)}jt` : value >= 1000 ? `${(value/1000).toFixed(0)}k` : value} />
                  <RechartsTooltip content={<CustomBarTooltip />} cursor={{ fill: '#f4f7fe' }} />
                  <Bar dataKey="Pemasukan" fill="#10B981" radius={[6, 6, 0, 0]} maxBarSize={32} />
                  <Bar dataKey="Pengeluaran" fill="#EF4444" radius={[6, 6, 0, 0]} maxBarSize={32} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* 3. KARTU BAWAH */}
      <div className="flex flex-col gap-4 md:gap-6">
        
        <div className="p-5 md:p-6 bg-card-light shadow-sm border border-border-light rounded-3xl w-full">
          <h4 className="text-sm font-bold text-text-mainLight mb-5">Distribusi Pengeluaran</h4>
          
          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 md:gap-12">
            
            <div className="w-full sm:w-auto flex items-center justify-center" style={{ width: isMobile ? 160 : 224, height: isMobile ? 160 : 224 }}>
              {pieData.length === 0 ? (
                <span className="text-xs text-text-mutedLight font-bold">0%</span>
              ) : (
                isMounted && (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie 
                        data={pieData} 
                        cx="50%" 
                        cy="50%" 
                        innerRadius={isMobile ? 40 : 65} 
                        outerRadius={isMobile ? 65 : 95} 
                        paddingAngle={3} 
                        dataKey="value" 
                        stroke="none"
                      >
                        {pieData.map((e, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                )
              )}
            </div>

            <div className="flex-1 w-full max-w-sm space-y-3 max-h-48 md:max-h-56 overflow-y-auto pr-3 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-border-light [&::-webkit-scrollbar-track]:bg-transparent">
              {pieData.length === 0 && <p className="text-xs text-text-mutedLight text-center sm:text-left">Belum ada pengeluaran dicatat.</p>}
              {pieData.map((item, index) => (
                <div key={index} className="flex items-center justify-between group hover:bg-base-light rounded-md transition-colors px-2 py-1">
                  <div className="flex items-center gap-3 min-w-0">
                    <span 
                      className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full shrink-0" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="truncate text-xs md:text-sm font-bold text-text-mainLight">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-xs md:text-sm font-bold text-text-mutedLight shrink-0">
                    {(summaryStats.totalPengeluaran > 0 ? (item.value / summaryStats.totalPengeluaran) * 100 : 0).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex md:hidden p-4 bg-card-light border border-border-light rounded-2xl items-center gap-3 shadow-sm group hover:border-danger-light/40 transition-all duration-300">
          <div className="w-10 h-10 rounded-xl bg-danger-light/10 flex items-center justify-center shrink-0">
            <TrendingDown size={18} className="text-danger-light" />
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-[10px] font-bold text-text-mutedLight uppercase tracking-widest mb-0.5">Pengeluaran Terbesar</p>
            <p className="text-base font-black text-text-mainLight group-hover:text-danger-light transition-colors truncate">Rp {largestExpense.value.toLocaleString('id-ID')}</p>
            <p className="text-[11px] font-bold text-text-mutedLight truncate mt-0.5">{largestExpense.name}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StatsTab;