import { initializeApp, auth, firestore, storage } from 'firebase';

// Add the web app's Firebase configuration in the root directory
import firebaseConfig from "./serviceAccount.json";

initializeApp(firebaseConfig);

export {
    auth,
    storage,
    firestore
}