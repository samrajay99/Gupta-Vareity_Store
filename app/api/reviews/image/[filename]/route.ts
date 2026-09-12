import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
const types: Record<string, string> = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', gif: 'image/gif' };
export async function GET(_request: Request, context: { params: Promise<{ filename: string }> }) {
  const { filename } = await context.params;
  if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) return new NextResponse('Not found', { status: 404 });
  try { const file = await readFile(path.join(process.cwd(), 'data', 'reviews', 'images', filename)); const extension = filename.split('.').pop()?.toLowerCase() || ''; return new NextResponse(file, { headers: { 'Content-Type': types[extension] || 'application/octet-stream', 'Cache-Control': 'public, max-age=31536000, immutable' } }); } catch { return new NextResponse('Not found', { status: 404 }); }
}
