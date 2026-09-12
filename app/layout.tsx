import type { Metadata } from 'next';
import './globals.css';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

export const metadata: Metadata = { title: 'Gupta Variety Store | Trusted Grocery & Bhujia Shop in Patipukur', description: 'Gupta Variety Store in Basak Bagan, Patipukur, Kolkata. Trusted locally since 1990 for bhujia, namkeen, groceries, snacks, and daily essentials.', keywords: ['Gupta Variety Store', 'Gupta Ji Bhujiya Wala', 'Basak Bagan', 'Patipukur'], icons: { icon: '/shop.jpg', shortcut: '/shop.jpg' } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><div className="bg-forest px-4 py-2.5 text-center text-xs font-bold tracking-wide text-[#eafff5]">📍 Since 1990 • More than 35 years of local trust • Basak Bagan, Patipukur</div><SiteHeader />{children}<SiteFooter /><div className="fixed bottom-0 left-0 right-0 z-30 block border-t border-leaf/10 bg-white/90 p-3 backdrop-blur-xl dark:bg-[#0e1715]/90 md:hidden"><div className="flex gap-2"><a href="tel:9007182511" className="btn-primary flex-1">📞 Call</a><a href="https://wa.me/919007182511?text=Hello%20Gupta%20Variety%20Store%2C%20I%20want%20to%20order%20groceries." className="btn-secondary flex-1">💬 WhatsApp</a></div></div></body></html>; }
