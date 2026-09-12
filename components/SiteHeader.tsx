'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SiteHeader() {
  const [dark, setDark] = useState(false);
  useEffect(() => { const saved = window.localStorage.getItem('gupta-theme') === 'dark'; setDark(saved); document.documentElement.classList.toggle('dark-mode', saved); document.documentElement.classList.toggle('dark', saved); }, []);
  function toggleTheme() { const next = !dark; setDark(next); document.documentElement.classList.toggle('dark-mode', next); document.documentElement.classList.toggle('dark', next); window.localStorage.setItem('gupta-theme', next ? 'dark' : 'light'); }
  return <header className="sticky top-0 z-40 border-b border-leaf/10 bg-white/75 backdrop-blur-xl dark:bg-[#0e1715]/80"><div className="container-page flex min-h-[76px] items-center justify-between gap-4"><Link className="flex items-center gap-3" href="/" aria-label="Gupta Variety Store home"><Image className="h-12 w-12 rounded-2xl border-2 border-gold object-cover shadow-soft" src="/shop.jpg" alt="Gupta Variety Store logo" width={48} height={48} priority /><span className="flex flex-col leading-tight"><span className="text-base font-extrabold text-leaf dark:text-[#8fe9c3]">Gupta Variety Store</span><span className="text-[.7rem] font-bold text-slate-500 dark:text-[#adbfba]">Gupta Ji Bhujiya Wala</span></span></Link><nav className="hidden items-center gap-5 text-sm font-bold text-slate-600 lg:flex dark:text-[#adbfba]" aria-label="Main navigation"><Link className="transition hover:text-leaf" href="/">Home</Link><Link className="transition hover:text-leaf" href="/about">About</Link><Link className="transition hover:text-leaf" href="/products">Products</Link><Link className="transition hover:text-leaf" href="/#reviews">Reviews</Link><Link className="transition hover:text-leaf" href="/#gallery">Gallery</Link><Link className="transition hover:text-leaf" href="/#contact">Contact</Link></nav><div className="flex items-center gap-2"><button className="h-11 w-11 rounded-xl border border-leaf/10 bg-white text-lg shadow-sm transition hover:-translate-y-1 dark:bg-[#14241f]" onClick={toggleTheme} aria-label="Toggle dark mode">{dark ? '☀️' : '🌙'}</button><a className="btn-primary hidden sm:inline-flex" href="tel:9007182511">📞 Call Now</a></div></div></header>;
}
