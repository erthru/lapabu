import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import "../configs/app";
import User from "../models/user";

const USER_COLLECTION_NAME = "users";

export const isLoggedIn = async (): Promise<boolean> => {
    return new Promise((resolve) => {
        onAuthStateChanged(getAuth(), (user) => {
            resolve(user !== null);
        });
    });
};

export const register = async (fullName: string, email: string, password: string): Promise<User> => {
    const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);

    await setDoc(doc(getFirestore(), USER_COLLECTION_NAME, userCredential.user.uid), {
        fullName,
    });

    return {
        id: userCredential.user.uid,
        fullName,
        email,
    };
};
