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
      <div className="bg-card-light/95 backdrop-blur-md border border-border-light p-3 rounded-xl shadow-lg">
        <p className="text-xs font-bold text-text-mutedLight mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm font-black flex items-center justify-between gap-4" style={{ color: entry.color }}>
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

  const [aiBehavior, setAiBehavior] = useState(null);
  const [aiInvestment, setAiInvestment] = useState(null);
  const [financialProfile, setFinancialProfile] = useState({ totalSavings: 0 });
  const [apiBarData, setApiBarData] = useState([]);
  const [isAiLoading, setIsAiLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsAiLoading(true);
      try {
        setAiBehavior(null); setAiInvestment(null);
        try {
          const profRes = await api.get('/financial-profile');
          setFinancialProfile({ totalSavings: Number(profRes.data?.data?.profile?.total_savings || 0) });
        } catch (e) {}
        try {
          const behaviorRes = await api.get(`/insights/behavior?month=${selectedMonth}&year=${selectedYear}`);
          setAiBehavior(behaviorRes.data?.data?.insight || behaviorRes.data?.behavior);
        } catch (e) {}
        try {
          const investRes = await api.get(`/insights/rekomendasi?month=${selectedMonth}&year=${selectedYear}`);
          setAiInvestment(investRes.data?.data?.insight || investRes.data?.rekomendasi);
        } catch (e) {}
        try {
          const trendRes = await api.get(`/dashboard/monthly?year=${selectedYear}`);
          setApiBarData(trendRes.data?.data?.months || trendRes.data?.months || []);
        } catch (e) {}
      } finally {
        setIsAiLoading(false);
      }
    };
    if (selectedMonth && selectedYear) fetchAnalytics();
  }, [selectedMonth, selectedYear, refreshTrigger]);

  const calculatedBehavior = useMemo(() => {
    if (aiBehavior) return aiBehavior; 
    let income = summaryStats?.totalPemasukan || 0;
    let expense = summaryStats?.totalPengeluaran || 0;
    let wants = 0;
    safeTransactions.forEach(tx => {
      if (tx.type === 'expense' && ['Shopping', 'Entertainment', 'Others'].includes(tx.category)) wants += Number(tx.amount || 0);
    });
    if (income === 0) return "Belum Ada Data";
    const savings = income - expense;
    if ((savings/income) > 0.2 && (wants/income) < 0.3) return "Hemat";
    if ((savings/income) < 0.2 && (wants/income) > 0.3) return "Boros";
    return "Normal / Stabil";
  }, [aiBehavior, safeTransactions, summaryStats]);

  const calculatedInvestment = useMemo(() => {
    if (aiInvestment) return aiInvestment;
    let income = summaryStats?.totalPemasukan || 0;
    let expense = summaryStats?.totalPengeluaran || 0;
    if (income === 0 && expense === 0) return "Belum Ada Data";
    const blr = expense > 0 ? (financialProfile.totalSavings / expense) : (financialProfile.totalSavings > 0 ? 4 : 0); 
    const sr = income > 0 ? ((income - expense) / income) * 100 : 0;

    if (blr < 1) return "Not Ready";
    if (blr >= 1 && blr <= 3) return sr < 10 ? "Not Ready" : "Moderately Ready";
    return sr < 10 ? "Moderately Ready" : "Ready";
  }, [aiInvestment, summaryStats, financialProfile.totalSavings]);

  const barData = useMemo(() => {
    const monthsTemplate = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'].map(name => ({ name, Pemasukan: 0, Pengeluaran: 0 }));
    if (apiBarData.length > 0) {
      apiBarData.forEach(item => {
         const idx = monthsTemplate.findIndex(m => m.name.toLowerCase() === item.month.substring(0,3).toLowerCase());
         if(idx !== -1) { monthsTemplate[idx].Pemasukan = Number(item.income || 0); monthsTemplate[idx].Pengeluaran = Number(item.expense || 0); }
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
  
  const behaviorUI = {
    "Belum Ada Data": { text: "Belum Cukup", color: "text-text-mutedLight", bg: "bg-base-light", border: "border-border-light" },
    "hemat": { text: "Hemat", color: "text-accent-light", bg: "bg-accent-light/10", border: "border-accent-light/30" },
    "boros": { text: "Boros", color: "text-danger-light", bg: "bg-danger-light/10", border: "border-danger-light/30" }
  }[calculatedBehavior.toLowerCase()] || { text: "Normal", color: "text-primary", bg: "bg-primary/10", border: "border-primary/30" };

  const investmentUI = {
    "Belum Ada Data": { text: "Belum Cukup", color: "text-text-mutedLight", bg: "bg-base-light", border: "border-border-light" },
    "Ready": { text: "Siap Investasi", color: "text-accent-light", bg: "bg-accent-light/10", border: "border-accent-light/30" },
    "Moderately Ready": { text: "Cukup Siap", color: "text-primary", bg: "bg-primary/10", border: "border-primary/30" }
  }[calculatedInvestment] || { text: "Belum Siap", color: "text-danger-light", bg: "bg-danger-light/10", border: "border-danger-light/30" };

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-500">
      
      <div className="grid grid-cols-2 gap-3 md:gap-5">
        <div className={`p-4 md:p-5 shadow-xs border rounded-3xl flex flex-col justify-center gap-2 ${behaviorUI.bg} ${behaviorUI.border}`}>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full bg-card-light/80 flex items-center justify-center shrink-0 ${behaviorUI.color}`}>
              <BrainCircuit size={16} />
            </div>
            <h4 className="text-[9px] md:text-[10px] font-bold text-text-mutedLight uppercase tracking-widest">Perilaku</h4>
          </div>
          <p className={`text-lg md:text-xl font-black truncate ${behaviorUI.color}`}>{behaviorUI.text}</p>
        </div>

        <div className={`p-4 md:p-5 shadow-xs border rounded-3xl flex flex-col justify-center gap-2 ${investmentUI.bg} ${investmentUI.border}`}>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full bg-card-light/80 flex items-center justify-center shrink-0 ${investmentUI.color}`}>
              <Rocket size={16} />
            </div>
            <h4 className="text-[9px] md:text-[10px] font-bold text-text-mutedLight uppercase tracking-widest">Investasi</h4>
          </div>
          <p className={`text-lg md:text-xl font-black truncate ${investmentUI.color}`}>{investmentUI.text}</p>
        </div>
      </div>

      <div className="p-4 md:p-6 bg-card-light shadow-xs border border-border-light rounded-3xl overflow-hidden">
        <h4 className="text-sm font-bold text-text-mainLight mb-4 flex items-center gap-2">Tren Arus Kas</h4>
        
        {/* CHART SWIPEABLE: Container overflow-x-auto agar batang lebih besar di mobile */}
        <div className="w-full overflow-x-auto pb-4 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-border-light [&::-webkit-scrollbar-track]:bg-transparent">
          <div className="min-w-125 h-62.5 md:h-75">
            <ResponsiveContainer width="100%" height="100%" className="focus:outline-none">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e5f2" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#64748B' }} dy={10} />
                <YAxis width={60} axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#64748B' }}
                  tickFormatter={(value) => value >= 1000000 ? `${(value/1000000).toFixed(1)}jt` : value >= 1000 ? `${(value/1000).toFixed(0)}k` : value}
                />
                <RechartsTooltip content={<CustomBarTooltip />} cursor={{ fill: '#f4f7fe' }} />
                <Bar dataKey="Pemasukan" fill="#10B981" radius={[4, 4, 0, 0]} maxBarSize={30} />
                <Bar dataKey="Pengeluaran" fill="#EF4444" radius={[4, 4, 0, 0]} maxBarSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="p-4 md:p-6 bg-card-light shadow-xs border border-border-light rounded-3xl flex items-center gap-6">
          <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
            {pieData.length === 0 ? (
              <span className="text-xs text-text-mutedLight font-bold">0%</span>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={35} outerRadius={50} paddingAngle={2} dataKey="value" stroke="none">
                    {pieData.map((e, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="flex-1 space-y-2">
            <h4 className="text-xs font-bold text-text-mainLight border-b border-border-light pb-2">Rincian</h4>
            <div className="space-y-2 max-h-25 overflow-y-auto pr-1">
              {pieData.map((item, index) => (
                <div key={index} className="flex justify-between text-[11px]">
                  <span className="font-bold text-text-mainLight truncate w-20">{item.name}</span>
                  <span className="font-medium text-text-mutedLight">{(summaryStats.totalPengeluaran > 0 ? (item.value / summaryStats.totalPengeluaran) * 100 : 0).toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6 bg-card-light shadow-xs border border-border-light rounded-3xl flex flex-col justify-center text-center items-center">
          <div className="w-10 h-10 rounded-full bg-danger-light/10 text-danger-light flex items-center justify-center mb-3">
            <TrendingDown size={20} />
          </div>
          <h4 className="text-[9px] font-bold text-text-mutedLight uppercase tracking-widest mb-1">Pengeluaran Terbesar</h4>
          <p className="text-lg font-black text-text-mainLight truncate w-full">{largestExpense.name}</p>
          <div className="mt-1 px-3 py-0.5 bg-danger-light/10 rounded-lg">
             <p className="text-xs font-bold text-danger-light">Rp {largestExpense.value.toLocaleString('id-ID')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsTab;