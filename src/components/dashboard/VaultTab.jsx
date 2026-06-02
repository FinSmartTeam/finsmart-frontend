import { useState, useEffect } from 'react';
import { Target, Info, ShieldCheck, Plus, X, AlertCircle, CheckCircle2, Trash2, Edit2, Wallet, ChevronDown, Tag, Star, ArrowDownToLine } from 'lucide-react';
import api from '../../services/api';

const EXPENSE_CATEGORIES = [
  'Food & Dining', 'Transportation', 'Shopping', 'Groceries', 
  'Bills & Utilities', 'Entertainment', 'Health', 'Education', 'Others'
];

const MONTHS = [
  { id: 1, name: 'Januari' }, { id: 2, name: 'Februari' }, { id: 3, name: 'Maret' },
  { id: 4, name: 'April' }, { id: 5, name: 'Mei' }, { id: 6, name: 'Juni' },
  { id: 7, name: 'Juli' }, { id: 8, name: 'Agustus' }, { id: 9, name: 'September' },
  { id: 10, name: 'Oktober' }, { id: 11, name: 'November' }, { id: 12, name: 'Desember' }
];

const YEARS = [2024, 2025, 2026, 2027];

const VaultSkeleton = () => (
  <div className="space-y-8 w-full animate-pulse pb-10 mt-2">
    <div className="space-y-4">
       <div className="h-5 w-40 bg-border-light/60 rounded-md"></div>
       <div className="h-44 w-full max-w-md bg-card-light border border-border-light rounded-3xl"></div>
    </div>
    <div className="space-y-4 pt-4 border-t border-border-light/50">
       <div className="h-5 w-48 bg-border-light/60 rounded-md"></div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map(i => <div key={i} className="h-36 bg-card-light border border-border-light rounded-3xl"></div>)}
       </div>
    </div>
  </div>
);

