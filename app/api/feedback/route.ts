import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
const clean = (value: unknown, max = 2000) => String(value || '').trim().slice(0, max);
export async function POST(request: Request) {
  const body = await request.json(); const type = body.type === 'review' ? 'Customer review' : 'Contact message'; const name = clean(body.name, 120); const email = clean(body.email, 160); const phone = clean(body.phone, 50); const message = clean(body.message, 4000);
  if (!name || !message || (type === 'Contact message' && !email)) return NextResponse.json({ error: 'Please complete the required fields.' }, { status: 400 });
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) return NextResponse.json({ error: 'Email service is not configured yet. Add SMTP settings to the environment.' }, { status: 503 });
  const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT) || 465, secure: process.env.SMTP_SECURE !== 'false', auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } });
  const text = [type, '', `Name: ${name}`, email ? `Email: ${email}` : '', phone ? `Phone: ${phone}` : '', '', 'Message:', message].filter(Boolean).join('\n');
  try { await transporter.sendMail({ from: `Website forms <${process.env.SMTP_USER}>`, to: process.env.MAIL_TO || 'gsamraj178@gmail.com', replyTo: email || undefined, subject: `${type} | Gupta Variety Store`, text }); return NextResponse.json({ message: 'Thank you. Your message has been sent successfully.' }); } catch (error) { console.error('Email delivery failed:', error); return NextResponse.json({ error: 'The message could not be delivered right now. Please call the shop directly.' }, { status: 502 }); }
}
