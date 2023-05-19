import { getApps, initializeApp } from "firebase/app"
import { getAuth, connectAuthEmulator, Auth } from "firebase/auth";
import { connectFirestoreEmulator, Firestore, getFirestore, initializeFirestore } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";

import { connectStorageEmulator, getStorage } from "firebase/storage";

const firebaseConfig = JSON?.parse?.(
    process?.env?.NEXT_PUBLIC_FIREBASE_CREDENTIALS as string || "{}"
)

// Initialize Firebase
const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

if (!process?.env?.NEXT_PUBLIC_FIREBASE_EMULATOR_HOST) {
    initializeFirestore(firebaseApp, { ignoreUndefinedProperties: true, })
}

export const db: Firestore = getFirestore(firebaseApp)
export const auth: Auth = getAuth(firebaseApp)
export const functions = getFunctions(firebaseApp)
export const storage = getStorage(firebaseApp)

const EMULATORS_STARTED = 'EMULATORS_STARTED';

function startEmulators() {
    // @ts-ignore
    if (!global[EMULATORS_STARTED]) {
    // @ts-ignore
        global[EMULATORS_STARTED] = true;
        const host = process?.env?.NEXT_PUBLIC_FIREBASE_EMULATOR_HOST || "";
        connectAuthEmulator(auth, `http://${host}:9099`);
        connectFirestoreEmulator(db, host, 8080)
        connectStorageEmulator(storage, host, 9199);
        connectFunctionsEmulator(functions, host, 5001);
    }
}


if (process?.env?.NEXT_PUBLIC_FIREBASE_EMULATOR_HOST) {
    console.log("Starting Firebase Emulators")
    startEmulators()
}