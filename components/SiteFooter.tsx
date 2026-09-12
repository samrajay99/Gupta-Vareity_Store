import Image from 'next/image';
import Link from 'next/link';

export default function SiteFooter() {
  return <footer className="border-t-4 border-gold bg-forest py-14 pb-24 text-[#d6e7e2]"><div className="container-page flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left"><div className="flex flex-col items-center gap-3 md:flex-row"><Image className="h-12 w-12 rounded-2xl border-2 border-gold object-cover" src="/shop.jpg" alt="Gupta Variety Store logo" width={48} height={48} /><div><strong className="text-white">Gupta Variety Store</strong><br /><span className="text-sm">77 Basak Bagan, Patipukur, Kolkata-700048</span><br /><small className="text-[#b9d0c9]">More than 35 years of trust • Gupta Ji Bhujiya Wala</small></div></div><div className="flex flex-wrap justify-center gap-4 text-sm font-semibold"><Link href="/">Home</Link><Link href="/about">About</Link><Link href="/products">Products</Link><Link href="/#reviews">Reviews</Link><Link href="/#contact">Contact</Link><Link href="/privacy">Privacy Policy</Link></div></div></footer>;
}
