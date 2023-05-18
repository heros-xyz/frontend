import { getApps, initializeApp } from "firebase/app"
import { GoogleAuthProvider, getAuth, signInWithPopup, connectAuthEmulator } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore, initializeFirestore } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";

import { connectStorageEmulator, getStorage } from "firebase/storage";

const firebaseConfig = JSON?.parse?.(
    process?.env?.NEXT_PUBLIC_FIREBASE_CREDENTIALS as string || "{}"
)

// Initialize Firebase
const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

if (!process?.env?.NEXT_PUBLIC_FIREBASE_EMULATOR_HOST) {
    initializeFirestore(firebaseApp, { ignoreUndefinedProperties: true })
}

export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)
export const functions = getFunctions(firebaseApp)
export const storage = getStorage(firebaseApp)

if (process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_HOST) {
    const host = process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_HOST;
    connectAuthEmulator(auth, `http://${host}:9099`);
    connectFirestoreEmulator(db, host, 8080)
    connectStorageEmulator(storage, host, 9199);
    connectFunctionsEmulator(functions, host, 5001);
}
