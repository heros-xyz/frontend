import { getApps, initializeApp } from "firebase/app"
import { GoogleAuthProvider, getAuth, signInWithPopup, connectAuthEmulator } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";

import { connectStorageEmulator, getStorage } from "firebase/storage";

const firebaseConfig = JSON.parse(
  process.env.NEXT_PUBLIC_FIREBASE_CREDENTIALS as string
)

// Initialize Firebase
const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];


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

// Auth
const provider = new GoogleAuthProvider();

export async function signInWithPopupGoogle() {

    try {
        const result = await signInWithPopup(auth, provider)
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        console.log("token", token);
        // The signed-in user info.
        const user = result.user;
        console.log("user", user);
        return user;
    } catch (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error({ errorCode, errorMessage, email, credential })
    }

}
