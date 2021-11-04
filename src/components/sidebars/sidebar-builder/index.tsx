import React, { FormEvent, useEffect, useState } from "react";
import {
    AiOutlineDesktop,
    AiOutlineTablet,
    AiOutlineMobile,
    AiOutlinePlus,
    AiOutlineMenu,
    AiOutlineArrowLeft,
    AiOutlineFontColors,
    AiOutlineVideoCamera,
    AiOutlineClose,
} from "react-icons/ai";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { BiCarousel, BiImage, BiMap, BiNavigation, BiTrash } from "react-icons/bi";
import Section, { SectionWidget, SectionWidgetNavigationItem } from "../../../data/entities/section";
import LPBButton from "../../commons/lpb-button";
import LPBInput from "../../commons/lpb-input";
import LPBSpinner from "../../commons/lpb-spinner";
import * as userService from "../../../services/user-service";
import * as sectionService from "../../../services/section-service";
import { useHistory } from "react-router";
import LPBSelect from "../../commons/lpb-select";
import LPBAlert from "../../commons/lpb-alert";

const SidebarBuilder = (props: React.HTMLProps<HTMLDivElement>) => {
    const [previewAs, setPreviewAs] = useState<"desktop" | "tablet" | "mobile">("desktop");
    const [selectedSection, setSelectedSection] = useState<Section>();
    const [isAddSectionShown, setIsAddSectionShown] = useState(false);
    const [sectionName, setSectionName] = useState("");
    const [sectionHeight, setSectionHeight] = useState<"auto" | string>("auto");
    const [sectionJustifyContent, setSectionJustifyContent] = useState<"top" | "center" | "bottom">("top");
    const [sectionBgColor, setSectionBgColor] = useState("");
    const [sectionWidgets, setSectionWidgets] = useState<SectionWidget[]>();
    const [sectionWidgetType, setSectionWidgetType] = useState<"text" | "navigation" | "image" | "carousel" | "video" | "map">("text");
    const [sectionWidgetPosition, setSectionWidgetPosition] = useState<"left" | "center" | "right">("left");
    const [sectionWidgetWidth, setSectionWidgetWidth] = useState<"1/3" | "1/2" | "2/3" | "full">("1/3");
    const [sectionWidgetTextValue, setSectionWidgetTextValue] = useState<string>();
    const [sectionWidgetNavigationItems, setSectionWidgetNavigationItems] = useState<SectionWidgetNavigationItem[]>();
    const [sectionWidgetNavigationItemName, setSectionWidgetNavigationItemName] = useState("");
    const [sectionWidgetNavigationItemUrl, setSectionWidgetNavigationItemUrl] = useState("");
    const [isNavigationWithSearch, setIsNavigationWithSearch] = useState<boolean>();
    const [sectionWidgetImageUrl, setSectionWidgetImageUrl] = useState<string>();
    const [sectionWidgetMapLocation, setSectionWidgetMapLocation] = useState<{}>();
    const [sectionWidgetMapLocationLat, setSectionWidgetMapLocationLat] = useState("");
    const [sectioNWdigetMapLocationLng, setSectionWidgetMapLocationLng] = useState("");
    const [isSectionWidgetNavigationItemFieldEmpty, setIsSectionWidgetNavigationItemFieldEmpty] = useState(false);
    const [sections, setSections] = useState<Section[]>();
    const [isLoadingLogout, setIsLoadingLogout] = useState(false);
    const [isLoadingAddSection, setIsLoadingAddSection] = useState(false);
    const [isLoadingUpdateSection, setIsLoadingUpdateSection] = useState(false);
    const [isLoadingRemoveSection, setIsLoadingRemoveSection] = useState(false);
    const [isUpdateSectionShown, setIsUpdateSectionShown] = useState(false);
    const [isAddSectionWidgetShown, setIsAddSectionWidgetShown] = useState(false);
    const [isLoadingAddSectionWidget, setIsLoadingAddSectionWidget] = useState(false);
    const [userId, setUserId] = useState("");
    const history = useHistory();

    useEffect(() => {
        getSections();
    }, []);

    useEffect(() => {
        if (selectedSection !== undefined) {
            setSectionName(selectedSection.name);
            setSectionHeight(selectedSection.height);
            setSectionJustifyContent(selectedSection.justifyContent);
            setSectionHeight(selectedSection.height);
            setSectionBgColor(selectedSection.bgColor);
        }
    }, [selectedSection]);

    const getSections = async () => {
        const user = await userService.getProfile();
        setUserId(user?.id!!);
        const sections = await sectionService.getAllByUserId(user?.id!!);
        setSections(sections);
    };

    const addSection = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoadingAddSection(true);
        const user = await userService.getProfile();
        await sectionService.add(sectionName, sectionHeight, sectionJustifyContent, sectionBgColor, user?.id!!);
        setIsLoadingAddSection(false);
        setIsAddSectionShown(false);
        getSections();
    };

    const updateSection = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoadingUpdateSection(true);
        const updatedSection = await sectionService.update(selectedSection?.id!!, sectionName, sectionHeight, sectionJustifyContent, sectionBgColor);
        setIsLoadingUpdateSection(false);
        setIsUpdateSectionShown(false);
        setSelectedSection(updatedSection);
        getSections();
    };

    const removeSection = async () => {
        setIsLoadingRemoveSection(true);
        await sectionService.remove(selectedSection?.id!!);
        setSelectedSection(undefined);
        getSections();
        setIsLoadingRemoveSection(false);
    };

    const addSectionWidget = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoadingAddSectionWidget(true);
    };

    const addSectionWidgetNavigationItems = () => {
        setIsSectionWidgetNavigationItemFieldEmpty(false);

        if (sectionWidgetNavigationItemName === "" || sectionWidgetNavigationItemUrl === "") setIsSectionWidgetNavigationItemFieldEmpty(true);
        else {
            const sectionWidgetNavigationItemsTemp = sectionWidgetNavigationItems !== undefined ? [...sectionWidgetNavigationItems] : [];

            sectionWidgetNavigationItemsTemp.push({
                name: sectionWidgetNavigationItemName,
                url: sectionWidgetNavigationItemUrl,
            });

            setSectionWidgetNavigationItems(sectionWidgetNavigationItemsTemp);
            setSectionWidgetNavigationItemName("");
            setSectionWidgetNavigationItemUrl("");
        }
    };

    const removeSectionWidgetNavigationItem = (item: SectionWidgetNavigationItem) =>
        setSectionWidgetNavigationItems(sectionWidgetNavigationItems?.filter((_item) => _item !== item));

    const logout = async () => {
        setIsLoadingLogout(true);
        await userService.logout();
        setIsLoadingLogout(false);
        history.push("/");
    };

    return (
        <div className="w-96 min-h-screen bg-gray-200 relative p-4 space-y-3">
            {!isAddSectionShown && selectedSection === undefined && sections !== undefined && sections.length > 0 && (
                <div className="w-full flex flex-col space-y-3">
                    {sections.map((section) => (
                        <div
                            className="flex text-gray-700 items-center cursor-pointer w-full bg-gray-300 p-2 font-medium"
                            key={section.id}
                            onClick={() => setSelectedSection(section)}
                        >
                            <AiOutlineMenu className="cursor-move" />
                            <p className="ml-2">{section.name}</p>
                        </div>
                    ))}
                </div>
            )}

            {!isAddSectionShown && selectedSection === undefined && (
                <div
                    className="w-full flex text-gray-700 items-center cursor-pointer bg-gray-300 p-2 font-medium"
                    onClick={() => setIsAddSectionShown(true)}
                >
                    <AiOutlinePlus />
                    <p className="ml-2">Add Section</p>
                </div>
            )}

            {isAddSectionShown && (
                <div className="w-full bg-gray-300 text-gray-700 p-2 flex flex-col">
                    <div className="flex flex-row w-full items-center font-medium">
                        <AiOutlineArrowLeft className="cursor-pointer" onClick={() => setIsAddSectionShown(false)} />
                        <p className="ml-2">Add Section</p>
                    </div>

                    <form onSubmit={addSection} className="w-full mt-3 space-y-3">
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

                        <LPBSelect
                            label="Justify Content"
                            items={[
                                {
                                    text: "Top",
                                    value: "top",
                                },
                                {
                                    text: "Center",
                                    value: "center",
                                },
                                {
                                    text: "Bottom",
                                    value: "bottom",
                                },
                            ]}
                            selectedValue={(val) => setSectionJustifyContent(val as any)}
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
                            {isLoadingAddSection ? <LPBSpinner mode="white" className="text-2xl mx-auto" /> : <p className="mx-auto">Add</p>}
                        </LPBButton>
                    </form>
                </div>
            )}

            {selectedSection !== undefined && (
                <div className="w-full bg-gray-300 text-gray-700 p-2 flex flex-col">
                    <div className="flex flex-row w-full items-center font-medium">
                        {!isAddSectionWidgetShown && !isUpdateSectionShown && (
                            <AiOutlineArrowLeft className="cursor-pointer" onClick={() => setSelectedSection(undefined)} />
                        )}

                        <p className={`${!isAddSectionWidgetShown && !isUpdateSectionShown && "ml-2"}`}>{selectedSection.name}</p>

                        {!isUpdateSectionShown && (
                            <HiOutlinePencilAlt className="cursor-pointer ml-auto text-xl" onClick={() => setIsUpdateSectionShown(true)} />
                        )}
                    </div>

                    {isUpdateSectionShown ? (
                        <form onSubmit={updateSection} className="w-full mt-3 space-y-3">
                            <LPBInput
                                type="text"
                                label="Name"
                                placeholder="Input Section Name"
                                onChange={(e) => setSectionName(e.currentTarget.value)}
                                value={sectionName}
                                required
                            />

                            <LPBInput
                                type="text"
                                label="Height"
                                placeholder="Input Section Height (Ex: 200px or Input Auto for Auto Height)"
                                onChange={(e) => setSectionHeight(e.currentTarget.value)}
                                value={sectionHeight}
                                required
                            />

                            <LPBSelect
                                label="Justify Content"
                                items={[
                                    {
                                        text: "Top",
                                        value: "top",
                                    },
                                    {
                                        text: "Center",
                                        value: "center",
                                    },
                                    {
                                        text: "Bottom",
                                        value: "bottom",
                                    },
                                ]}
                                selectedValue={(val) => setSectionJustifyContent(val as any)}
                                value={sectionJustifyContent}
                                required
                            />

                            <LPBInput
                                type="text"
                                label="Background Color"
                                placeholder="Input Section Background Color (ex: #000000)"
                                onChange={(e) => setSectionBgColor(e.currentTarget.value)}
                                value={sectionBgColor}
                                required
                            />

                            <LPBButton type="submit" mode="primary" className="w-full flex items-center">
                                {isLoadingUpdateSection ? (
                                    <LPBSpinner mode="white" className="text-2xl mx-auto" />
                                ) : (
                                    <p className="mx-auto">Update</p>
                                )}
                            </LPBButton>

                            <LPBButton mode="error" className="w-full" onClick={() => setIsUpdateSectionShown(false)}>
                                Cancel
                            </LPBButton>
                        </form>
                    ) : (
                        <div className="w-full flex flex-col">
                            {!isAddSectionWidgetShown && selectedSection.widgets !== undefined && selectedSection.widgets.length > 0 && (
                                <div className="mt-3 w-full space-y-3">
                                    {selectedSection.widgets.map((widget, i) => (
                                        <div className="w-full flex bg-gray-400 text-gray-800 font-medium p-2 items-center cursor-pointer" key={i}>
                                            {widget.type === "text" && <AiOutlineFontColors />}
                                            {widget.type === "carousel" && <BiCarousel />}
                                            {widget.type === "image" && <BiImage />}
                                            {widget.type === "map" && <BiMap />}
                                            {widget.type === "navigation" && <BiNavigation />}
                                            {widget.type === "video" && <AiOutlineVideoCamera />}
                                            <p className="ml-2 capitalize">{widget.type}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {isAddSectionWidgetShown ? (
                                <form onSubmit={addSectionWidget} className="mt-3 w-full space-y-3">
                                    <LPBSelect
                                        label="Type"
                                        items={[
                                            {
                                                text: "Text",
                                                value: "text",
                                            },
                                            {
                                                text: "Navigation",
                                                value: "navigation",
                                            },
                                            {
                                                text: "Image",
                                                value: "image",
                                            },
                                            {
                                                text: "Carousel",
                                                value: "carousel",
                                            },
                                            {
                                                text: "Video",
                                                value: "video",
                                            },
                                            {
                                                text: "Map",
                                                value: "map",
                                            },
                                        ]}
                                        selectedValue={(val) => setSectionWidgetType(val as any)}
                                        required
                                    />
                                    <LPBSelect
                                        label="Position"
                                        items={[
                                            {
                                                text: "Left",
                                                value: "left",
                                            },
                                            {
                                                text: "Center",
                                                value: "center",
                                            },
                                            {
                                                text: "Right",
                                                value: "right",
                                            },
                                        ]}
                                        selectedValue={(val) => setSectionWidgetPosition(val as any)}
                                        required
                                    />
                                    <LPBSelect
                                        label="Width"
                                        items={[
                                            {
                                                text: "1/3",
                                                value: "1/3",
                                            },
                                            {
                                                text: "1/2",
                                                value: "1/2",
                                            },
                                            {
                                                text: "2/3",
                                                value: "2/3",
                                            },
                                            {
                                                text: "Full",
                                                value: "full",
                                            },
                                        ]}
                                        selectedValue={(val) => setSectionWidgetWidth(val as any)}
                                        required
                                    />

                                    {sectionWidgetType === "text" && (
                                        <LPBInput
                                            label="Text Value"
                                            placeholder="Input Text Value"
                                            onChange={(e) => setSectionWidgetTextValue(e.currentTarget.value)}
                                            required
                                        />
                                    )}

                                    {sectionWidgetType === "navigation" && (
                                        <div className="w-full space-y-3">
                                            <LPBInput
                                                label="Navigation Name"
                                                placeholder="Input Navigation Name"
                                                value={sectionWidgetNavigationItemName}
                                                onChange={(e) => setSectionWidgetNavigationItemName(e.currentTarget.value)}
                                            />

                                            <LPBInput
                                                label="Navigation URL"
                                                placeholder="Input Navigation URL"
                                                value={sectionWidgetNavigationItemUrl}
                                                onChange={(e) => setSectionWidgetNavigationItemUrl(e.currentTarget.value)}
                                            />

                                            {isSectionWidgetNavigationItemFieldEmpty && (
                                                <LPBAlert mode="error">Navigation Item Cannot be Empty</LPBAlert>
                                            )}

                                            <LPBButton type="button" mode="primary" className="w-full" onClick={addSectionWidgetNavigationItems}>
                                                Add Navigation Item
                                            </LPBButton>

                                            <div className="w-full space-y-3">
                                                {sectionWidgetNavigationItems !== undefined &&
                                                    sectionWidgetNavigationItems.length > 0 &&
                                                    sectionWidgetNavigationItems.map((item, i) => (
                                                        <div className="bg-gray-400 text-white p-2 w-full flex items-center">
                                                            <p className="text-center pl-4 w-full">{item.name}</p>

                                                            <AiOutlineClose
                                                                className="ml-auto text-lg text-error cursor-pointer"
                                                                onClick={() => removeSectionWidgetNavigationItem(item)}
                                                            />
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    )}

                                    <LPBButton type="submit" mode="primary" className="w-full flex items-center">
                                        {isLoadingAddSectionWidget ? (
                                            <LPBSpinner mode="white" className="text-2xl mx-auto" />
                                        ) : (
                                            <p className="mx-auto">Add</p>
                                        )}
                                    </LPBButton>

                                    <LPBButton mode="error" className="w-full" onClick={() => setIsAddSectionWidgetShown(false)}>
                                        Cancel
                                    </LPBButton>
                                </form>
                            ) : (
                                <div className="w-full mt-3">
                                    <div
                                        className="w-full bg-gray-400 text-gray-800 font-medium p-2 flex items-center cursor-pointer"
                                        onClick={() => setIsAddSectionWidgetShown(true)}
                                    >
                                        <AiOutlinePlus />
                                        <p className="ml-2">Add Widget</p>
                                    </div>

                                    <div
                                        className="w-full bg-error text-white font-medium p-2 mt-3 flex items-center cursor-pointer"
                                        onClick={removeSection}
                                    >
                                        {isLoadingRemoveSection ? (
                                            <LPBSpinner mode="white" className="text-2xl mx-auto" />
                                        ) : (
                                            <div className="w-full flex items-center">
                                                <BiTrash className="text-lg" />
                                                <p className="ml-2">Delete This Section</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
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

                        <LPBButton mode="primary" className="flex flex-1" isOutlined>
                            <a href={`/v/${userId}`} target="_blank" className="mx-auto py-2 w-full h-full">
                                View
                            </a>
                        </LPBButton>
                    </div>

                    <LPBButton mode="error" className="flex items-center mt-3" isOutlined onClick={logout}>
                        {isLoadingLogout ? <LPBSpinner mode="white" className="text-2xl mx-auto" /> : <p className="mx-auto">Logout</p>}
                    </LPBButton>
                </div>
            </div>
        </div>
    );
};

export default SidebarBuilder;
