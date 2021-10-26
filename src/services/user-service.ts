import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getFirestore, getDoc } from "firebase/firestore";
import "../configs/app";
import User from "../models/user";

const USERS_COLLECTION_NAME = "users";

export const isLoggedIn = async (): Promise<boolean> => {
    return new Promise((resolve) => {
        onAuthStateChanged(getAuth(), (user) => {
            resolve(user !== null);
        });
    });
};

export const register = async (fullName: string, email: string, password: string): Promise<User> => {
    const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);

    await setDoc(doc(getFirestore(), USERS_COLLECTION_NAME, userCredential.user.uid), {
        fullName,
    });

    return {
        id: userCredential.user.uid,
        fullName,
        email,
    };
};

export const login = async (email: string, password: string): Promise<User> => {
    const userCredential = await signInWithEmailAndPassword(getAuth(), email, password);
    const userDoc = await getDoc(doc(getFirestore(), USERS_COLLECTION_NAME, userCredential.user.uid));

    return {
        ...(userDoc.data() as User),
        id: userCredential.user.uid,
        email,
    };
};

export const getProfile = async (): Promise<User | null> => {
    const user: any = await new Promise((resolve) => {
        onAuthStateChanged(getAuth(), (user) => {
            resolve(user);
        });
    });

    if (user !== null) {
        const userDoc = await getDoc(doc(getFirestore(), USERS_COLLECTION_NAME, user.uid));

        return {
            ...(userDoc.data() as User),
            id: user.uid,
            email: user.email!!,
        };
    }

    return null;
};