const VaultTab = ({ allTransactions = [], selectedMonth, selectedYear }) => {
  const [vaults, setVaults] = useState([]);
  const [financialProfile, setFinancialProfile] = useState({ savingsTarget: 0, totalSavings: 0, financialGoal: '' });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [showInternalModal, setShowInternalModal] = useState(false);
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, type: '', id: null }); 

  const [topUpAmount, setTopUpAmount] = useState('');
  const [modalError, setModalError] = useState('');
  const [modalSuccess, setModalSuccess] = useState('');
  
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    category: '', limitAmount: '',
    month: selectedMonth || new Date().getMonth() + 1,
    year: selectedYear || new Date().getFullYear(),
    type: 'budget', goalName: '', savingsTarget: '', totalSavings: ''
  });

  useEffect(() => {
    window.openVaultModal = () => {
      setEditingId(null);
      setFormData({...formData, type: 'budget', category: '', limitAmount: ''});
      setShowInternalModal(true);
    };
    return () => { delete window.openVaultModal; };
  }, [formData]);

  const fetchVaultData = async () => {
    setIsLoading(true);
    try {
      try {
        const res = await api.get(`/budgets?month=${selectedMonth}&year=${selectedYear}`);
        const data = res.data?.data?.budgets || res.data?.budgets || res.data?.data || res.data || [];
        setVaults(Array.isArray(data) ? data : []);
      } catch (error) { setVaults([]); }

      try {
        const profRes = await api.get('/financial-profile');
        const profile = profRes.data?.data?.profile || profRes.data?.profile || profRes.data?.data || profRes.data || {};
        
        setFinancialProfile({
          savingsTarget: Number(profile.savings_target || profile.savingsTarget || profile.target || profile.targetAmount || 0),
          totalSavings: Number(profile.total_savings || profile.totalSavings || profile.current || profile.currentAmount || 0),
          financialGoal: profile.financial_goal || profile.financialGoal || profile.name || profile.goalName || ''
        });
      } catch (error) {}
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedMonth && selectedYear) fetchVaultData();
  }, [selectedMonth, selectedYear]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setModalError(''); 
    setModalSuccess('');

    try {
      if (formData.type === 'goal') {
        const payload = { financialGoal: formData.goalName, savingsTarget: Number(formData.savingsTarget), totalSavings: Number(formData.totalSavings || 0), monthlyIncome: 0, riskLevel: "Moderate" };
        await api.put('/financial-profile', payload);
        
        setFinancialProfile({ financialGoal: payload.financialGoal, savingsTarget: payload.savingsTarget, totalSavings: payload.totalSavings });
        setModalSuccess('Target Tabungan berhasil disimpan!');
      } else {
        const payload = { category: formData.category, limitAmount: Number(formData.limitAmount), month: Number(formData.month), year: Number(formData.year) };
        if (editingId && editingId !== 'goal') {
          await api.put(`/budgets/${editingId}`, { limitAmount: payload.limitAmount });
        } else {
          await api.post('/budgets', payload);
        }
        setModalSuccess('Anggaran berhasil disimpan!');
      }
      
      setTimeout(() => { 
        setShowInternalModal(false); 
        setEditingId(null);
        setModalSuccess('');
        setIsSubmitting(false);
        fetchVaultData(); 
      }, 1000);
      
    } catch (err) {
      setModalError('Terjadi kesalahan saat menyimpan data.');
      setIsSubmitting(false);
    }
  };

  const handleTopUp = async (e) => {
    e.preventDefault();
    if (!topUpAmount || Number(topUpAmount) <= 0) return;
    setIsSubmitting(true);
    setModalError('');
    setModalSuccess('');

    try {
      const newTotal = financialProfile.totalSavings + Number(topUpAmount);
      await api.put('/financial-profile', { ...financialProfile, totalSavings: newTotal, monthlyIncome: 0, riskLevel: "Moderate" });
      
      setFinancialProfile(prev => ({...prev, totalSavings: newTotal}));
      setModalSuccess('Berhasil menyetor ke tabungan!');
      
      setTimeout(() => { 
        setShowTopUpModal(false); 
        setTopUpAmount(''); 
        setModalSuccess(''); 
        setIsSubmitting(false);
      }, 1000);
    } catch (err) {
      setModalError('Gagal menyetor tabungan.');
      setIsSubmitting(false);
    } 
  };

  const handleEditBudget = (vault) => {
    setFormData({ ...formData, type: 'budget', category: vault.category, limitAmount: vault.limitAmount, month: vault.month, year: vault.year });
    setEditingId(vault.id); 
    setShowInternalModal(true);
  };

  const executeDelete = async () => {
    setIsLoading(true);
    try {
      if (deleteConfirm.type === 'budget') {
        await api.delete(`/budgets/${deleteConfirm.id}`);
      } else if (deleteConfirm.type === 'goal') {
        await api.put('/financial-profile', { financialGoal: '', savingsTarget: 0, totalSavings: 0, monthlyIncome: 0, riskLevel: "Moderate" });
        setFinancialProfile({ savingsTarget: 0, totalSavings: 0, financialGoal: '' });
      }
      await fetchVaultData();
    } catch (error) {
      alert("Gagal menghapus data.");
    } finally {
      setIsLoading(false);
      setDeleteConfirm({ isOpen: false, type: '', id: null });
    }
  };

  const hasFinancialGoal = financialProfile.savingsTarget > 0 || financialProfile.financialGoal !== '';
  const goalActualProgress = financialProfile.savingsTarget > 0 ? ((financialProfile.totalSavings / financialProfile.savingsTarget) * 100).toFixed(0) : 0;
  const goalBarProgress = Math.min(Number(goalActualProgress) || 0, 100);

  if (isLoading && vaults.length === 0 && !hasFinancialGoal) {
    return <VaultSkeleton />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">

      {/* SECTION A: TARGET TABUNGAN */}
      <div className="space-y-4">
        <h4 className="text-base font-black text-text-mainLight">Target Tabungan</h4>
        
        {hasFinancialGoal ? (
          <div className="max-w-md p-6 bg-linear-to-br from-card-light to-base-light border border-primary/20 shadow-lg shadow-primary/5 rounded-3xl relative overflow-hidden flex flex-col justify-between group">
            
            {/* Tombol Standby di Mobile, Muncul Hover di Desktop */}
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-base-light/90 md:bg-base-light/80 backdrop-blur-sm p-1 rounded-lg z-10 border border-border-light/50 transition-all duration-300 opacity-100 translate-y-0 md:opacity-0 md:-translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0">
               <button onClick={(e) => { e.stopPropagation(); setFormData({...formData, type: 'goal', goalName: financialProfile.financialGoal, savingsTarget: financialProfile.savingsTarget, totalSavings: financialProfile.totalSavings}); setEditingId('goal'); setShowInternalModal(true); }} className="p-1.5 text-text-mutedLight hover:text-primary transition-colors cursor-pointer rounded-md hover:bg-primary/10">
                 <Edit2 size={14} />
               </button>
               <button onClick={(e) => { e.stopPropagation(); setDeleteConfirm({ isOpen: true, type: 'goal', id: null }); }} className="p-1.5 text-text-mutedLight hover:text-danger-light transition-colors cursor-pointer rounded-md hover:bg-danger-light/10">
                 <Trash2 size={14} />
               </button>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-5 pr-16">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-primary text-white shadow-md shadow-primary/30">
                  <Star size={18} />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest">Target Finansial</h4>
                  <p className="text-base font-black text-text-mainLight truncate">{financialProfile.financialGoal}</p>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-bold text-text-mutedLight uppercase tracking-wider mb-0.5">Terkumpul</p>
                    <p className="text-sm font-black text-text-mainLight">Rp {financialProfile.totalSavings.toLocaleString('id-ID')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-text-mutedLight uppercase tracking-wider mb-0.5">Target</p>
                    <p className="text-sm font-bold text-text-mutedLight">Rp {financialProfile.savingsTarget.toLocaleString('id-ID')}</p>
                  </div>
                </div>

                <div className="w-full h-2.5 bg-base-light rounded-full overflow-hidden shadow-inner border border-border-light/50">
                  <div className="h-full rounded-full transition-all duration-1000 ease-out bg-primary" style={{ width: `${goalBarProgress}%` }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-[10px] font-bold text-primary">
                    {goalActualProgress}% {Number(goalActualProgress) >= 100 ? 'Tercapai! 🎉' : ''}
                  </p>
                </div>
              </div>
            </div>

            <button 
              onClick={(e) => { e.stopPropagation(); setShowTopUpModal(true); }}
              className="mt-5 w-full py-2.5 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowDownToLine size={14} /> Setor ke Tabungan
            </button>
          </div>
        ) : (
          <div className="max-w-md p-8 bg-card-light border border-border-light border-dashed rounded-3xl flex flex-col items-center justify-center text-center opacity-70">
            <Star size={32} className="text-text-mutedLight mb-3" />
            <p className="text-sm font-bold text-text-mainLight">Belum Ada Target</p>
            <p className="text-xs text-text-mutedLight mt-1 mb-4">Sistem butuh 1 target utama untuk mengevaluasi kesiapan investasimu.</p>
            <button onClick={() => { setEditingId('goal'); setFormData({...formData, type: 'goal', goalName: '', savingsTarget: '', totalSavings: ''}); setShowInternalModal(true); }} className="text-xs font-bold text-primary hover:underline cursor-pointer">Buat Target Tabungan</button>
          </div>
        )}
      </div>

      {/* SECTION B: POS ANGGARAN BULANAN */}
      <div className="space-y-4 pt-4 border-t border-border-light">
        <h4 className="text-base font-black text-text-mainLight">Anggaran Bulanan</h4>
        
        {vaults.length === 0 ? (
          <div className="p-10 bg-card-light border border-border-light border-dashed rounded-3xl flex flex-col items-center justify-center text-center opacity-70">
            <Wallet size={32} className="text-text-mutedLight mb-3" />
            <p className="text-sm font-bold text-text-mainLight">Belum Ada Anggaran</p>
            <p className="text-xs text-text-mutedLight mt-1">Batasi pengeluaranmu per kategori di sini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vaults.map((vault) => {
              const target = Number(vault.limitAmount) || 1;
              const current = allTransactions.filter(tx => tx.type === 'expense' && tx.category === vault.category && (new Date(tx.transactionDate || tx.createdAt).getMonth() + 1) === selectedMonth).reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
              
              const actualProgress = target > 0 ? ((current / target) * 100).toFixed(0) : 0;
              const barProgress = Math.min(Number(actualProgress) || 0, 100);
              let pColor = actualProgress > 100 ? 'bg-danger-main' : actualProgress > 85 ? 'bg-danger-light' : actualProgress > 60 ? 'bg-accent-light' : 'bg-primary';

              return (
                <div key={vault.id} className="p-5 bg-card-light border border-border-light rounded-3xl shadow-xs relative group">
                  
                  {/* Tombol Standby di Mobile, Muncul Hover di Desktop */}
                  <div className="absolute top-4 right-4 flex gap-2 bg-card-light/90 md:bg-card-light/80 backdrop-blur-sm p-1 rounded-lg z-10 border border-border-light/50 transition-all duration-300 opacity-100 translate-y-0 md:opacity-0 md:-translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0">
                    <button onClick={(e) => { e.stopPropagation(); handleEditBudget(vault); }} className="p-1.5 text-text-mutedLight hover:text-primary rounded-md hover:bg-primary/10 cursor-pointer"><Edit2 size={14} /></button>
                    <button onClick={(e) => { e.stopPropagation(); setDeleteConfirm({ isOpen: true, type: 'budget', id: vault.id }); }} className="p-1.5 text-text-mutedLight hover:text-danger-light rounded-md hover:bg-danger-light/10 cursor-pointer"><Trash2 size={14} /></button>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-4 pr-16">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary"><Wallet size={14} /></div>
                    <div>
                      <h4 className="text-[9px] font-bold text-text-mutedLight uppercase tracking-widest">Kategori</h4>
                      <p className="text-sm font-black text-text-mainLight truncate">{vault.category}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-end">
                       <div>
                         <p className="text-[9px] font-bold text-text-mutedLight uppercase tracking-wider mb-0.5">Terpakai</p>
                         <p className="text-sm font-black text-text-mainLight">Rp {current.toLocaleString('id-ID')}</p>
                       </div>
                       <div className="text-right">
                         <p className="text-[9px] font-bold text-text-mutedLight uppercase tracking-wider mb-0.5">Batas</p>
                         <p className="text-sm font-bold text-text-mutedLight">Rp {target.toLocaleString('id-ID')}</p>
                       </div>
                    </div>
                    
                    <div className="w-full h-2.5 bg-base-light rounded-full overflow-hidden shadow-inner border border-border-light/50">
                      <div className={`h-full rounded-full transition-all duration-1000 ease-out ${pColor}`} style={{ width: `${barProgress}%` }}></div>
                    </div>
                    <p className={`text-[10px] font-bold text-right ${actualProgress > 85 ? 'text-danger-light' : 'text-text-mutedLight'}`}>
                      {actualProgress}% {Number(actualProgress) > 100 ? '(Overbudget!)' : ''}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal Setor Tabungan */}
      {showTopUpModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card-light border border-border-light rounded-3xl w-full max-w-xs p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-base font-black text-text-mainLight mb-4">Setor Tabungan</h3>
            
            {modalError && <p className="text-xs text-danger-light bg-danger-light/10 p-2 rounded-lg mb-4">{modalError}</p>}
            {modalSuccess && <p className="text-xs text-accent-light bg-accent-light/10 p-2 rounded-lg mb-4">{modalSuccess}</p>}

            <form onSubmit={handleTopUp}>
              <div className="relative mb-4">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-mutedLight font-black text-[11px]">Rp</span>
                <input type="text" inputMode="numeric" placeholder="0" value={topUpAmount ? Number(topUpAmount).toLocaleString('id-ID') : ''} onChange={(e) => setTopUpAmount(e.target.value.replace(/[^0-9]/g, ''))} className="w-full pl-9 pr-3 py-2 bg-base-light border border-border-light rounded-xl text-sm font-bold focus:border-primary outline-none" required />
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setShowTopUpModal(false)} className="flex-1 py-2 bg-base-light hover:bg-border-light text-text-mutedLight rounded-xl text-xs font-bold cursor-pointer transition-colors">Batal</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-2 bg-primary text-white rounded-xl text-xs font-bold cursor-pointer disabled:opacity-70">
                  {isSubmitting ? 'Memproses...' : modalSuccess ? 'Berhasil!' : 'Setor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Form Tunggal (Anggaran / Tabungan) */}
      {showInternalModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card-light border border-border-light rounded-3xl w-full max-w-sm p-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button onClick={() => setShowInternalModal(false)} className="absolute top-4 right-4 text-text-mutedLight cursor-pointer"><X size={16}/></button>
            <h3 className="text-base font-black text-text-mainLight mb-4">
              {formData.type === 'goal' ? (editingId === 'goal' ? 'Edit Target Tabungan' : 'Target Tabungan Baru') : (editingId ? 'Edit Anggaran' : 'Anggaran Baru')}
            </h3>

            {modalError && <div className="mb-4 flex items-start gap-2 bg-danger-light/10 text-danger-light p-3 rounded-xl text-xs font-bold"><AlertCircle size={14} className="shrink-0 mt-0.5" />{modalError}</div>}
            {modalSuccess && <div className="mb-4 flex items-start gap-2 bg-accent-light/10 text-accent-light p-3 rounded-xl text-xs font-bold"><CheckCircle2 size={14} className="shrink-0 mt-0.5" />{modalSuccess}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              {formData.type === 'budget' ? (
                <>
                  <div className="relative">
                    <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} disabled={editingId !== null} required className="w-full px-4 py-3 bg-base-light border border-border-light rounded-xl text-xs font-medium outline-none focus:border-primary appearance-none cursor-pointer disabled:opacity-60">
                      <option value="" disabled>Pilih Kategori...</option>
                      {EXPENSE_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-mutedLight pointer-events-none" />
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-mutedLight font-black text-[11px]">Rp</span>
                    <input type="text" inputMode="numeric" placeholder="Batas Pengeluaran" value={formData.limitAmount ? Number(formData.limitAmount).toLocaleString('id-ID') : ''} onChange={(e) => setFormData({...formData, limitAmount: e.target.value.replace(/[^0-9]/g, '')})} required className="w-full pl-9 pr-3 py-3 bg-base-light border border-border-light rounded-xl text-xs font-bold outline-none focus:border-primary" />
                  </div>
                </>
              ) : (
                <>
                  <input type="text" placeholder="Nama Target (Cth: Beli Laptop)" value={formData.goalName} onChange={(e) => setFormData({...formData, goalName: e.target.value})} required className="w-full px-4 py-3 bg-base-light border border-border-light rounded-xl text-xs font-medium outline-none focus:border-primary" />
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-mutedLight font-black text-[11px]">Rp</span>
                    <input type="text" inputMode="numeric" placeholder="Target Nominal" value={formData.savingsTarget ? Number(formData.savingsTarget).toLocaleString('id-ID') : ''} onChange={(e) => setFormData({...formData, savingsTarget: e.target.value.replace(/[^0-9]/g, '')})} required className="w-full pl-9 pr-3 py-3 bg-base-light border border-border-light rounded-xl text-xs font-bold outline-none focus:border-primary" />
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-mutedLight font-black text-[11px]">Rp</span>
                    <input type="text" inputMode="numeric" placeholder="Sudah Terkumpul Saat Ini" value={formData.totalSavings ? Number(formData.totalSavings).toLocaleString('id-ID') : ''} onChange={(e) => setFormData({...formData, totalSavings: e.target.value.replace(/[^0-9]/g, '')})} className="w-full pl-9 pr-3 py-3 bg-base-light border border-border-light rounded-xl text-xs font-bold outline-none focus:border-primary" />
                  </div>
                </>
              )}

              <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-primary text-white rounded-xl text-xs font-bold cursor-pointer disabled:opacity-70 shadow-sm">
                 {isSubmitting ? 'Memproses...' : modalSuccess ? 'Tersimpan!' : 'Simpan'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL KONFIRMASI HAPUS (Vault & Goal) */}
      {deleteConfirm.isOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card-light border border-border-light rounded-3xl w-full max-w-sm p-6 relative animate-in zoom-in-95 duration-200 shadow-2xl text-center">
            <div className="w-16 h-16 bg-danger-light/10 text-danger-light rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={32} />
            </div>
            <h3 className="text-lg font-black text-text-mainLight mb-2">Hapus {deleteConfirm.type === 'budget' ? 'Anggaran' : 'Target'}?</h3>
            <p className="text-xs text-text-mutedLight mb-6">Data ini akan dihapus secara permanen. Apakah kamu yakin ingin melanjutkannya?</p>
            
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm({ isOpen: false, type: '', id: null })} className="flex-1 py-3 bg-base-light hover:bg-border-light text-text-mutedLight rounded-xl text-xs font-bold transition-colors cursor-pointer">Batal</button>
              <button onClick={executeDelete} disabled={isLoading} className="flex-1 py-3 bg-danger-light hover:bg-danger-main text-white rounded-xl text-xs font-bold transition-colors shadow-md shadow-danger-light/20 cursor-pointer disabled:opacity-70">
                {isLoading ? 'Menghapus...' : 'Ya, Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VaultTab;