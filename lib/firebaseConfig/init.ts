// Import the functions you need from the SDKs you need
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import {
	getAuth,
	Auth
} from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, ref, FirebaseStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
let app:FirebaseApp;
function initFirebase() {
	const firebaseConfig = {
		apiKey: process.env.NEXT_PUBLIC_apiKey,
		authDomain: process.env.NEXT_PUBLIC_authDomain,
		projectId: process.env.NEXT_PUBLIC_projectId,
		storageBucket: process.env.NEXT_PUBLIC_storageBucket,
		messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
		appId: process.env.NEXT_PUBLIC_appId,
	};

	// Initialize Firebase
	const apps = getApps();
	if (!apps.length) {
		app = initializeApp(firebaseConfig);
	}
}

async function initializeFirebaseApp() {
	await initFirebase();
	return app;
}

const authPromise: Promise<Auth> = initializeFirebaseApp().then(getAuth);
const dbPromise: Promise<Firestore> = initializeFirebaseApp().then(getFirestore);
const storagePromise: Promise<FirebaseStorage> = initializeFirebaseApp().then(getStorage);

export const auth: Promise<Auth> = authPromise;
export const db: Promise<Firestore> = dbPromise;
export const storage: Promise<FirebaseStorage> = storagePromise;

export {app}