import { AppUser, AppUserForm } from '../constants';
import {
  getDocument,
  updateDocument,
  createDocument,
  onDocumentSnapshot,
} from './firestore';

const USERS_COLLECTION = 'users';

export async function getUser(userId: string): Promise<AppUser> {
  return getDocument<AppUser>(USERS_COLLECTION, userId);
}

export async function createUser(
  user: AppUserForm,
  id: string
): Promise<AppUser> {
  const newUser = { id, ...user };

  await createDocument<AppUser>(USERS_COLLECTION, id, newUser);

  return newUser;
}

export async function updateUser(
  userId: string,
  userUpdates: Partial<AppUser>
): Promise<void> {
  return updateDocument<AppUser>(USERS_COLLECTION, userId, userUpdates);
}

export function watchUser(userId: string, onChange: (data: AppUser) => any) {
  return onDocumentSnapshot<AppUser>(USERS_COLLECTION, userId, onChange);
}
