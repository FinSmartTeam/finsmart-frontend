import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, KeyRound } from 'lucide-react';
import logo from '../assets/logo.svg';
import api from '../services/api';

const Auth = () => {
  const navigate = useNavigate();
  // Status: 'login', 'register', 'activation'
  const [authMode, setAuthMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    otpCode: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(''); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      if (authMode === 'register') {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Konfirmasi kata sandi tidak cocok.');
        }

        const response = await api.post('/auth/register', {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword
        });
        
        alert(response.data?.message || 'Registrasi sukses! Silakan cek email Anda untuk kode OTP.');
        setAuthMode('activation');
        
      } else if (authMode === 'activation') {
        await api.post('/auth/activation', {
          email: formData.email,
          code: formData.otpCode
        });
        
        setAuthMode('login');
        setFormData({ ...formData, password: '', confirmPassword: '', otpCode: '' });
        alert('Akun Anda berhasil diaktivasi! Silakan login.');
        
      } else if (authMode === 'login') {
        const response = await api.post('/auth/login', {
          email: formData.email,
          password: formData.password
        });

        const token = response.data?.data?.token || response.data?.token; // Fallback jika struktur berbeda
        
        if (token) {
          localStorage.setItem('finSmart_token', token);
          navigate('/dashboard');
        } else {
          throw new Error('Gagal mengambil token otorisasi dari server.');
        }
      }
    } catch (error) {
      console.error('Error Authentication:', error);
      
      const yupValidationMessage = error.response?.data?.error?.errors?.[0];
      const backendMetaMessage = error.response?.data?.meta?.message;
      const generalMessage = error.response?.data?.message;

      const finalErrorMessage = yupValidationMessage || backendMetaMessage || generalMessage || 'Terjadi kesalahan koneksi sistem.';
      
      setErrorMessage(finalErrorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-dark text-text-mainDark font-sans flex md:grid md:grid-cols-2">
      
      {/* Branding Area Desktop */}
      <div className="hidden md:flex flex-col justify-center px-20 bg-card-dark/30 border-r border-white/5">
        <div className="max-w-md space-y-6">
          <img src={logo} alt="FinSmart" className="h-10 mb-8 cursor-pointer" onClick={() => navigate('/')} />
          <h2 className="text-5xl font-extrabold text-white leading-tight">
            Kelola Keuangan <br />
            <span className="text-primary text-4xl font-medium">Tanpa Ribet.</span>
          </h2>
          <p className="text-text-mutedDark text-lg leading-relaxed">
            Mulai langkah cerdasmu hari ini. Bergabung dengan komunitas yang melek finansial dengan bantuan teknologi AI.
          </p>
        </div>
      </div>

      {/* Area Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-10 bg-base-dark">
        <div className="w-full max-w-90 space-y-8">
          
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              {authMode === 'login' && 'Selamat Datang'}
              {authMode === 'register' && 'Daftar Akun'}
              {authMode === 'activation' && 'Aktivasi Akun'}
            </h3>
            <p className="text-sm text-text-mutedDark">
              {authMode === 'login' && 'Masukkan email dan sandi Anda.'}
              {authMode === 'register' && 'Lengkapi data untuk akses penuh.'}
              {authMode === 'activation' && 'Masukkan 6 digit OTP yang dikirim ke email Anda.'}
            </p>
          </div>

          {/* Alert Error */}
          {errorMessage && (
            <div className="bg-danger-dark/20 border border-danger-dark/50 text-danger-dark p-3 rounded-lg text-sm text-center">
              {errorMessage}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            
            {/* --- INPUTS UNTUK REGISTER --- */}
            {authMode === 'register' && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-mutedDark" />
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Nama Lengkap" 
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-card-dark border border-white/10 rounded-xl text-sm text-white outline-none focus:border-primary transition-all"
                />
              </div>
            )}

            {/* --- INPUT EMAIL (Login & Register) --- */}
            {authMode !== 'activation' && (
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-mutedDark" />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="nama@email.com" 
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-card-dark border border-white/10 rounded-xl text-sm text-white outline-none focus:border-primary transition-all"
                />
              </div>
            )}

            {/* --- INPUT PASSWORD (Login & Register) --- */}
            {authMode !== 'activation' && (
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-mutedDark" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Kata Sandi" 
                  required
                  className="w-full pl-11 pr-12 py-3.5 bg-card-dark border border-white/10 rounded-xl text-sm text-white outline-none focus:border-primary transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-mutedDark hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            )}

            {/* --- INPUT KONFIRMASI PASSWORD (Register) --- */}
            {authMode === 'register' && (
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-mutedDark" />
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Konfirmasi Kata Sandi" 
                  required
                  className="w-full pl-11 pr-12 py-3.5 bg-card-dark border border-white/10 rounded-xl text-sm text-white outline-none focus:border-primary transition-all"
                />
                 <button 
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-mutedDark hover:text-white transition-colors cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            )}

            {/* --- INPUT OTP (Aktivasi) --- */}
            {authMode === 'activation' && (
              <div className="relative">
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-mutedDark" />
                <input 
                  type="text" 
                  name="otpCode"
                  value={formData.otpCode}
                  onChange={handleChange}
                  placeholder="Masukkan 6 Digit OTP" 
                  maxLength="6"
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-card-dark border border-white/10 rounded-xl text-center tracking-[0.5em] font-bold text-lg text-white outline-none focus:border-primary transition-all"
                />
              </div>
            )}

            {/* Tombol Submit */}
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white font-bold py-3.5 rounded-xl mt-4 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all text-sm cursor-pointer disabled:opacity-50"
            >
              {isLoading ? 'Memproses...' : (
                authMode === 'login' ? 'Masuk' : 
                authMode === 'register' ? 'Buat Akun' : 'Verifikasi OTP'
              )}
            </button>
          </form>

          {/* Toggle Login/Register */}
          {authMode !== 'activation' && (
            <p className="text-center text-xs text-text-mutedDark mt-6">
              {authMode === 'login' ? "Belum punya akun? " : "Sudah memiliki akun? "}
              <span 
                onClick={() => {
                  setAuthMode(authMode === 'login' ? 'register' : 'login');
                  setErrorMessage('');
                }}
                className="text-primary font-bold cursor-pointer hover:underline"
              >
                {authMode === 'login' ? 'Daftar Gratis' : 'Masuk di sini'}
              </span>
            </p>
          )}

        </div>
      </div>
    </div>
  );
};

export default Auth;