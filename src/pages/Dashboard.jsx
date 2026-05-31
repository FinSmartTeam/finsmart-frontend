import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  Wallet, 
  LogOut, 
  Plus, 
  UserCircle,
  X,
  AlertCircle,
  CheckCircle2,
  Calendar,
  FileText
} from 'lucide-react';
import logo from '../assets/logo.svg';
import api from '../services/api';

import HomeTab from '../components/dashboard/HomeTab';
import StatsTab from '../components/dashboard/StatsTab';
import VaultTab from '../components/dashboard/VaultTab';

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [modalSuccess, setModalSuccess] = useState('');
  const [modalError, setModalError] = useState('');

  const [userProfile, setUserProfile] = useState({ fullName: 'Pengguna FinSmart', email: '' }); 
  const [transactions, setTransactions] = useState([]); 
  const [vaults, setVaults] = useState([]); 
  const [financialSummary, setFinancialSummary] = useState({
    totalSaldo: 0,
    totalPemasukan: 0,
    totalPengeluaran: 0
  });

  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: '',
    type: 'expense',
    date: new Date().toISOString().split('T')[0] 
  });

  const fetchAllDashboardData = async () => {
    setIsLoading(true);
    try {
      try {
        const profileRes = await api.get('/auth/me'); 
        if (profileRes.data) setUserProfile(profileRes.data.data || profileRes.data || { fullName: 'User FinSmart' });
      } catch (err) {
        console.warn("Menggunakan data token untuk profil.");
      }

      const transactionsRes = await api.get('/transactions');
      const txData = transactionsRes.data?.data || transactionsRes.data || [];
      setTransactions(Array.isArray(txData) ? txData : []);

      try {
        const dashboardRes = await api.get('/dashboard');
        const dbData = dashboardRes.data?.data || dashboardRes.data || {};
        
        setFinancialSummary({
          totalSaldo: dbData.totalBalance ?? dbData.balance ?? dbData.totalSaldo ?? 0,
          totalPemasukan: dbData.totalIncome ?? dbData.income ?? dbData.totalPemasukan ?? 0,
          totalPengeluaran: dbData.totalExpense ?? dbData.expense ?? dbData.totalPengeluaran ?? 0
        });
      } catch (dbErr) {
        let incomeCalc = 0, expenseCalc = 0;
        if (Array.isArray(txData)) {
          txData.forEach(tx => {
            if (tx && tx.type === 'income') incomeCalc += Number(tx.amount || 0);
            else if (tx) expenseCalc += Number(tx.amount || 0);
          });
        }
        setFinancialSummary({
          totalSaldo: incomeCalc - expenseCalc,
          totalPemasukan: incomeCalc,
          totalPengeluaran: expenseCalc
        });
      }

      try {
        const budgetsRes = await api.get('/budgets'); 
        const bData = budgetsRes.data?.data || budgetsRes.data || [];
        setVaults(Array.isArray(bData) ? bData : []);
      } catch (bErr) {
        console.warn("Endpoint budgets belum siap.");
      }

    } catch (error) {
      console.error("Gagal sinkronisasi:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllDashboardData();
  }, []);

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    if (!newTransaction.description || !newTransaction.amount || !newTransaction.date) return;

    setModalError('');
    setModalSuccess('');
    setIsLoading(true);

    try {
      await api.post('/transactions', {
        description: newTransaction.description,
        amount: Number(newTransaction.amount),
        type: newTransaction.type,
        date: new Date(newTransaction.date).toISOString() 
      });

      setModalSuccess('Berhasil disimpan ke database!');
      
      setTimeout(async () => {
        setNewTransaction({ 
          description: '', 
          amount: '', 
          type: 'expense', 
          date: new Date().toISOString().split('T')[0] 
        });
        setShowAddModal(false);
        setModalSuccess('');
        await fetchAllDashboardData();
      }, 1500);

    } catch (error) {
      console.error("Gagal menambah transaksi:", error);
      setModalError(error.response?.data?.message || 'Gagal mengirim data.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoutAction = () => {
    localStorage.removeItem('finSmart_token');
    if (onLogout) onLogout();
    else navigate('/auth');
  };

  const menuItems = [
    { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'stats', label: 'Statistik', icon: BarChart3 },
    { id: 'vault', label: 'Vault', icon: Wallet },
  ];

  return (
    <div className="min-h-screen bg-base-light text-text-mainLight flex font-sans selection:bg-primary selection:text-white">
      
      {/* SIDEBAR DESKTOP */}
      <aside className="w-64 bg-card-light border-r border-border-light shadow-xs p-6 flex flex-col justify-between hidden md:flex shrink-0 z-20">
        <div className="space-y-8">
          <div className="flex items-center gap-3 pl-2">
            <img src={logo} alt="FinSmart Logo" className="h-6 object-contain cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('/')} />
          </div>

          <nav className="space-y-1.5">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  activeTab === item.id 
                    ? 'bg-primary text-white shadow-md shadow-primary/20' 
                    : 'text-text-mutedLight hover:bg-base-light hover:text-text-mainLight'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-border-light space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <UserCircle size={20} />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-text-mainLight truncate">{userProfile?.fullName || 'User FinSmart'}</p>
              <p className="text-xs text-text-mutedLight font-medium truncate">{userProfile?.email || 'Online'}</p>
            </div>
          </div>
          <button 
            onClick={handleLogoutAction}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-danger-light hover:bg-danger-light/10 rounded-xl transition-all cursor-pointer"
          >
            <LogOut size={18} />
            Keluar
          </button>
        </div>
      </aside>

      {/* WORKSPACE UTAMA */}
      <main className="flex-1 p-6 md:p-10 space-y-6 overflow-y-auto max-h-screen pb-24 md:pb-10 bg-base-light">
        <div className="flex justify-between items-center border-b border-border-light pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-text-mainLight tracking-tight">
                {activeTab === 'home' && 'Ringkasan Finansial'}
                {activeTab === 'stats' && 'Laporan & Tren AI'}
                {activeTab === 'vault' && 'Pusat Alokasi Anggaran'}
              </h2>
            </div>
          </div>

          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all shrink-0"
          >
            <Plus size={16} /> <span className="hidden sm:inline">Transaksi Baru</span>
          </button>
        </div>

        {/* LOADING STATE AMAN & RENDER KONTEN TAB */}
        {isLoading && transactions.length === 0 ? (
          <div className="min-h-[80vh] flex flex-col justify-center items-center space-y-3 animate-pulse">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-bold text-text-mutedLight">Sinkronisasi Database...</p>
          </div>
        ) : (
          activeTab === 'home' ? <HomeTab transactions={transactions} totalSaldo={financialSummary.totalSaldo} totalPemasukan={financialSummary.totalPemasukan} totalPengeluaran={financialSummary.totalPengeluaran} /> :
          activeTab === 'stats' ? <StatsTab summaryStats={financialSummary} categoryStats={transactions} /> :
          <VaultTab vaults={vaults} />
        )}
      </main>

      {/* BOTTOM NAV MOBILE */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card-light/95 backdrop-blur-xl border-t border-border-light shadow-[0_-4px_20px_rgba(0,0,0,0.02)] px-6 py-3 flex justify-between items-center z-40 md:hidden">
        {menuItems.map((item) => (
          <button 
            key={item.id} 
            onClick={() => setActiveTab(item.id)} 
            className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${activeTab === item.id ? 'text-primary' : 'text-text-mutedLight'}`}
          >
            <item.icon size={20} />
            <span className="text-[9px] font-black uppercase tracking-wider">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* MODAL POP-UP TRANSAKSI */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card-light border border-border-light rounded-3xl w-full max-w-lg p-6 md:p-8 relative animate-in fade-in zoom-in-95 duration-200 shadow-2xl">
            <button 
              onClick={() => { setShowAddModal(false); setModalError(''); setModalSuccess(''); }}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center bg-base-light rounded-full text-text-mutedLight hover:text-text-mainLight hover:bg-border-light transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>

            <div className="mb-6">
              <h3 className="text-xl font-black text-text-mainLight flex items-center gap-2.5">
                <div className="p-2 bg-primary/10 rounded-xl text-primary"><Wallet size={20} /></div>
                Catat Transaksi
              </h3>
              <p className="text-xs text-text-mutedLight font-medium mt-2 leading-relaxed max-w-sm">
                Masukkan detail finansialmu. Sistem akan mencatat tanggal dan AI akan menebak kategorinya.
              </p>
            </div>

            {/* AREA ALERT */}
            {modalError && (
              <div className="mb-5 flex items-start gap-2.5 bg-danger-light/10 border border-danger-light/20 text-danger-light p-3.5 rounded-xl text-xs font-bold animate-in fade-in">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <p className="leading-relaxed">{modalError}</p>
              </div>
            )}
            {modalSuccess && (
              <div className="mb-5 flex items-start gap-2.5 bg-accent-light/10 border border-accent-light/20 text-accent-light p-3.5 rounded-xl text-xs font-bold animate-in fade-in">
                <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                <p className="leading-relaxed">{modalSuccess}</p>
              </div>
            )}

            <form onSubmit={handleAddTransaction} className="space-y-5">
              
              {/* Toggle Pengeluaran/Pemasukan */}
              <div className="p-1 bg-base-light border border-border-light rounded-xl flex shadow-xs">
                <button
                  type="button"
                  onClick={() => setNewTransaction({...newTransaction, type: 'expense'})}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    newTransaction.type === 'expense' 
                      ? 'bg-danger-light/10 text-danger-light shadow-sm' 
                      : 'text-text-mutedLight hover:text-text-mainLight'
                  }`}
                >
                  Pengeluaran (-)
                </button>
                <button
                  type="button"
                  onClick={() => setNewTransaction({...newTransaction, type: 'income'})}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    newTransaction.type === 'income' 
                      ? 'bg-accent-light/10 text-accent-light shadow-sm' 
                      : 'text-text-mutedLight hover:text-text-mainLight'
                  }`}
                >
                  Pemasukan (+)
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* INPUT TANGGAL */}
                <div className="space-y-1.5 group">
                  <label className="text-[10px] font-bold text-text-mutedLight uppercase tracking-wider pl-1 group-focus-within:text-primary transition-colors">Tanggal</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-mutedLight group-focus-within:text-primary transition-colors" />
                    <input 
                      type="date"
                      value={newTransaction.date}
                      onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                      required
                      className="w-full pl-11 pr-4 py-3 bg-base-light border border-border-light rounded-xl text-xs font-medium text-text-mainLight outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-xs"
                    />
                  </div>
                </div>

                {/* INPUT NOMINAL */}
                <div className="space-y-1.5 group">
                  <label className="text-[10px] font-bold text-text-mutedLight uppercase tracking-wider pl-1 group-focus-within:text-primary transition-colors">Nominal</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-mutedLight font-black text-[11px] group-focus-within:text-primary transition-colors">Rp</span>
                    <input 
                      type="number"
                      placeholder="0"
                      value={newTransaction.amount}
                      onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-base-light border border-border-light rounded-xl text-xs font-bold text-text-mainLight outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-text-mutedLight/50 shadow-xs"
                    />
                  </div>
                </div>
              </div>

              {/* INPUT KETERANGAN */}
              <div className="space-y-1.5 group">
                <label className="text-[10px] font-bold text-text-mutedLight uppercase tracking-wider pl-1 group-focus-within:text-primary transition-colors">Keterangan Aktivitas</label>
                <div className="relative">
                  <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-mutedLight group-focus-within:text-primary transition-colors" />
                  <input 
                    type="text"
                    placeholder="Contoh: Beli kopi susu, Gaji bulanan, Bensin..."
                    value={newTransaction.description}
                    onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                    required
                    className="w-full pl-11 pr-4 py-3 bg-base-light border border-border-light rounded-xl text-xs font-medium text-text-mainLight outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-text-mutedLight/50 shadow-xs"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-white font-bold py-3.5 rounded-xl text-xs shadow-lg shadow-primary/20 hover:bg-primary/90 hover:-translate-y-0.5 transition-all mt-4 cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isLoading && !modalSuccess ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Memproses...
                  </>
                ) : 'Simpan Transaksi'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;