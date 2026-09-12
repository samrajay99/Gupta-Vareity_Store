import { randomUUID } from 'node:crypto';
import { mkdir, readFile, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
const dataDirectory = path.join(process.cwd(), 'data');
const imageDirectory = path.join(dataDirectory, 'reviews', 'images');
const reviewFile = path.join(dataDirectory, 'reviews.json');
const allowedTypes = new Map([['image/jpeg', '.jpg'], ['image/png', '.png'], ['image/webp', '.webp'], ['image/gif', '.gif']]);
const maxImageSize = 5 * 1024 * 1024;

type StoredReview = { id: string; name: string; message: string; createdAt: string; images: string[]; files: string[] };

async function getReviews(): Promise<StoredReview[]> {
  try { return JSON.parse(await readFile(reviewFile, 'utf8')) as StoredReview[]; } catch { return []; }
}
async function saveReviews(reviews: StoredReview[]) { await mkdir(dataDirectory, { recursive: true }); await writeFile(reviewFile, JSON.stringify(reviews, null, 2), 'utf8'); }

export async function GET() {
  const reviews = await getReviews();
  return NextResponse.json(reviews.map(({ files: _files, ...review }) => review));
}

export async function POST(request: Request) {
  const form = await request.formData();
  const name = String(form.get('name') || '').trim().slice(0, 120);
  const message = String(form.get('message') || '').trim().slice(0, 4000);
  const files = form.getAll('images').filter((value): value is File => value instanceof File && value.size > 0);
  if (!name || !message) return NextResponse.json({ error: 'Please add your name and review.' }, { status: 400 });
  if (files.length > 3) return NextResponse.json({ error: 'Please upload no more than 3 pictures.' }, { status: 400 });
  if (files.some((file) => file.size > maxImageSize || !allowedTypes.has(file.type))) return NextResponse.json({ error: 'Each picture must be JPG, PNG, WEBP, or GIF and no larger than 5MB.' }, { status: 400 });

  const id = randomUUID(); const storedFiles: string[] = []; const imageUrls: string[] = [];
  await mkdir(imageDirectory, { recursive: true });
  for (const file of files) { const filename = `${id}-${randomUUID()}${allowedTypes.get(file.type)}`; await writeFile(path.join(imageDirectory, filename), Buffer.from(await file.arrayBuffer())); storedFiles.push(filename); imageUrls.push(`/api/reviews/image/${filename}`); }
  const review: StoredReview = { id, name, message, createdAt: new Date().toISOString(), images: imageUrls, files: storedFiles };
  const reviews = await getReviews(); reviews.unshift(review); await saveReviews(reviews);
  return NextResponse.json({ ...review, files: undefined }, { status: 201 });
}

export async function DELETE(request: Request) {
  const token = request.headers.get('x-admin-token');
  if (!process.env.ADMIN_DELETE_TOKEN || token !== process.env.ADMIN_DELETE_TOKEN) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  const id = new URL(request.url).searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Review id is required.' }, { status: 400 });
  const reviews = await getReviews(); const review = reviews.find((item) => item.id === id);
  if (!review) return NextResponse.json({ error: 'Review not found.' }, { status: 404 });
  await Promise.all(review.files.map((file) => unlink(path.join(imageDirectory, file)).catch(() => undefined)));
  await saveReviews(reviews.filter((item) => item.id !== id));
  return NextResponse.json({ message: 'Review deleted.' });
}
