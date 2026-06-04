import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  PieChart,
  Target,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import logo from '../assets/logo.svg';

// Scroll-reveal variants 

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 },
  }),
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: (i = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 },
  }),
};

// Spring configs 

const cardSpring = { type: 'spring', stiffness: 260, damping: 22, mass: 0.8 };
const iconSpring = { type: 'spring', stiffness: 220, damping: 18, mass: 0.6 };
const buttonSpring = { type: 'spring', stiffness: 300, damping: 24, mass: 0.7 };

// Blob bergerak dominan horizontal (kiri kanan) + sedikit drift vertikal.
// repeatType:'mirror' -> balik arah tanpa jump, seamless & smooth.

// Palet color
//   #1680FF  primary blue
//   #10B981  emerald accent
//   #06B6D4  cyan    →  biru-hijau
//   #6366F1  indigo  → memperdalam biru
//   #34D399  emerald 400 → variansi terang

const BLOBS = [
  { color: '#1680FF', xs: ['8%', '78%', '8%'], ys: ['18%', '28%', '18%'], dur: 22, delay: 0, size: 680 },
  { color: '#10B981', xs: ['72%', '12%', '72%'], ys: ['55%', '42%', '55%'], dur: 26, delay: -9, size: 620 },
  { color: '#06B6D4', xs: ['40%', '85%', '5%'], ys: ['70%', '15%', '70%'], dur: 30, delay: -16, size: 520 },
  { color: '#6366F1', xs: ['15%', '65%', '15%'], ys: ['80%', '60%', '80%'], dur: 20, delay: -5, size: 480 },
  { color: '#34D399', xs: ['80%', '20%', '80%'], ys: ['10%', '35%', '10%'], dur: 28, delay: -12, size: 540 },
  { color: '#1680FF', xs: ['50%', '5%', '50%'], ys: ['45%', '80%', '45%'], dur: 24, delay: -20, size: 400 },
];

// Blob only in <section> Hero
const HeroBlobs = () => (
  <div
    aria-hidden="true"
    style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      filter: 'blur(90px) saturate(1.2)',
      zIndex: 0,
    }}
  >
    {BLOBS.map((b, i) => (
      <motion.div
        key={i}
        style={{
          position: 'absolute',
          width: b.size,
          height: b.size,
          borderRadius: '50%',
          background: b.color,
          opacity: 0.09,
          mixBlendMode: 'multiply',
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'left, top',
        }}
        animate={{ left: b.xs, top: b.ys }}
        transition={{
          duration: b.dur,
          delay: b.delay,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatType: 'mirror',
        }}
      />
    ))}
  </div>
);

