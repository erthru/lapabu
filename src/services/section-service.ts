import { collection, query, getFirestore, getDocs, where, setDoc, doc, getDoc, addDoc } from "firebase/firestore";
import Section from "../data/entities/section";

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

export const add = async (
    name: string,
    height: "auto" | string,
    justifyContent: "top" | "center" | "bottom",
    bgColor: string,
    userId: string
): Promise<Section> => {
    const sectionDoc = await addDoc(collection(getFirestore(), SECTIONS_COLLECTION_NAME), {
        name,
        height,
        justifyContent,
        bgColor,
        userId,
    });

    const updatedSectionDoc = await getDoc(doc(getFirestore(), SECTIONS_COLLECTION_NAME, sectionDoc.id));

    return {
        ...(updatedSectionDoc.data() as Section),
        id: updatedSectionDoc.id,
    };
};

export const update = async (
    id: string,
    name: string,
    height: "auto" | string,
    justifyContent: "top" | "center" | "bottom",
    bgColor: string
): Promise<Section> => {
    const currentSectionDoc = await getDoc(doc(getFirestore(), SECTIONS_COLLECTION_NAME, id));

    await setDoc(doc(getFirestore(), SECTIONS_COLLECTION_NAME, id), {
        ...currentSectionDoc.data(),
        name,
        height,
        justifyContent,
        bgColor,
    });

    const updatedSectionDoc = await getDoc(doc(getFirestore(), SECTIONS_COLLECTION_NAME, currentSectionDoc.id));

    return {
        ...(updatedSectionDoc.data() as Section),
        id: updatedSectionDoc.id,
    };
};
