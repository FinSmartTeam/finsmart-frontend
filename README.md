### **AI-Powered Personal Finance for the Next Generation**

<br />

[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active_Development-orange?style=flat-square)]()

<br />

> **Capstone Project** · ID Tim: `CC26-PSU407` · Coding Camp 2026 × DBS Foundation

<br />

</div>

---

## Tentang Proyek

**FinSmart** adalah aplikasi manajemen keuangan pribadi berbasis AI yang dirancang khusus untuk menjawab tantangan rendahnya literasi finansial di kalangan generasi muda Indonesia.

Repositori ini adalah **Frontend** dari ekosistem FinSmart — antarmuka yang menjadi titik sentuh utama pengguna dengan sistem.

### Apa yang bisa dilakukan FinSmart?

| Fitur | Deskripsi |
|---|---|
| **Pelacakan Arus Kas** | Catat dan pantau pemasukan & pengeluaran harian secara real-time |
| **Alokasi Anggaran** | Susun rencana anggaran bulanan dengan panduan alokasi cerdas |
| **AI Financial Insight** | Dapatkan analisis dan saran keuangan personal berbasis AI |
| **Visualisasi Data** | Grafik interaktif untuk memahami pola keuangan kamu |
| **Ekspor Laporan** | Unduh ringkasan keuangan dalam format PDF |

---

## Tech Stack

```
Frontend Layer
├── Framework      → React.js 19 (via Vite 6)
├── Styling        → Tailwind CSS 4
├── Animasi        → Framer Motion
├── Visualisasi    → Recharts
├── HTTP Client    → Axios
└── Ekspor PDF     → jsPDF + jsPDF-AutoTable
```

---

## Prerequisites

Pastikan tools berikut sudah terinstal sebelum memulai:

- **Node.js** `v18.x` atau lebih baru → [Download](https://nodejs.org/)
- **npm** `v9+` atau **yarn** `v1.22+`
- **Git** → [Download](https://git-scm.com/)

Cek versi yang terpasang:

```bash
node --version
npm --version
git --version
```

---

## Quick Start

### 1. Clone Repositori

```bash
git clone https://github.com/FinSmartTeam/finsmart-frontend.git
cd finsmart-frontend
```

### 2. Install Dependensi

```bash
npm install
```

### 3. Konfigurasi Environment

Buat file `.env` di root proyek (sejajar dengan `package.json`):

```bash
cp .env.example .env
```

Atau buat manual, lalu isi dengan konfigurasi berikut:

```env
# Base URL untuk koneksi ke API Backend
# Hubungi tim Backend untuk mendapatkan URL yang valid
VITE_API_BASE_URL="https://api.your-backend-url.com/api"
```

> **Penting:** Jangan pernah commit file `.env` ke repositori. File ini sudah terdaftar di `.gitignore`.

### 4. Jalankan Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di:

```
http://localhost:5173
```

---

## Daftar Script

| Script | Perintah | Keterangan |
|---|---|---|
| Development | `npm run dev` | Jalankan local dev server dengan HMR |
| Build | `npm run build` | Kompilasi untuk production |
| Preview | `npm run preview` | Preview hasil build production |
| Lint | `npm run lint` | Cek kualitas kode dengan ESLint |

---

## Ekosistem FinSmart

FinSmart terdiri dari tiga repositori terpisah:

| Repositori | Deskripsi | Tim |
|---|---|---|
| **finsmart-frontend** ← *(kamu di sini)* | UI React | Frontend Team |
| **finsmart-backend** | REST API & Database | Backend Team |
| **finsmart-model** | Model AI & Pipeline | AI/ML Team |

---

## Tim Pengembang — CC26-PSU407

| Nama | Peran |
|---|---|
| Zahwa Putri Vanisa | Data Scientist |
| A. Rafly Sahrul Ramadhany Mifthah | Full-Stack Web Developer |
| Ahmad Anta Wirangga | Full-Stack Web Developer |
| Fahira Zahra Fitria Rahma | Data Scientist |
| Muhammad Syaiful | AI Engineer |

---

<div align="center">

**FinSmart** · CC26-PSU407 · Coding Camp 2026 × DBS Foundation

*"Kelola keuanganmu hari ini, raih kebebasanmu esok hari."*

</div>
