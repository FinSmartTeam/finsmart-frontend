import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, BarChart3, Wallet, LogOut, Plus, UserCircle,
  X, AlertCircle, CheckCircle2, Calendar, FileText, Tag, ChevronDown, Trash2
} from 'lucide-react';
import logo from '../assets/logo.svg';
import api from '../services/api';

import HomeTab from '../components/dashboard/HomeTab';
import StatsTab from '../components/dashboard/StatsTab';
import VaultTab from '../components/dashboard/VaultTab';
import BottomNav from '../components/BottomNav';

const EXPENSE_CATEGORIES = [
  'Food & Dining', 'Transportation', 'Shopping', 'Groceries', 
  'Bills & Utilities', 'Entertainment', 'Health', 'Education', 'Others'
];

const INCOME_CATEGORIES = [
  'Allowance / Salary', 'Part-Time Income', 'Business / Freelance', 'Others'
];

const MONTHS = [
  { id: 1, name: 'Januari' }, { id: 2, name: 'Februari' }, { id: 3, name: 'Maret' },
  { id: 4, name: 'April' }, { id: 5, name: 'Mei' }, { id: 6, name: 'Juni' },
  { id: 7, name: 'Juli' }, { id: 8, name: 'Agustus' }, { id: 9, name: 'September' },
  { id: 10, name: 'Oktober' }, { id: 11, name: 'November' }, { id: 12, name: 'Desember' }
];

const YEARS = [2024, 2025, 2026, 2027];

