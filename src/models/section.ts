type Section = {
    id: string;
    name: string;
    height: "auto" | string;
    justifyContent: "top" | "center" | "bottom";
    bgColor: string;
    widgets: [
        {
            type: "text" | "navigation" | "input" | "textarea" | "image" | "carousel" | "video" | "map";
            width: "1/3" | "1/2" | "2/3" | "full";
            position: "left" | "center" | "right";
            textValue?: string;
            navigationItems?: [
                {
                    name: string;
                    url: string;
                }
            ];
            isNavigationWithSearch?: boolean;
            inputPlaceholder?: string;
            textAreaPlaceholder?: string;
            imageUrl?: string;
            carouselUrls?: [string];
            videoUrl?: string;
            mapLocation?: {
                lat: string;
                lng: string;
            };
        }
    ];
    userId: string;
};

export default Section;
