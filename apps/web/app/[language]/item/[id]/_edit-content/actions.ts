'use server';

import { getUser } from '@/lib/getUser';
import { AddedItem } from './types';
import { db } from '@/lib/prisma';

// eslint-disable-next-line require-await
export async function submitToReview({ itemId, removedItems, addedItems }: { itemId: number, removedItems: number[], addedItems: AddedItem[] }) {
  if(removedItems.length === 0 && addedItems.length === 0) {
    console.log('No changes');
    return false;
  }

  const user = await getUser();

  if(!user) {
    console.log('Not logged in');
    return false;
  }

  const pendingReviews = await db.review.count({
    where: { queue: 'ContainerContent', relatedItemId: itemId }
  });

  if(pendingReviews > 0) {
    console.log('Pending reviews');
    return false;
  }

  await db.review.create({
    data: {
      changes: { removedItems, addedItems } as any,
      queue: 'ContainerContent',
      requesterId: user.id,
      relatedItemId: itemId,
    }
  });
}
