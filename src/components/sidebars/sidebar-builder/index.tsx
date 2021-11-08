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
import { BiImage, BiNavigation } from "react-icons/bi";
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
    const [sectionName, setSectionName] = useState<string>();
    const [sectionHeight, setSectionHeight] = useState<"auto" | string>("auto");
    const [sectionJustifyContent, setSectionJustifyContent] = useState<"top" | "center" | "bottom">("top");
    const [sectionBgColor, setSectionBgColor] = useState<string>();
    const [sectionWidgetType, setSectionWidgetType] = useState<"text" | "navigation" | "image">("text");
    const [sectionWidgetPosition, setSectionWidgetPosition] = useState<"left" | "center" | "right">("left");
    const [sectionWidgetWidth, setSectionWidgetWidth] = useState<"1/3" | "1/2" | "2/3" | "full">("1/3");
    const [sectionWidgetTextValue, setSectionWidgetTextValue] = useState<string>();
    const [sectionWidgetNavigationItems, setSectionWidgetNavigationItems] = useState<SectionWidgetNavigationItem[]>();
    const [sectionWidgetNavigationItemName, setSectionWidgetNavigationItemName] = useState<string>();
    const [sectionWidgetNavigationItemUrl, setSectionWidgetNavigationItemUrl] = useState<string>();
    const [sectionWidgetImageUrl, setSectionWidgetImageUrl] = useState<string>();
    const [isSectionWidgetNavigationItemFieldEmpty, setIsSectionWidgetNavigationItemFieldEmpty] = useState(false);
    const [sections, setSections] = useState<Section[]>();
    const [isLoadingLogout, setIsLoadingLogout] = useState(false);
    const [isLoadingAddSection, setIsLoadingAddSection] = useState(false);
    const [isLoadingUpdateSection, setIsLoadingUpdateSection] = useState(false);
    const [isLoadingRemoveSection, setIsLoadingRemoveSection] = useState(false);
    const [isUpdateSectionShown, setIsUpdateSectionShown] = useState(false);
    const [isAddSectionWidgetShown, setIsAddSectionWidgetShown] = useState(false);
    const [isLoadingAddSectionWidget, setIsLoadingAddSectionWidget] = useState(false);
    const [isLoadingUpdateSectionWidget, setIsLoadingUpdateSectionWidget] = useState(false);
    const [isUpdateSectionWidgetShown, setIsUpdateSectionWidgetShown] = useState(false);
    const [selectedSectionWidget, setSelectedSectionWidget] = useState<SectionWidget>();
    const [isLoadingRemoveSectionWidget, setIsLoadingRemoveSectionWidget] = useState(false);
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

        if (selectedSectionWidget !== undefined) {
            setSectionWidgetType(selectedSectionWidget.type);
            setSectionWidgetWidth(selectedSectionWidget.width);
            setSectionWidgetPosition(selectedSectionWidget.position);
            setSectionWidgetTextValue(selectedSectionWidget.textValue);
            setSectionWidgetNavigationItems(selectedSectionWidget.navigationItems);
            setSectionWidgetImageUrl(selectedSectionWidget.imageUrl);
        }
    }, [selectedSection, selectedSectionWidget]);

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
        await sectionService.add(sectionName!!, sectionHeight, sectionJustifyContent, sectionBgColor!!, user?.id!!);
        setIsLoadingAddSection(false);
        setIsAddSectionShown(false);
        getSections();
    };

    const updateSection = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoadingUpdateSection(true);
        const updatedSection = await sectionService.update(
            selectedSection?.id!!,
            sectionName!!,
            sectionHeight,
            sectionJustifyContent,
            sectionBgColor!!
        );
        setIsLoadingUpdateSection(false);
        setIsUpdateSectionShown(false);
        setSelectedSection(updatedSection);
        getSections();
    };

    const removeSection = async () => {
        setIsLoadingRemoveSection(true);
        await sectionService.remove(selectedSection?.id!!);
        setIsLoadingRemoveSection(false);
        setIsUpdateSectionShown(false);
        setSelectedSection(undefined);
        getSections();
    };

    const addSectionWidgetPrepare = () => {
        setIsAddSectionWidgetShown(true);
        resetSectionWidgetForm();
    };

    const addSectionWidget = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoadingAddSectionWidget(true);

        const updatedSection = await sectionService.addWidget(
            sectionWidgetType,
            sectionWidgetWidth,
            sectionWidgetPosition,
            selectedSection?.id!!,
            sectionWidgetTextValue,
            sectionWidgetNavigationItems,
            sectionWidgetImageUrl
        );

        setIsLoadingAddSectionWidget(false);
        setIsAddSectionWidgetShown(false);
        setSelectedSection(updatedSection);
        getSections();
        resetSectionWidgetForm();
    };

    const updateSectionWidget = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoadingUpdateSectionWidget(true);

        const updatedSection = await sectionService.updateWidget(
            selectedSectionWidget?.code!!,
            sectionWidgetType,
            sectionWidgetWidth,
            sectionWidgetPosition,
            selectedSection?.id!!,
            sectionWidgetTextValue,
            sectionWidgetNavigationItems,
            sectionWidgetImageUrl
        );

        setIsLoadingUpdateSectionWidget(false);
        setIsUpdateSectionWidgetShown(false);
        setSelectedSection(updatedSection);
        getSections();
        resetSectionWidgetForm();
    };

    const removeSectionWidget = async () => {
        setIsLoadingRemoveSectionWidget(true);
        const updatedSection = await sectionService.removeWidget(selectedSectionWidget?.code!!, selectedSection?.id!!);
        setIsLoadingRemoveSectionWidget(false);
        setIsUpdateSectionWidgetShown(false);
        setSelectedSection(updatedSection);
        getSections();
        resetSectionWidgetForm();
    };

    const addSectionWidgetNavigationItems = () => {
        setIsSectionWidgetNavigationItemFieldEmpty(false);

        if (sectionWidgetNavigationItemName === "" || sectionWidgetNavigationItemUrl === "") setIsSectionWidgetNavigationItemFieldEmpty(true);
        else {
            const sectionWidgetNavigationItemsTemp = sectionWidgetNavigationItems !== undefined ? [...sectionWidgetNavigationItems] : [];

            sectionWidgetNavigationItemsTemp.push({
                name: sectionWidgetNavigationItemName!!,
                url: sectionWidgetNavigationItemUrl!!,
            });

            setSectionWidgetNavigationItems(sectionWidgetNavigationItemsTemp);
            setSectionWidgetNavigationItemName("");
            setSectionWidgetNavigationItemUrl("");
        }
    };

    const removeSectionWidgetNavigationItem = (item: SectionWidgetNavigationItem) =>
        setSectionWidgetNavigationItems(sectionWidgetNavigationItems?.filter((_item) => _item !== item));

    const showSelectedSectionWidget = (sectionWidget: SectionWidget) => {
        setIsUpdateSectionWidgetShown(true);
        setSelectedSectionWidget(sectionWidget);
    };

    const resetSectionWidgetForm = () => {
        setSectionWidgetType("text");
        setSectionWidgetWidth("1/3");
        setSectionWidgetPosition("left");
        setSectionWidgetTextValue(undefined);
        setSectionWidgetNavigationItems(undefined);
        setSectionWidgetImageUrl(undefined);
    };

    const logout = async () => {
        setIsLoadingLogout(true);
        await userService.logout();
        setIsLoadingLogout(false);
        history.push("/");
    };

    return (
        <div className="w-96 min-h-screen bg-gray-200 flex flex-col">
            <div className="w-full h-full p-4 space-y-3">
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
                            {!isAddSectionWidgetShown && !isUpdateSectionShown && !isUpdateSectionWidgetShown && (
                                <AiOutlineArrowLeft className="cursor-pointer" onClick={() => setSelectedSection(undefined)} />
                            )}

                            <p className={`${!isAddSectionWidgetShown && !isUpdateSectionShown && "ml-2"}`}>{selectedSection.name}</p>

                            {!isAddSectionWidgetShown && !isUpdateSectionShown && !isUpdateSectionWidgetShown && (
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

                                {!isLoadingRemoveSection && (
                                    <LPBButton type="submit" mode="primary" className="w-full flex items-center">
                                        {isLoadingUpdateSection ? (
                                            <LPBSpinner mode="white" className="text-2xl mx-auto" />
                                        ) : (
                                            <p className="mx-auto">Update</p>
                                        )}
                                    </LPBButton>
                                )}

                                {!isLoadingUpdateSection && !isLoadingRemoveSection && (
                                    <LPBButton mode="error" className="w-full" onClick={() => setIsUpdateSectionShown(false)}>
                                        Cancel
                                    </LPBButton>
                                )}

                                {!isLoadingUpdateSection && (
                                    <LPBButton type="button" mode="error" className="w-full flex items-center" onClick={removeSection}>
                                        {isLoadingRemoveSection ? (
                                            <LPBSpinner mode="white" className="text-2xl mx-auto" />
                                        ) : (
                                            <p className="mx-auto">Remove</p>
                                        )}
                                    </LPBButton>
                                )}
                            </form>
                        ) : (
                            <div className="w-full flex flex-col">
                                {!isAddSectionWidgetShown &&
                                    !isUpdateSectionWidgetShown &&
                                    selectedSection.widgets !== undefined &&
                                    selectedSection.widgets.length > 0 && (
                                        <div className="mt-3 w-full space-y-3">
                                            {selectedSection.widgets.map((widget, i) => (
                                                <div
                                                    className="w-full flex bg-gray-400 text-gray-800 font-medium p-2 items-center cursor-pointer"
                                                    key={i}
                                                    onClick={() => showSelectedSectionWidget(selectedSection.widgets[i])}
                                                >
                                                    {widget.type === "text" && <AiOutlineFontColors />}
                                                    {widget.type === "image" && <BiImage />}
                                                    {widget.type === "navigation" && <BiNavigation />}
                                                    <p className="ml-2 capitalize">{widget.type}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                {isAddSectionWidgetShown && (
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

                                        {sectionWidgetType === "image" && (
                                            <LPBInput
                                                label="Image URL"
                                                placeholder="Input Image URL"
                                                onChange={(e) => setSectionWidgetImageUrl(e.currentTarget.value)}
                                                required
                                            />
                                        )}

                                        <LPBButton type="submit" mode="primary" className="w-full flex items-center">
                                            {isLoadingAddSectionWidget ? (
                                                <LPBSpinner mode="white" className="text-2xl mx-auto" />
                                            ) : (
                                                <p className="mx-auto">Add</p>
                                            )}
                                        </LPBButton>

                                        {!isLoadingAddSectionWidget && (
                                            <LPBButton
                                                type="button"
                                                mode="error"
                                                className="w-full"
                                                onClick={() => setIsAddSectionWidgetShown(false)}
                                            >
                                                Cancel
                                            </LPBButton>
                                        )}
                                    </form>
                                )}

                                {isUpdateSectionWidgetShown && (
                                    <form onSubmit={updateSectionWidget} className="mt-3 w-full space-y-3">
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
                                            ]}
                                            selectedValue={(val) => setSectionWidgetType(val as any)}
                                            value={sectionWidgetType}
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
                                            value={sectionWidgetPosition}
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
                                            value={sectionWidgetWidth}
                                            required
                                        />

                                        {sectionWidgetType === "text" && (
                                            <LPBInput
                                                label="Text Value"
                                                placeholder="Input Text Value"
                                                onChange={(e) => setSectionWidgetTextValue(e.currentTarget.value)}
                                                value={sectionWidgetTextValue}
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

                                        {sectionWidgetType === "image" && (
                                            <LPBInput
                                                label="Image URL"
                                                placeholder="Input Image URL"
                                                onChange={(e) => setSectionWidgetImageUrl(e.currentTarget.value)}
                                                value={sectionWidgetImageUrl}
                                                required
                                            />
                                        )}

                                        {!isLoadingRemoveSectionWidget && (
                                            <LPBButton type="submit" mode="primary" className="w-full flex items-center">
                                                {isLoadingUpdateSectionWidget ? (
                                                    <LPBSpinner mode="white" className="text-2xl mx-auto" />
                                                ) : (
                                                    <p className="mx-auto">Update</p>
                                                )}
                                            </LPBButton>
                                        )}

                                        {!isLoadingUpdateSectionWidget && !isLoadingRemoveSectionWidget && (
                                            <LPBButton
                                                type="button"
                                                mode="error"
                                                className="w-full"
                                                onClick={() => setIsUpdateSectionWidgetShown(false)}
                                            >
                                                Cancel
                                            </LPBButton>
                                        )}

                                        {!isLoadingUpdateSectionWidget && (
                                            <LPBButton type="button" mode="error" className="w-full flex items-center" onClick={removeSectionWidget}>
                                                {isLoadingRemoveSectionWidget ? (
                                                    <LPBSpinner mode="white" className="text-2xl mx-auto" />
                                                ) : (
                                                    <p className="mx-auto">Remove</p>
                                                )}
                                            </LPBButton>
                                        )}
                                    </form>
                                )}

                                {!isAddSectionWidgetShown && !isUpdateSectionWidgetShown && (
                                    <div className="w-full mt-3">
                                        <div
                                            className="w-full bg-gray-400 text-gray-800 font-medium p-2 flex items-center cursor-pointer"
                                            onClick={addSectionWidgetPrepare}
                                        >
                                            <AiOutlinePlus />
                                            <p className="ml-2">Add Widget</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="w-full p-4 bottom-0 left-0">
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
