import { collection, query, getFirestore, getDocs, where, limit, addDoc } from "firebase/firestore";
import "../configs/app";
import Section from "../models/section";

const SECTIONS_COLLECTION_NAME = "sections";

export const getByUserId = async (userId: string): Promise<[Section]> => {
    const sections: any = [];
    const q = query(collection(getFirestore(), SECTIONS_COLLECTION_NAME), where("userId", "==", userId), limit(1));
    const sectionQuerySnapshots = await getDocs(q);

    sectionQuerySnapshots.forEach((doc) => {
        sections.push({
            ...doc.data(),
            id: doc.id,
        });
    });

    return sections;
};

export const insertDummy = async () => {
    await addDoc(collection(getFirestore(), SECTIONS_COLLECTION_NAME), {
        name: "header",
        height: "auto",
        justifyContent: "center",
        bgColor: "d50000",
        widgets: [
            {
                type: "text",
                width: "1/3",
                position: "left",
                textValue: "This is header",
            },
            {
                type: "navigation",
                width: "2/3",
                position: "right",
                navigationItems: [
                    {
                        name: "home",
                        url: "https://lapabu-0.web.app",
                    },
                    {
                        name: "cv",
                        url: "https://erthru-cv.web.app",
                    },
                ],
            },
        ],
        userId: "keo0ELf5UeUEHtJ7gvAiaO5zeFl2",
    });
};