// Main Component 
const LandingPage = () => {
  const navigate = useNavigate();

  const problemRef = useRef(null);
  const problemInView = useInView(problemRef, { once: true, amount: 0.12 });
  const featuresRef = useRef(null);
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.12 });
  const footerRef = useRef(null);
  const footerInView = useInView(footerRef, { once: true, amount: 0.5 });

  return (
    <div className="bg-base-light text-text-mainLight font-sans selection:bg-primary selection:text-white overflow-x-hidden">

      {/* NAVBAR glass effect */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: 'rgba(248, 250, 252, 0.50)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          borderBottom: '1px solid rgba(226, 232, 240, 0.5)',
          boxShadow: '0 1px 32px rgba(22,128,255,0.07), 0 0.5px 0 rgba(255,255,255,0.8) inset',
        }}
        className="px-5 py-4 md:px-10 flex justify-between items-center fixed top-0 w-full z-50"
      >
        <img
          src={logo}
          alt="FinSmart Logo"
          className="h-6 object-contain cursor-pointer hover:opacity-75 transition-opacity duration-300"
          onClick={() => navigate('/')}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={buttonSpring}
          onClick={() => navigate('/auth')}
          className="text-[10px] md:text-xs font-bold uppercase tracking-widest border border-border-light px-4 py-2 md:px-5 rounded-lg hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors duration-300 cursor-pointer text-text-mainLight"
        >
          Masuk
        </motion.button>
      </motion.nav>

      {/*  HERO - blob animasi  */}
      <section className="min-h-screen flex items-center justify-center px-5 md:px-6 relative overflow-hidden bg-white">
        <HeroBlobs />

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '120px',
            background: 'linear-gradient(to bottom, transparent, #F8FAFC)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center z-10 pt-20 pb-10">
          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="text-[2.6rem] leading-[1.1] sm:text-5xl lg:text-7xl font-black tracking-tight mb-5 text-text-mainLight"
          >
            Kelola Keuangan
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-[#00c853] to-accent-light animate-gradient">
              Lebih Cerdas dengan AI
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="text-base md:text-lg text-text-mutedLight leading-relaxed max-w-xl mx-auto font-medium mb-10 px-2"
          >
            Bantu kamu memahami cashflow, menabung lebih efektif, dan membuat keputusan finansial lebih baik berdasarkan data.
          </motion.p>

          <motion.button
            variants={fadeUp} initial="hidden" animate="visible" custom={2}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={buttonSpring}
            onClick={() => navigate('/auth')}
            className="group w-full sm:w-auto min-w-55 bg-primary text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 transition-shadow duration-300 flex items-center justify-center gap-2 uppercase tracking-widest text-xs cursor-pointer"
          >
            Mulai Sekarang
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>
        </div>
      </section>

      {/* PROBLEM HIGHLIGHT */}
      <section
        ref={problemRef}
        className="min-h-screen flex items-center px-5 md:px-6 bg-card-light border-y border-border-light relative py-20 md:py-24"
      >
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* Teks kiri */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={problemInView ? 'visible' : 'hidden'}
            className="space-y-5 md:space-y-7 text-center lg:text-left"
          >
            <motion.div variants={fadeIn} custom={0} className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="w-8 h-px bg-danger-light" />
              <h3 className="text-[10px] font-black text-danger-light uppercase tracking-widest">Realita Saat Ini</h3>
            </motion.div>

            <motion.h2 variants={fadeUp} custom={1}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] font-black tracking-tight text-text-mainLight"
            >
              Merasa gaji sekadar{' '}
              <br className="hidden sm:block" />
              numpang lewat,{' '}
              <br className="hidden sm:block" />
              <span className="text-danger-light">tanpa sisa?</span>
            </motion.h2>

            <motion.p variants={fadeUp} custom={2}
              className="text-base md:text-lg text-text-mutedLight leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              Literasi keuangan generasi muda masih di bawah <strong>50%</strong>. Kita jago mencari uang, tapi sering kebingungan dan terjebak dalam <em>lifestyle inflation</em> yang tak berujung.
            </motion.p>
          </motion.div>

          {/* Bento cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
            {[
              { num: '01', title: 'Lifestyle Inflation', desc: 'Pengeluaran terus membengkak seiring bertambahnya pendapatan tanpa disadari.', className: '' },
              { num: '02', title: 'Blind Spot Kas', desc: 'Malas mencatat manual membuat kita tidak tahu persis ke mana porsi uang terbesar lari.', className: 'sm:mt-8' },
              { num: '03', title: 'Ragu Berinvestasi', desc: 'Kondisi tabungan yang tidak stabil dan absennya target membuat kita selalu menunda untuk menyiapkan dana masa depan.', className: 'sm:col-span-2' },
            ].map((item, i) => (
              <motion.div
                key={item.num}
                variants={scaleIn} initial="hidden" animate={problemInView ? 'visible' : 'hidden'} custom={i + 1}
                whileHover={{ y: -5, scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                transition={cardSpring}
                className={`p-6 md:p-8 bg-base-light border border-border-light rounded-3xl hover:border-danger-light/40 hover:shadow-md transition-shadow transition-colors duration-300 ${item.className}`}
              >
                <div className="w-10 h-10 rounded-xl bg-danger-light/10 flex items-center justify-center mb-4 text-danger-light font-black text-xl">
                  {item.num}
                </div>
                <h4 className="font-bold text-lg mb-2 text-text-mainLight">{item.title}</h4>
                <p className="text-sm text-text-mutedLight leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section ref={featuresRef} className="min-h-screen flex items-center px-5 md:px-6 py-20 md:py-24 bg-base-light">
        <div className="max-w-6xl mx-auto w-full space-y-10 md:space-y-12">

          <motion.div
            variants={fadeUp} initial="hidden" animate={featuresInView ? 'visible' : 'hidden'}
            className="text-center md:text-left"
          >
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-text-mainLight">
              Fitur Cerdas
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-stretch">
            {[
              {
                custom: 1, span: 'md:col-span-2',
                icon: <PieChart className="w-7 h-7 text-primary shrink-0" />,
                title: 'Kategorisasi AI',
                desc: 'Model Machine Learning kami secara otomatis mengklasifikasikan setiap transaksimu. Pahami kebiasaan belanjamu tanpa perlu mencatat manual satu per satu.',
              },
              {
                custom: 2, span: '',
                icon: <Target className="w-7 h-7 text-primary shrink-0" />,
                title: 'Anggaran Pintar',
                desc: 'Atur batas pengeluaran bulananmu. Sistem otomatis memberi peringatan dini sebelum kamu overbudget.',
              },
              {
                custom: 3, span: 'md:col-span-3',
                icon: <TrendingUp className="w-7 h-7 text-primary shrink-0" />,
                title: 'Investment Readiness',
                desc: 'Sistem akan mengevaluasi otomatis Basic Liquidity Ratio & Savings Ratio kamu setiap bulan untuk memberikan insight apakah kondisi kas kamu sudah siap untuk berinvestasi.',
              },
            ].map((card) => (
              <motion.div
                key={card.title}
                variants={scaleIn} initial="hidden" animate={featuresInView ? 'visible' : 'hidden'} custom={card.custom}
                whileHover={{ y: -5, scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                transition={cardSpring}
                className={`${card.span} p-7 md:p-10 bg-card-light border border-border-light rounded-3xl flex flex-col justify-center space-y-4 hover:border-primary/35 hover:shadow-md transition-shadow transition-colors duration-300`}
              >
                <div className="flex items-center gap-3">
                  <motion.div whileHover={{ rotate: 18, scale: 1.15 }} transition={iconSpring}>
                    {card.icon}
                  </motion.div>
                  <h4 className="font-bold text-lg md:text-xl lg:text-2xl text-text-mainLight">{card.title}</h4>
                </div>
                <p className="text-sm md:text-base text-text-mutedLight leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* FOOTER */}
      <motion.footer
        ref={footerRef}
        variants={fadeIn} initial="hidden" animate={footerInView ? 'visible' : 'hidden'}
        className="px-5 md:px-10 py-10 bg-card-light border-t border-border-light"
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="text-center md:text-left flex flex-col items-center md:items-start space-y-2">
            <img
              src={logo}
              alt="FinSmart Logo"
              className="h-5 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer"
            />
            <p className="text-[10px] text-text-mutedLight font-medium tracking-widest uppercase">
              &copy; 2026 FinSmart Project.
            </p>
          </div>
          <div className="text-center md:text-right space-y-1">
            <p className="text-[9px] uppercase tracking-widest text-text-mutedLight font-black">Powered By</p>
            <p className="text-xs font-bold tracking-tight text-text-mainLight">DBS Foundation | Coding Camp 2026</p>
          </div>
        </div>
      </motion.footer>

      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50%       { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient-shift 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;