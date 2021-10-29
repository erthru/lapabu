import React, { FormEvent, useEffect, useState } from "react";
import { AiOutlineDesktop, AiOutlineTablet, AiOutlineMobile, AiOutlinePlus, AiOutlineMenu, AiOutlineArrowLeft } from "react-icons/ai";
import Section from "../../../models/section";
import LPBButton from "../../commons/lpb-button";
import LPBInput from "../../commons/lpb-input";
import LPBSpinner from "../../commons/lpb-spinner";
import * as userService from "../../../services/user-service";
import * as sectionService from "../../../services/section-service";
import { useHistory } from "react-router";

const SidebarBuilder = (props: React.HTMLProps<HTMLDivElement>) => {
    const [previewAs, setPreviewAs] = useState<"desktop" | "tablet" | "mobile">("desktop");
    const [selectedSection, setSelectedSections] = useState<Section>();
    const [isAddSectionPreparing, setIsAddSectionPreparing] = useState(false);
    const [sectionName, setSectionName] = useState("");
    const [sectionHeight, setSectionHeight] = useState<"auto" | string>("auto");
    const [sectionJustifyContent, setSectionJustifyContent] = useState<"top" | "center" | "bottom">("top");
    const [sectionBgColor, setSectionBgColor] = useState("");
    const [sectionWidgets, setSectionWidgets] = useState<[any]>();
    const [sectionWidgetType, setSectionWidgetType] = useState<"text" | "navigation" | "input" | "textarea" | "image" | "carousel" | "video" | "map">(
        "text"
    );
    const [sectionWidgetPosition, setSectionWidgetPosition] = useState<"left" | "center" | "right">("left");
    const [sectionWidgetTextValue, setSectionWidgetTextValue] = useState<string>();
    const [sectionWidgetNavigationItems, setSectionWidgetNavigationItems] = useState<any>();
    const [sectionWidgetNavgationItemName, setSectionWidgetNavigationItemName] = useState("");
    const [sectionWidgetNavigationItemUrl, setSectionWidgetNavigationItemUrl] = useState("");
    const [isNavigationWithSearch, setIsNavigationWithSearch] = useState<boolean>();
    const [sectionWidgetInputPlaceholder, setSectionWidgetInputPlaceholder] = useState<string>();
    const [sectionWidgetImageUrl, setSectionWidgetImageUrl] = useState<string>();
    const [sectionWidgetMapLocation, setSectionWidgetMapLocation] = useState<{}>();
    const [sectionWidgetMapLocationLat, setSectionWidgetMapLocationLat] = useState("");
    const [sectioNWdigetMapLocationLng, setSectionWidgetMapLocationLng] = useState("");
    const [sections, setSections] = useState<[Section]>();
    const [isLoadingLogout, setIsLoadingLogout] = useState(false);
    const [isLoadingAdd, setIsLoadingAdd] = useState(false);
    const history = useHistory();

    useEffect(() => {
        getSections();
    }, []);

    const getSections = async () => {
        const user = await userService.getProfile();
        const sections = await sectionService.getAllByUserId(user?.id!!);
        setSections(sections);
    };

    const add = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoadingAdd(true);
        const user = await userService.getProfile();
        await sectionService.add(sectionName, sectionHeight, sectionJustifyContent, sectionBgColor, user?.id!!);
        setIsLoadingAdd(false);
        setIsAddSectionPreparing(false);
    };

    const logout = async () => {
        setIsLoadingLogout(true);
        await userService.logout();
        setIsLoadingLogout(false);
        history.push("/");
    };

    return (
        <div className="w-96 min-h-screen bg-gray-200 relative p-4">
            {!isAddSectionPreparing && selectedSection === undefined && sections !== undefined && (
                <div className="w-full flex flex-col space-y-3">
                    {sections.map((section) => (
                        <div
                            className="flex text-gray-700 items-center cursor-pointer w-full bg-gray-300 p-2 font-medium"
                            key={section.id}
                            onClick={() => setSelectedSections(section)}
                        >
                            <AiOutlineMenu className="cursor-move" />
                            <p className="ml-2">{section.name}</p>
                        </div>
                    ))}
                </div>
            )}

            {!isAddSectionPreparing && selectedSection === undefined && (
                <div
                    className="w-full mt-3 flex text-gray-700 items-center cursor-pointer bg-gray-300 p-2 font-medium"
                    onClick={() => setIsAddSectionPreparing(true)}
                >
                    <AiOutlinePlus />
                    <p className="ml-2">Add Section</p>
                </div>
            )}

            {isAddSectionPreparing && (
                <div className="w-full bg-gray-300 text-gray-700 p-2 flex flex-col">
                    <div className="flex flex-row w-full items-center font-medium">
                        <AiOutlineArrowLeft className="cursor-pointer" onClick={() => setIsAddSectionPreparing(false)} />
                        <p className="ml-2">Add Section</p>
                    </div>

                    <form onSubmit={add} className="w-full mt-3 space-y-3">
                        <LPBInput
                            type="text"
                            label="Name"
                            placeholder="Input Section Name"
                            onChange={(e) => setSectionName(e.currentTarget.value)}
                            required
                        />

                        <LPBInput
                            type="text"
                            label="Height"
                            placeholder="Input Section Height (Ex: 200px or Input Auto for Auto Height)"
                            onChange={(e) => setSectionHeight(e.currentTarget.value)}
                            required
                        />

                        <LPBInput
                            type="text"
                            label="Justify Content"
                            placeholder="Will Using Select Here, coomiinnggg"
                            onChange={(e) => setSectionJustifyContent(e.currentTarget.value as any)}
                            required
                        />

                        <LPBInput
                            type="text"
                            label="Background Color"
                            placeholder="Input Section Background Color (ex: #000000)"
                            onChange={(e) => setSectionBgColor(e.currentTarget.value)}
                            required
                        />

                        <LPBButton mode="primary" className="w-full flex items-center">
                            {isLoadingAdd ? <LPBSpinner mode="white" className="text-2xl mx-auto" /> : <p className="mx-auto">Add</p>}
                        </LPBButton>
                    </form>
                </div>
            )}

            {selectedSection !== undefined && (
                <div className="w-full bg-gray-300 text-gray-700 p-2 flex flex-col">
                    <div className="flex flex-row w-full items-center font-medium">
                        <AiOutlineArrowLeft className="cursor-pointer" onClick={() => setSelectedSections(undefined)} />
                        <p className="ml-2">{selectedSection.name}</p>
                    </div>
                </div>
            )}

            <div className="w-full p-4 absolute bottom-0 left-0">
                <div className="w-full flex flex-col bg-gray-300 p-3">
                    <div className="flex w-full text-gray-400 space-x-3 items-center" style={{ fontSize: "28px" }}>
                        <AiOutlineDesktop
                            className={`cursor-pointer ${previewAs === "desktop" && "text-primary"}`}
                            onClick={() => setPreviewAs("desktop")}
                        />
                        <AiOutlineTablet
                            className={`cursor-pointer ${previewAs === "tablet" && "text-primary"} `}
                            onClick={() => setPreviewAs("tablet")}
                        />
                        <AiOutlineMobile
                            className={`cursor-pointer ${previewAs === "mobile" && "text-primary"} `}
                            onClick={() => setPreviewAs("mobile")}
                        />

                        <LPBButton mode="error" className="flex items-center flex-1" isOutlined onClick={logout}>
                            {isLoadingLogout ? <LPBSpinner mode="white" className="text-2xl mx-auto" /> : <p className="mx-auto">Logout</p>}
                        </LPBButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SidebarBuilder;
