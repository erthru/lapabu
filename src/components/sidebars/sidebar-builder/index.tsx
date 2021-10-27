import { useState } from "react";
import { AiOutlineDesktop, AiOutlineTablet, AiOutlineMobile, AiOutlinePlus, AiOutlineMenu } from "react-icons/ai";
import Section from "../../../models/section";
import LPBButton from "../../commons/lpb-button";

interface IProps extends React.HTMLProps<HTMLDivElement> {
    sections: [Section];
}

const SidebarBuilder = (props: IProps) => {
    const [previewAs, setPreviewAs] = useState<"desktop" | "tablet" | "mobile">("desktop");
    const [selectedSection, setSelectedSections] = useState<Section>();
    const [isAddSectionPreparing, setIsAddSectionPreparing] = useState(false);

    return (
        <div className="w-96 min-h-screen bg-gray-200 relative p-4">
            {props.sections.map((section) => (
                <div className="flex text-gray-700 items-center cursor-pointer w-full bg-gray-300 p-2 font-medium" key={section.id}>
                    <AiOutlineMenu className="cursor-move" />
                    <p className="ml-2">{section.name}</p>
                </div>
            ))}

            <div className="w-full mt-3 flex text-gray-700 items-center cursor-pointer bg-gray-300 p-2 font-medium">
                <AiOutlinePlus />
                <p className="ml-2">Add Section</p>
            </div>

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

                        <LPBButton mode="primary" className="text-sm w-full flex-1" isOutlined>
                            Save
                        </LPBButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SidebarBuilder;
