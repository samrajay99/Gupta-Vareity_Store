'use client';

import { useEffect, useState, type FormEvent } from 'react';
import GsapReveal from './GsapReveal';

type Review = { id: string; name: string; message: string; createdAt: string; images: string[] };

export default function ReviewWall() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  async function loadReviews() {
    const response = await fetch('/api/reviews', { cache: 'no-store' });
    if (response.ok) setReviews(await response.json());
  }

  useEffect(() => { loadReviews().catch(() => setStatus('Reviews are temporarily unavailable.')); }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSending(true);
    setStatus('Uploading your review...');
    try {
      const response = await fetch('/api/reviews', { method: 'POST', body: new FormData(form) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Could not publish the review.');
      form.reset();
      setStatus('Thank you. Your review and pictures are now saved.');
      await loadReviews();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not publish the review.');
    } finally { setSending(false); }
  }

  return <div className="mt-8 grid gap-8 bg-mint/50 p-6 dark:bg-[#14241f]/90 md:grid-cols-[.8fr_1.2fr] md:p-10">
    <div><span className="eyebrow">Share your experience</span><h3 className="mt-4 text-2xl font-extrabold">Leave a review with pictures</h3><p className="mt-2 text-slate-600 dark:text-[#adbfba]">Your review and uploaded photos stay saved until the store owner removes them.</p><form className="mt-6 grid gap-3" onSubmit={submit}><input className="field" name="name" placeholder="Your name" required /><textarea className="field min-h-28 resize-y" name="message" placeholder="Write your review" required /><label className="cursor-pointer rounded-xl border border-dashed border-leaf/30 bg-white/70 p-4 text-sm font-bold text-leaf dark:bg-[#1a2d28] dark:text-[#8fe9c3]"><span className="block">📷 Add pictures</span><span className="mt-1 block text-xs font-normal text-slate-500 dark:text-[#adbfba]">Up to 3 images, 5MB each. JPG, PNG, WEBP, or GIF.</span><input className="mt-3 block w-full text-xs" name="images" type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple /></label><button className="btn-primary w-fit" type="submit" disabled={sending}>{sending ? 'Uploading...' : 'Publish Review'}</button><p className="text-sm font-bold text-leaf dark:text-[#8fe9c3]" role="status" aria-live="polite">{status}</p></form></div>
    <div className="grid content-start gap-4">{reviews.length === 0 && <div className="rounded-2xl border border-leaf/10 bg-white/70 p-6 text-sm text-slate-500 dark:bg-[#1a2d28]">Be the first customer to share a review.</div>}{reviews.map((review, index) => <GsapReveal key={review.id} delay={index * .05}><article className="rounded-2xl border border-leaf/10 bg-white p-5 shadow-sm dark:bg-[#1a2d28]"><div className="flex items-start justify-between gap-4"><div><h4 className="font-extrabold">{review.name}</h4><time className="text-xs text-slate-500 dark:text-[#adbfba]" dateTime={review.createdAt}>{new Date(review.createdAt).toLocaleDateString()}</time></div><span className="text-gold">★★★★★</span></div><p className="mt-3 text-slate-600 dark:text-[#adbfba]">{review.message}</p>{review.images.length > 0 && <div className="mt-4 grid grid-cols-3 gap-2">{review.images.map((image) => <img className="h-24 w-full rounded-xl object-cover" key={image} src={image} alt={`Picture uploaded by ${review.name}`} />)}</div>}</article></GsapReveal>)}</div>
  </div>;
}
