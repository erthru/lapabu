import { collection, query, getFirestore, getDocs, where, limit, addDoc } from "firebase/firestore";
import "../configs/app";
import Section from "../models/section";

const SECTIONS_COLLECTION_NAME = "sections";

export const getAllByUserId = async (userId: string): Promise<[Section]> => {
    const sections: any = [];
    const q = query(collection(getFirestore(), SECTIONS_COLLECTION_NAME), where("userId", "==", userId));
    const sectionQuerySnapshots = await getDocs(q);

    sectionQuerySnapshots.forEach((doc) => {
        sections.push({
            ...doc.data(),
            id: doc.id,
        });
    });

    return sections;
};

export const add = async (name: string, height: "auto" | string, justifyContent: "top" | "center" | "bottom", bgColor: string, userId: string) => {
    await addDoc(collection(getFirestore(), SECTIONS_COLLECTION_NAME), {
        name,
        height,
        justifyContent,
        bgColor,
        userId,
    });
};