const DashboardSkeleton = () => (
  <div className="space-y-6 w-full animate-pulse">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {[1, 2, 3].map(i => (
        <div key={i} className="p-5 bg-card-light border border-border-light rounded-3xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-border-light/60 rounded-xl"></div>
            <div className="h-4 w-20 bg-border-light/60 rounded-md"></div>
          </div>
          <div className="h-8 w-32 bg-border-light/60 rounded-lg"></div>
        </div>
      ))}
    </div>
    <div className="p-5 md:p-8 bg-card-light border border-border-light rounded-3xl mt-6">
       <div className="h-5 w-48 bg-border-light/60 rounded-md mb-8"></div>
       <div className="space-y-6">
         {[1, 2, 3, 4].map(i => (
           <div key={i} className="flex justify-between items-center pb-5 border-b border-border-light/50 last:border-0 last:pb-0">
             <div className="flex gap-4 items-center w-full">
                 <div className="w-12 h-12 bg-border-light/60 rounded-2xl shrink-0"></div>
                 <div className="space-y-2.5 w-full max-w-[200px]">
                   <div className="h-4 w-full bg-border-light/60 rounded-md"></div>
                   <div className="h-3 w-2/3 bg-border-light/60 rounded-md"></div>
                 </div>
             </div>
             <div className="h-5 w-24 bg-border-light/60 rounded-md shrink-0"></div>
           </div>
         ))}
       </div>
    </div>
  </div>
);

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem('finSmart_activeTab') || 'home');
  useEffect(() => localStorage.setItem('finSmart_activeTab', activeTab), [activeTab]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null); 

  const [isLoading, setIsLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [modalSuccess, setModalSuccess] = useState('');
  const [modalError, setModalError] = useState('');

  const [userProfile, setUserProfile] = useState({ fullName: 'Pengguna FinSmart', email: '' }); 
  const [allTransactions, setAllTransactions] = useState([]); 
  const [editingId, setEditingId] = useState(null);

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // State untuk Dropdown Custom
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setOpenDropdown(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [newTransaction, setNewTransaction] = useState({
    description: '', amount: '', type: 'expense',
    transactionDate: new Date().toISOString().split('T')[0], category: ''
  });

  const fetchAllDashboardData = async () => {
    setIsLoading(true);
    try {
      try {
        const profileRes = await api.get('/auth/me'); 
        if (profileRes.data) setUserProfile(profileRes.data.data || profileRes.data || { fullName: 'User FinSmart' });
      } catch (err) {}

      const transactionsRes = await api.get('/transactions');
      const txData = transactionsRes.data?.data?.transactions || transactionsRes.data?.data || transactionsRes.data || [];
      const safeTxData = Array.isArray(txData) ? txData : [];
      
      safeTxData.sort((a, b) => new Date(b.transactionDate || b.createdAt) - new Date(a.transactionDate || a.createdAt));
      setAllTransactions(safeTxData);
    } catch (error) {
      console.error("Gagal sinkronisasi:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchAllDashboardData(); }, []);

  const filteredTransactions = useMemo(() => {
    return allTransactions.filter(tx => {
      const txDate = new Date(tx.transactionDate || tx.date || tx.createdAt);
      return (txDate.getMonth() + 1) === selectedMonth && txDate.getFullYear() === selectedYear;
    });
  }, [allTransactions, selectedMonth, selectedYear]);

  const financialSummary = useMemo(() => {
    let allTimeIncome = 0, allTimeExpense = 0, periodIncome = 0, periodExpense = 0;

    allTransactions.forEach(tx => {
      const amount = Number(tx.amount || 0);
      const txDate = new Date(tx.transactionDate || tx.date || tx.createdAt);
      const isCurrentPeriod = (txDate.getMonth() + 1) === selectedMonth && txDate.getFullYear() === selectedYear;
      
      if (tx.type === 'income') {
        allTimeIncome += amount;
        if (isCurrentPeriod) periodIncome += amount;
      } else if (tx.type === 'expense') {
        allTimeExpense += amount;
        if (isCurrentPeriod) periodExpense += amount;
      }
    });

    return { totalSaldo: allTimeIncome - allTimeExpense, totalPemasukan: periodIncome, totalPengeluaran: periodExpense };
  }, [allTransactions, selectedMonth, selectedYear]);

  const handleTypeChange = (selectedType) => setNewTransaction({ ...newTransaction, type: selectedType, category: '' });

  const handleEditClick = (tx) => {
    const rawDate = tx.transactionDate || tx.date || tx.createdAt;
    const formattedDate = rawDate ? new Date(rawDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    
    setNewTransaction({ description: tx.description || '', amount: tx.amount || '', type: tx.type || 'expense', transactionDate: formattedDate, category: tx.category || '' });
    setEditingId(tx.id);
    setShowAddModal(true);
  };

  const executeDeleteTransaction = async () => {
    if (!deleteConfirmId) return;
    setIsLoading(true);
    try {
      await api.delete(`/transactions/${deleteConfirmId}`);
      await fetchAllDashboardData();
      setRefreshTrigger(prev => prev + 1); 
    } catch (error) { alert("Gagal menghapus transaksi."); } 
    finally { setIsLoading(false); setDeleteConfirmId(null); }
  };

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    if (!newTransaction.description || !newTransaction.amount || !newTransaction.transactionDate || !newTransaction.category) {
        setModalError('Mohon lengkapi semua data, termasuk kategori.'); return;
    }
    setModalError(''); setModalSuccess(''); setIsLoading(true);

    try {
      const payload = { description: newTransaction.description, amount: Number(newTransaction.amount), type: newTransaction.type, transactionDate: new Date(newTransaction.transactionDate).toISOString(), category: newTransaction.category };
      if (editingId) { await api.put(`/transactions/${editingId}`, payload); setModalSuccess('Transaksi berhasil diperbarui!'); } 
      else { await api.post('/transactions', payload); setModalSuccess('Transaksi berhasil disimpan!'); }
      
      setTimeout(async () => {
        setNewTransaction({ description: '', amount: '', type: 'expense', transactionDate: new Date().toISOString().split('T')[0], category: '' });
        setEditingId(null); setShowAddModal(false); setModalSuccess('');
        await fetchAllDashboardData(); setRefreshTrigger(prev => prev + 1);
      }, 1000);
    } catch (error) {
      setModalError(error.response?.data?.message || 'Gagal mengirim data ke server.');
    } finally { setIsLoading(false); }
  };

  const handleLogoutAction = () => {
    localStorage.removeItem('finSmart_token');
    localStorage.removeItem('finSmart_activeTab');
    if (onLogout) onLogout(); else navigate('/auth');
  };

  const menuItems = [
    { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'stats', label: 'Statistik', icon: BarChart3 },
    { id: 'vault', label: 'Vault', icon: Wallet },
  ];

  return (
    <div className="min-h-screen bg-base-light text-text-mainLight flex font-sans selection:bg-primary selection:text-white">
      
      <aside className="w-64 bg-card-light border-r border-border-light shadow-xs p-6 flex flex-col justify-between hidden md:flex shrink-0 z-20">
        <div className="space-y-8">
          <div className="flex items-center gap-3 pl-2">
            <img src={logo} alt="FinSmart Logo" className="h-6 object-contain cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('/')} />
          </div>
          <nav className="space-y-1.5">
            {menuItems.map((item) => (
              <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${activeTab === item.id ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-text-mutedLight hover:bg-base-light hover:text-text-mainLight'}`}>
                <item.icon size={18} /> {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="pt-6 border-t border-border-light space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0"><UserCircle size={20} /></div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-text-mainLight truncate">{userProfile?.fullName || 'User FinSmart'}</p>
              <p className="text-xs text-text-mutedLight font-medium truncate">{userProfile?.email || 'Online'}</p>
            </div>
          </div>
          <button onClick={handleLogoutAction} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-danger-light hover:bg-danger-light/10 rounded-xl transition-all cursor-pointer">
            <LogOut size={18} /> Keluar
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto max-h-screen bg-base-light [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        <div className="sticky top-0 z-30 bg-base-light/60 backdrop-blur-2xl px-5 md:px-10 pt-6 md:pt-10 pb-4 border-b border-border-light/60 flex justify-between items-center gap-4 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
          <div>
            <h2 className="text-xl font-black text-text-mainLight tracking-tight hidden sm:block">
              {activeTab === 'home' && 'Ringkasan Finansial'}
              {activeTab === 'stats' && 'Laporan & Tren'}
              {activeTab === 'vault' && 'Pusat Alokasi Anggaran'}
            </h2>
            
            {/* Custom Dropdown Bulan & Tahun */}
            <div className="flex items-center gap-2 sm:mt-2.5" ref={dropdownRef}>
              <div className="relative">
                <button onClick={() => setOpenDropdown(openDropdown === 'month' ? null : 'month')} className="flex items-center gap-2 pl-3 pr-2.5 py-1.5 bg-card-light border border-border-light shadow-sm rounded-lg text-xs font-bold text-text-mainLight hover:border-primary/50 transition-all cursor-pointer">
                  {MONTHS.find(m => m.id === selectedMonth)?.name}
                  <ChevronDown size={14} className={`text-text-mutedLight transition-transform duration-200 ${openDropdown === 'month' ? 'rotate-180 text-primary' : ''}`} />
                </button>
                {openDropdown === 'month' && (
                  <div className="absolute top-full left-0 mt-1 w-36 bg-card-light border border-border-light rounded-xl shadow-lg z-50 py-1.5 max-h-48 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
                    {MONTHS.map(m => (
                      <button key={m.id} onClick={() => { setSelectedMonth(m.id); setOpenDropdown(null); }} className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${selectedMonth === m.id ? 'text-primary bg-primary/10 font-bold' : 'text-text-mainLight hover:bg-base-light hover:text-primary'}`}>
                        {m.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <button onClick={() => setOpenDropdown(openDropdown === 'year' ? null : 'year')} className="flex items-center gap-2 pl-3 pr-2.5 py-1.5 bg-card-light border border-border-light shadow-sm rounded-lg text-xs font-bold text-text-mainLight hover:border-primary/50 transition-all cursor-pointer">
                  {selectedYear}
                  <ChevronDown size={14} className={`text-text-mutedLight transition-transform duration-200 ${openDropdown === 'year' ? 'rotate-180 text-primary' : ''}`} />
                </button>
                {openDropdown === 'year' && (
                  <div className="absolute top-full left-0 mt-1 w-24 bg-card-light border border-border-light rounded-xl shadow-lg z-50 py-1.5 max-h-48 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
                    {YEARS.map(y => (
                      <button key={y} onClick={() => { setSelectedYear(y); setOpenDropdown(null); }} className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${selectedYear === y ? 'text-primary bg-primary/10 font-bold' : 'text-text-mainLight hover:bg-base-light hover:text-primary'}`}>
                        {y}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            {activeTab === 'vault' && (
              <button onClick={() => window.openVaultModal && window.openVaultModal()} className="flex bg-primary/10 text-primary hover:bg-primary hover:text-white w-10 h-10 md:w-auto md:h-auto md:px-4 md:py-2.5 rounded-xl text-xs font-bold items-center justify-center md:gap-2 shadow-sm transition-all shrink-0 cursor-pointer">
                <Plus size={18} className="stroke-[2.5px] md:w-4 md:h-4" /> <span className="hidden md:inline">Buat Anggaran</span>
              </button>
            )}
            <button onClick={() => { setEditingId(null); setNewTransaction({ description: '', amount: '', type: 'expense', transactionDate: new Date().toISOString().split('T')[0], category: '' }); setShowAddModal(true); }} className="hidden md:flex bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-xl text-xs font-bold items-center justify-center gap-2 shadow-md hover:-translate-y-0.5 transition-all shrink-0 cursor-pointer">
              <Plus size={16} /> Transaksi Baru
            </button>
          </div>
        </div>

        {/* FIX: Conditional Rendering agar komponen bersih saat ganti Tab */}
        <div className="px-5 md:px-10 pb-28 md:pb-10 pt-4 space-y-5">
          {isLoading && allTransactions.length === 0 ? (
            <DashboardSkeleton />
          ) : (
            <>
              {activeTab === 'home' && <HomeTab transactions={filteredTransactions} totalSaldo={financialSummary.totalSaldo} totalPemasukan={financialSummary.totalPemasukan} totalPengeluaran={financialSummary.totalPengeluaran} onEditTransaction={handleEditClick} onDeleteTransaction={(id) => setDeleteConfirmId(id)} />}
              {activeTab === 'stats' && <StatsTab summaryStats={financialSummary} categoryStats={filteredTransactions} allTransactions={allTransactions} selectedMonth={selectedMonth} selectedYear={selectedYear} refreshTrigger={refreshTrigger} />}
              {activeTab === 'vault' && <VaultTab allTransactions={allTransactions} selectedMonth={selectedMonth} selectedYear={selectedYear} />}
            </>
          )}
        </div>
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} onAddClick={() => { setEditingId(null); setNewTransaction({ description: '', amount: '', type: 'expense', transactionDate: new Date().toISOString().split('T')[0], category: '' }); setShowAddModal(true); }} />

      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card-light border border-border-light rounded-3xl w-full max-w-lg p-6 relative animate-in zoom-in-95 duration-200 shadow-2xl">
            <button onClick={() => { setShowAddModal(false); setEditingId(null); setModalError(''); setModalSuccess(''); }} className="absolute top-5 right-5 text-text-mutedLight hover:text-text-mainLight cursor-pointer"><X size={20} /></button>
            <h3 className="text-lg font-black text-text-mainLight flex items-center gap-2 mb-1"><Wallet size={18} className="text-primary" /> {editingId ? 'Edit Transaksi' : 'Catat Transaksi'}</h3>
            <p className="text-xs text-text-mutedLight mb-5">Masukkan detail finansialmu secara manual.</p>

            {modalError && <div className="mb-4 bg-danger-light/10 text-danger-light p-3 rounded-xl text-xs font-bold flex items-center gap-2"><AlertCircle size={16} />{modalError}</div>}
            {modalSuccess && <div className="mb-4 bg-accent-light/10 text-accent-light p-3 rounded-xl text-xs font-bold flex items-center gap-2"><CheckCircle2 size={16} />{modalSuccess}</div>}

            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div className="p-1 bg-base-light border border-border-light rounded-xl flex">
                <button type="button" onClick={() => handleTypeChange('expense')} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${newTransaction.type === 'expense' ? 'bg-danger-light/10 text-danger-light shadow-sm' : 'text-text-mutedLight'}`}>Pengeluaran (-)</button>
                <button type="button" onClick={() => handleTypeChange('income')} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${newTransaction.type === 'income' ? 'bg-accent-light/10 text-accent-light shadow-sm' : 'text-text-mutedLight'}`}>Pemasukan (+)</button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-mutedLight" />
                  <input type="date" value={newTransaction.transactionDate} onChange={(e) => setNewTransaction({...newTransaction, transactionDate: e.target.value})} required className="w-full pl-9 pr-3 py-3 bg-base-light border border-border-light rounded-xl text-xs font-medium outline-none focus:border-primary" />
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-mutedLight font-black text-[11px]">Rp</span>
                  <input type="text" inputMode="numeric" placeholder="0" value={newTransaction.amount ? Number(newTransaction.amount).toLocaleString('id-ID') : ''} onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value.replace(/[^0-9]/g, '')})} required className="w-full pl-9 pr-3 py-3 bg-base-light border border-border-light rounded-xl text-xs font-bold outline-none focus:border-primary" />
                </div>
              </div>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-mutedLight" />
                <input type="text" placeholder="Keterangan..." value={newTransaction.description} onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})} required className="w-full pl-9 pr-3 py-3 bg-base-light border border-border-light rounded-xl text-xs font-medium outline-none focus:border-primary" />
              </div>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-mutedLight" />
                <select value={newTransaction.category} onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})} required className="w-full pl-9 pr-8 py-3 bg-base-light border border-border-light rounded-xl text-xs font-medium appearance-none outline-none focus:border-primary cursor-pointer">
                  <option value="" disabled>Pilih Kategori...</option>
                  {(newTransaction.type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-mutedLight pointer-events-none" />
              </div>
              <button type="submit" disabled={isLoading} className="w-full bg-primary text-white font-bold py-3 rounded-xl text-xs shadow-md shadow-primary/20 hover:bg-primary/90 transition-all cursor-pointer">
                {isLoading && !modalSuccess ? 'Memproses...' : 'Simpan'}
              </button>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card-light border border-border-light rounded-3xl w-full max-w-sm p-6 relative animate-in zoom-in-95 duration-200 shadow-2xl text-center">
            <div className="w-16 h-16 bg-danger-light/10 text-danger-light rounded-full flex items-center justify-center mx-auto mb-4"><Trash2 size={32} /></div>
            <h3 className="text-lg font-black text-text-mainLight mb-2">Hapus Transaksi?</h3>
            <p className="text-xs text-text-mutedLight mb-6">Data ini akan dihapus secara permanen dan memengaruhi total saldomu. Lanjutkan?</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirmId(null)} className="flex-1 py-3 bg-base-light hover:bg-border-light text-text-mutedLight rounded-xl text-xs font-bold transition-colors cursor-pointer">Batal</button>
              <button onClick={executeDeleteTransaction} disabled={isLoading} className="flex-1 py-3 bg-danger-light hover:bg-danger-main text-white rounded-xl text-xs font-bold transition-colors shadow-md shadow-danger-light/20 cursor-pointer disabled:opacity-70">
                {isLoading ? 'Menghapus...' : 'Ya, Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;