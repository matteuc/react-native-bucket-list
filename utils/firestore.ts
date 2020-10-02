import { LogBox } from 'react-native';
import { db } from '../firebase';

LogBox.ignoreLogs([
  'Setting a timer', // Suppress Firebase onSnapshot errors
]);

export function onCollectionSnapshot<T>(
  path: string,
  onChange: (data: Array<T>) => any
): firebase.Unsubscribe {
  return db.collection(path).onSnapshot((collectionSnap) => {
    const items: Array<T> = [];

    if (!collectionSnap.empty) {
      collectionSnap.docs.forEach((docSnap) => {
        if (docSnap.exists) {
          // TODO - No runtime type validation
          items.push(docSnap.data() as T);
        }
      });
    }

    onChange(items);
  });
}

export function onDocumentSnapshot<T>(
  path: string,
  id: string,
  onChange: (data: T) => any
): firebase.Unsubscribe {
  return db
    .collection(path)
    .doc(id)
    .onSnapshot((docSnap) => {
      if (docSnap.exists) {
        onChange(docSnap.data() as T);
      }
    });
}

export async function getDocument<T>(
  path: string,
  id: string
): Promise<T | null> {
  const snap = await db.collection(path).doc(id).get();

  return snap.exists ? (snap.data() as T) : null;
}

export async function updateDocument<T>(
  path: string,
  id: string,
  update: Partial<T>
): Promise<void> {
  await db.collection(path).doc(id).update(update);
}

export async function createDocument<T>(
  path: string,
  id: string,
  doc: T
): Promise<void> {
  await db.collection(path).doc(id).set(doc);
}

export function getDocumentID(path: string): string {
  return db.collection(path).doc().id;
}
