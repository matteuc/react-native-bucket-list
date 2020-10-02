import { initializeApp, auth, firestore, storage, apps } from 'firebase';
import 'firebase/firestore';
import firebaseConfig from './serviceAccount.json';

if (!apps.length) {
  initializeApp(firebaseConfig);
}

const db = firestore();

export { auth, storage, db };
