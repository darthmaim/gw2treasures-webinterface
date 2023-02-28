import { notFound, redirect } from 'next/navigation';
import { db } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const count = await db.item.count();

  const item = await db.item.findFirst({ take: 1, skip: Math.floor(Math.random() * count), select: { id: true }});

  if(!item) {
    notFound();
  }

  redirect(`/item/${item.id}`);
}
