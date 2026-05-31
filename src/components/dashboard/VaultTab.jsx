import { Target, Info, ShieldCheck, Plus } from 'lucide-react';

const VaultTab = ({ vaults = [] }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      
      {/* 1. HEADER */}
      <div className="flex justify-between items-center bg-card-light shadow-sm p-5 rounded-2xl border border-border-light">
        <div>
           <h3 className="text-sm font-bold text-text-mainLight flex items-center gap-2">
             <ShieldCheck size={18} className="text-primary" /> Pusat Anggaran & Vault
           </h3>
           <p className="text-xs text-text-mutedLight font-medium mt-1">Kelola pos pengeluaran dan target tabungan Anda.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-primary hover:text-white transition-all shadow-sm active:scale-95">
          <Plus size={16} /> Buat Vault
        </button>
      </div>

      {/* 2. AREA VIEW */}
      {vaults.length === 0 ? (
        <div className="p-12 md:p-20 bg-card-light border border-border-light shadow-sm rounded-3xl text-center space-y-6 flex flex-col items-center">
            <div className="w-20 h-20 bg-base-light rounded-4xl border border-dashed border-border-light flex items-center justify-center relative">
                <Target size={40} className="text-primary/30" />
                <div className="absolute -bottom-2 -right-2 bg-danger-light w-6 h-6 rounded-full flex items-center justify-center text-xs text-white font-black shadow-md">0</div>
            </div>
            <div className="space-y-2 max-w-sm">
                <h4 className="text-xl font-black text-text-mainLight tracking-tight">Belum Ada Vault Aktif</h4>
                <p className="text-sm text-text-mutedLight font-medium leading-relaxed">
                    Anda belum memiliki pos anggaran atau target tabungan. Klik tombol "Buat Vault" di atas untuk mulai mengamankan finansial Anda.
                </p>
            </div>
            <div className="flex items-center gap-2.5 p-3 px-4 bg-base-light rounded-xl border border-border-light text-text-mutedLight text-xs max-w-md">
                <Info size={14} className="text-primary shrink-0" />
                <p className="font-medium">Gunakan Vault untuk mengunci anggaran seperti 'Belanja Bulanan' atau target seperti 'Beli Laptop Baru'.</p>
            </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
           {/* Konten vault yang sudah diisi akan muncul di sini */}
        </div>
      )}

    </div>
  );
};

export default VaultTab;