import { collection, query, getFirestore, getDocs, where, setDoc, doc, getDoc, addDoc, deleteDoc, orderBy, limit } from "firebase/firestore";
import Section, { SectionWidgetNavigationItem } from "../data/entities/section";

const SECTIONS_COLLECTION_NAME = "sections";

export const getAllByUserId = async (userId: string): Promise<[Section]> => {
    const sections: any = [];
    const q = query(collection(getFirestore(), SECTIONS_COLLECTION_NAME), where("userId", "==", userId), orderBy("queueNumber", "asc"));
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
    let lastNumber = 0;
    const q = query(collection(getFirestore(), SECTIONS_COLLECTION_NAME), where("userId", "==", userId), orderBy("queueNumber", "desc"), limit(1));
    const currentLastQueueNumberDocs = await getDocs(q);
    currentLastQueueNumberDocs.forEach((doc) => (lastNumber = parseInt(doc.data().queueNumber) + 1));

    const sectionDoc = await addDoc(collection(getFirestore(), SECTIONS_COLLECTION_NAME), {
        name,
        height,
        justifyContent,
        bgColor,
        queueNumber: lastNumber,
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

export const remove = async (id: string) => await deleteDoc(doc(getFirestore(), SECTIONS_COLLECTION_NAME, id));

export const addWidget = async (
    type: "text" | "navigation" | "image" | "carousel" | "video" | "map",
    width: "1/3" | "1/2" | "2/3" | "full",
    position: "left" | "center" | "right",
    sectionId: string,
    textValue?: string,
    navigationItems?: SectionWidgetNavigationItem[],
    imageUrl?: string,
    carouselUrls?: string[],
    videoUrl?: string,
    mapLocation?: {
        lat?: string;
        lng?: string;
    }
): Promise<Section> => {
    const currentSectionDoc = await getDoc(doc(getFirestore(), SECTIONS_COLLECTION_NAME, sectionId));
    const currentSectionWidgets = currentSectionDoc.data()?.widgets === undefined ? [] : currentSectionDoc.data()!!.widgets;

    const addedDummyData = await addDoc(collection(getFirestore(), "dummies"), {
        dummy: "dummy",
    });

    const sectionWidget = {
        code: addedDummyData.id,
        type,
        width,
        position,
        textValue,
        navigationItems,
        imageUrl,
        carouselUrls,
        videoUrl,
        mapLocation,
    } as any;

    Object.keys(sectionWidget).map((key) => (sectionWidget[key] === undefined ? delete sectionWidget[key] : {}));
    currentSectionWidgets.push(sectionWidget);
    await deleteDoc(doc(getFirestore(), "dummies", addedDummyData.id));

    await setDoc(doc(getFirestore(), SECTIONS_COLLECTION_NAME, sectionId), {
        ...currentSectionDoc.data(),
        widgets: currentSectionWidgets,
    });

    const updatedSectionDoc = await getDoc(doc(getFirestore(), SECTIONS_COLLECTION_NAME, currentSectionDoc.id));

    return {
        ...(updatedSectionDoc.data() as Section),
        id: updatedSectionDoc.id,
    };
};

export const updateWidget = async (
    code: string,
    type: "text" | "navigation" | "image" | "carousel" | "video" | "map",
    width: "1/3" | "1/2" | "2/3" | "full",
    position: "left" | "center" | "right",
    sectionId: string,
    textValue?: string,
    navigationItems?: SectionWidgetNavigationItem[],
    imageUrl?: string,
    carouselUrls?: string[],
    videoUrl?: string,
    mapLocation?: {
        lat?: string;
        lng?: string;
    }
): Promise<Section> => {
    const currentSectionDoc = await getDoc(doc(getFirestore(), SECTIONS_COLLECTION_NAME, sectionId));
    const currentSectionWidgets = currentSectionDoc.data()?.widgets;
    const newSectionWidgets = [] as any[];

    currentSectionWidgets.map((widget: any) => {
        if (widget.code !== code) newSectionWidgets.push(widget);
        else {
            const sectionWidget = {
                code,
                type,
                width,
                position,
                textValue,
                navigationItems,
                imageUrl,
                carouselUrls,
                videoUrl,
                mapLocation: mapLocation?.lat === undefined || mapLocation.lng === undefined ? undefined : mapLocation,
            } as any;

            Object.keys(sectionWidget).map((key) => (sectionWidget[key] === undefined ? delete sectionWidget[key] : {}));
            newSectionWidgets.push(sectionWidget);
        }
    });

    console.log(newSectionWidgets);

    await setDoc(doc(getFirestore(), SECTIONS_COLLECTION_NAME, sectionId), {
        ...currentSectionDoc.data(),
        widgets: newSectionWidgets,
    });

    const updatedSectionDoc = await getDoc(doc(getFirestore(), SECTIONS_COLLECTION_NAME, currentSectionDoc.id));

    return {
        ...(updatedSectionDoc.data() as Section),
        id: updatedSectionDoc.id,
    };
};
