import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import logo from '../assets/logo.svg';
import api from '../services/api';

const Auth = () => {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // State untuk menyimpan error spesifik per kolom input
  const [fieldErrors, setFieldErrors] = useState({});

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    otpCode: '',
  });

  const [otpArray, setOtpArray] = useState(['', '', '', '', '', '']);

  // Validasi Regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Minimal 8 karakter, 1 huruf besar, 1 huruf kecil, 1 angka
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(''); 
    setSuccessMessage('');
    // Hilangkan warna merah jika user mulai mengetik ulang di kolom yang salah
    setFieldErrors({ ...fieldErrors, [e.target.name]: '' });
  };

  const switchMode = (mode) => {
    setAuthMode(mode);
    setErrorMessage('');
    setSuccessMessage('');
    setFieldErrors({});
    setFormData({ ...formData, password: '', confirmPassword: '', otpCode: '' });
    setOtpArray(['', '', '', '', '', '']);
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return; 
    const newOtp = [...otpArray];
    newOtp[index] = element.value;
    setOtpArray(newOtp);
    setFormData({ ...formData, otpCode: newOtp.join('') });
    setErrorMessage('');

    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otpArray[index] && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  const validateForm = () => {
    let errors = {};
    
    if (!emailRegex.test(formData.email)) {
      errors.email = 'Format email tidak valid (contoh: nama@email.com)';
    }

    if (authMode === 'register') {
      if (!passwordRegex.test(formData.password)) {
        errors.password = 'Minimal 8 karakter, wajib ada huruf BESAR, kecil, dan angka.';
      }
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Kata sandi tidak cocok.';
      }
    }

    setFieldErrors(errors);
    // Return true jika tidak ada error (panjang object 0)
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Stop proses ke backend jika format frontend salah
    if (!validateForm()) return;

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      if (authMode === 'register') {
        await api.post('/auth/register', {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword
        });
        
        setSuccessMessage('Registrasi sukses! Silakan cek email Anda untuk kode OTP.');
        setAuthMode('activation');
        
      } else if (authMode === 'activation') {
        if (formData.otpCode.length < 6) throw new Error('Harap masukkan 6 digit kode OTP.');

        await api.post('/auth/activation', {
          email: formData.email,
          code: formData.otpCode
        });
        
        setSuccessMessage('Akun Anda berhasil diaktivasi! Silakan masuk.');
        switchMode('login');
        
      } else if (authMode === 'login') {
        const response = await api.post('/auth/login', {
          email: formData.email,
          password: formData.password
        });

        const token = response.data?.data?.token || response.data?.token; 
        
        if (token) {
          localStorage.setItem('finSmart_token', token);
          navigate('/dashboard');
        } else {
          throw new Error('Gagal mengambil sesi login. Silakan coba lagi.');
        }
      }
    } catch (error) {
      console.error('Auth Error:', error);
      let finalErrorMessage = error.message || 'Terjadi kesalahan sistem. Silakan coba lagi.';

      if (error.response) {
        const status = error.response.status;
        const rawMsg = (error.response.data?.error?.errors?.[0] || error.response.data?.message || '').toLowerCase();

        if (status === 409) {
          finalErrorMessage = 'Email ini sudah terdaftar. Silakan gunakan email lain atau langsung masuk ke akun Anda.';
        } else if (status === 403) {
          finalErrorMessage = 'Email atau kata sandi yang Anda masukkan salah. Silakan periksa kembali.';
        } else if (status === 400) {
          if (rawMsg.includes('exist') || rawMsg.includes('already')) {
            finalErrorMessage = 'Email ini sudah terdaftar. Silakan masuk atau gunakan email lain.';
          } else if (rawMsg.includes('otp') || rawMsg.includes('code') || rawMsg.includes('activation')) {
            finalErrorMessage = 'Kode OTP tidak valid atau sudah kedaluwarsa.';
          } else if (rawMsg.includes('credentials') || rawMsg.includes('invalid')) {
            finalErrorMessage = 'Email atau kata sandi yang Anda masukkan salah.';
          } else {
            finalErrorMessage = error.response.data?.message || 'Data yang dimasukkan ditolak oleh server.';
          }
        } else if (status === 404) {
          finalErrorMessage = 'Akun tidak ditemukan. Pastikan alamat email Anda sudah benar.';
        } else if (status === 500) {
          finalErrorMessage = 'Server sedang mengalami gangguan teknis. Silakan coba beberapa saat lagi.';
        }
      }
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
        <div className="w-full max-w-md space-y-8">
          
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              {authMode === 'login' && 'Selamat Datang'}
              {authMode === 'register' && 'Daftar Akun Baru'}
              {authMode === 'activation' && 'Verifikasi Email'}
            </h3>
            <p className="text-sm text-text-mutedDark">
              {authMode === 'login' && 'Masukkan email dan sandi Anda untuk melanjutkan.'}
              {authMode === 'register' && 'Lengkapi data di bawah ini untuk mendapatkan akses penuh.'}
              {authMode === 'activation' && `Kami telah mengirimkan 6 digit OTP ke ${formData.email || 'email Anda'}.`}
            </p>
          </div>

          {/* Alert Error / Success dari Server */}
          {errorMessage && (
            <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 text-red-500 p-4 rounded-xl text-sm animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{errorMessage}</p>
            </div>
          )}

          {successMessage && (
            <div className="flex items-start gap-3 bg-green-500/10 border border-green-500/30 text-green-500 p-4 rounded-xl text-sm animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{successMessage}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {authMode === 'register' && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-mutedDark" />
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Nama Lengkap" 
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-card-dark border border-white/10 rounded-xl text-sm text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                />
              </div>
            )}

            {/* INPUT EMAIL */}
            {authMode !== 'activation' && (
              <div className="space-y-1">
                <div className="relative">
                  <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${fieldErrors.email ? 'text-red-500' : 'text-text-mutedDark'}`} />
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nama@email.com" 
                    required
                    // Ubah border menjadi merah jika ada error
                    className={`w-full pl-12 pr-4 py-3.5 bg-card-dark border rounded-xl text-sm text-white outline-none transition-all ${
                      fieldErrors.email 
                      ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/50' 
                      : 'border-white/10 focus:border-primary focus:ring-1 focus:ring-primary/50'
                    }`}
                  />
                </div>
                {/* Teks Error Email Mengambang */}
                {fieldErrors.email && (
                  <p className="text-red-500 text-xs pl-2 animate-in slide-in-from-top-1">{fieldErrors.email}</p>
                )}
              </div>
            )}

            {/* INPUT PASSWORD */}
            {authMode !== 'activation' && (
              <div className="space-y-1">
                <div className="relative group">
                  <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${fieldErrors.password ? 'text-red-500' : 'text-text-mutedDark'}`} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Kata Sandi" 
                    required
                    className={`w-full pl-12 pr-12 py-3.5 bg-card-dark border rounded-xl text-sm text-white outline-none transition-all ${
                      fieldErrors.password 
                      ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/50' 
                      : 'border-white/10 focus:border-primary focus:ring-1 focus:ring-primary/50'
                    }`}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-mutedDark hover:text-white transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                
                {/* Teks Error / Instruksi Password */}
                {fieldErrors.password ? (
                  <p className="text-red-500 text-xs pl-2 animate-in slide-in-from-top-1">{fieldErrors.password}</p>
                ) : (
                  authMode === 'register' && (
                    <div className="flex items-center gap-1.5 text-text-mutedDark pl-2 mt-1">
                      <Info size={13} className="text-primary shrink-0" />
                      <span className="text-[11px] leading-none">
                        Minimal 8 karakter (Wajib ada huruf BESAR, kecil, dan angka).
                      </span>
                    </div>
                  )
                )}
              </div>
            )}

            {/* INPUT KONFIRMASI PASSWORD */}
            {authMode === 'register' && (
              <div className="space-y-1">
                <div className="relative group">
                  <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${fieldErrors.confirmPassword ? 'text-red-500' : 'text-text-mutedDark'}`} />
                  <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Konfirmasi Kata Sandi" 
                    required
                    className={`w-full pl-12 pr-12 py-3.5 bg-card-dark border rounded-xl text-sm text-white outline-none transition-all ${
                      fieldErrors.confirmPassword 
                      ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/50' 
                      : 'border-white/10 focus:border-primary focus:ring-1 focus:ring-primary/50'
                    }`}
                  />
                   <button 
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-mutedDark hover:text-white transition-colors cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {/* Teks Error Confirm Password */}
                {fieldErrors.confirmPassword && (
                  <p className="text-red-500 text-xs pl-2 animate-in slide-in-from-top-1">{fieldErrors.confirmPassword}</p>
                )}
              </div>
            )}

            {authMode === 'activation' && (
              <div className="flex justify-between gap-2 mb-6">
                {otpArray.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={data}
                    onChange={(e) => handleOtpChange(e.target, index)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    onFocus={(e) => e.target.select()}
                    className="w-12 h-14 bg-card-dark border border-white/10 rounded-xl text-center text-xl font-bold text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
                  />
                ))}
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Memproses...
                </>
              ) : (
                authMode === 'login' ? 'Masuk ke Dashboard' : 
                authMode === 'register' ? 'Buat Akun Sekarang' : 'Verifikasi OTP'
              )}
            </button>
          </form>

          {authMode !== 'activation' && (
            <p className="text-center text-sm text-text-mutedDark mt-6">
              {authMode === 'login' ? "Belum punya akun? " : "Sudah memiliki akun? "}
              <span 
                onClick={() => switchMode(authMode === 'login' ? 'register' : 'login')}
                className="text-primary font-semibold cursor-pointer hover:underline"
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