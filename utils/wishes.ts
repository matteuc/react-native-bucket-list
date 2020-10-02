import {
  Wish,
  WishForm,
  WISHES_COLLECTION,
  USERS_COLLECTION,
} from '../constants';
import {
  updateDocument,
  createDocument,
  onCollectionSnapshot,
  getDocumentID,
} from './firestore';

const generateUserWishesPath = (userId: string) =>
  `${USERS_COLLECTION}/${userId}/${WISHES_COLLECTION}`;

export async function createWish(
  wish: WishForm,
  userId: string
): Promise<Wish> {
  const id = getDocumentID(WISHES_COLLECTION);

  const newWish = {
    ...wish,
    id,
    createdAt: Date.now(),
    completedAt: Date.now(),
    completed: false,
  };

  await createDocument<Wish>(generateUserWishesPath(userId), id, newWish);

  return newWish;
}

export async function updateWish(
  wishId: string,
  userId: string,
  wishUpdates: Partial<Wish>
): Promise<void> {
  return updateDocument<Wish>(
    generateUserWishesPath(userId),
    wishId,
    wishUpdates
  );
}

export function watchWishes(
  userId: string,
  onChange: (data: Array<Wish>) => any
) {
  return onCollectionSnapshot<Wish>(generateUserWishesPath(userId), onChange);
}
