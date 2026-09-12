'use client';

import { useState } from 'react';
import GsapReveal from './GsapReveal';

type Product = { category: string; title: string; image: string; alt: string };
const products: Product[] = [
  { category: 'snacks', title: 'Chips & Wafers', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80', alt: 'Crispy chips and wafers' },
  { category: 'snacks', title: 'Muri & Namkeen', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80', alt: 'Muri and namkeen' },
  { category: 'groceries', title: 'Atta, Rice & Dal', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80', alt: 'Rice and grains' },
  { category: 'groceries', title: 'Oil & Spices', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80', alt: 'Cooking oils and spices' },
  { category: 'beverages', title: 'Tea, Coffee & Drinks', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80', alt: 'Tea and coffee' },
  { category: 'household', title: 'Home Care', image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80', alt: 'Cleaning supplies' },
  { category: 'personal', title: 'Personal Care', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80', alt: 'Personal care products' },
  { category: 'snacks', title: 'Noodles & Sauces', image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80', alt: 'Noodles and instant foods' }
];
const categories = [['all', 'All'], ['snacks', 'Snacks'], ['groceries', 'Groceries'], ['beverages', 'Beverages'], ['household', 'Household'], ['personal', 'Personal Care']];
export default function ProductGallery() { const [filter, setFilter] = useState('all'); const visible = filter === 'all' ? products : products.filter((item) => item.category === filter); return <><div className="mb-7 flex flex-wrap justify-center gap-3">{categories.map(([value, label]) => <button key={value} className={`rounded-full border px-4 py-2.5 text-sm font-bold transition hover:-translate-y-1 ${filter === value ? 'border-transparent bg-gradient-to-br from-leaf to-forest text-white shadow-soft' : 'border-leaf/10 bg-white text-ink dark:bg-[#14241f] dark:text-[#edf8f3]'}`} onClick={() => setFilter(value)}>{label}</button>)}</div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{visible.map((product, index) => <GsapReveal key={product.title} delay={index * .05}><article className="surface group overflow-hidden"><div className="h-48 overflow-hidden"><img className="h-full w-full object-cover transition duration-700 group-hover:scale-110" src={product.image} alt={product.alt} /></div><div className="p-5"><h3 className="text-lg font-extrabold">{product.title}</h3><div className="mt-3 flex flex-wrap gap-2"><span className="rounded-lg border border-gold/20 bg-gold/10 px-2 py-1 text-xs font-bold text-[#7a5600]">Fresh</span><span className="rounded-lg border border-gold/20 bg-gold/10 px-2 py-1 text-xs font-bold text-[#7a5600]">Daily Need</span></div></div></article></GsapReveal>)}</div></>; }
