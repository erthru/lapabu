type Section = {
    id: string;
    name: string;
    height: "auto" | string;
    justifyContent: "top" | "center" | "bottom";
    bgColor: string;
    widgets: SectionWidget[];
    queueNumber: number;
    userId: string;
};

export type SectionWidget = {
    type: "text" | "navigation" | "image" | "carousel" | "video" | "map";
    width: "1/3" | "1/2" | "2/3" | "full";
    position: "left" | "center" | "right";
    textValue?: string;
    navigationItems?: SectionWidgetNavigationItem[];
    imageUrl?: string;
    carouselUrls?: string[];
    videoUrl?: string;
    mapLocation?: {
        lat?: string;
        lng?: string;
    };
};

export type SectionWidgetNavigationItem = {
    name: string;
    url: string;
};

export default Section;
