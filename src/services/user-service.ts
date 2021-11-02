import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, getFirestore, getDoc } from "firebase/firestore";
import "../configs/app";

const USERS_COLLECTION_NAME = "users";

type User = {
    id: string;
    fullName: string;
    email: string;
};

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

    const userDoc = await getDoc(doc(getFirestore(), USERS_COLLECTION_NAME, userCredential.user.uid));

    return {
        ...(userDoc.data() as User),
        id: userCredential.user.uid,
        email: email,
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

export const logout = async () => {
    await signOut(getAuth());
};
