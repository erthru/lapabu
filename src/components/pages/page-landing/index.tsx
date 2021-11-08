import { useEffect, useState } from "react";
import * as userService from "../../../services/user-service";
import * as sectionService from "../../../services/section-service";
import LPBSpinner from "../../commons/lpb-spinner";
import Section from "../../../data/entities/section";

const PageLanding = () => {
    const [sections, setSections] = useState<[Section]>();

    useEffect(() => {
        getSections();
    }, []);

    const getSections = async () => {
        const user = await userService.getProfile();
        const sections = await sectionService.getAllByUserId(user?.id!!);
        setSections(sections);
    };

    return sections === undefined ? (
        <div className="w-full flex mt-6">
            <LPBSpinner mode="primary" className="text-3xl mx-auto" />
        </div>
    ) : (
        <div className="w-full">
            {sections.map((section) => (
                <div
                    className={`w-full flex flex-wrap items-${section.justifyContent}`}
                    style={{
                        height: `${section.height}`,
                        backgroundColor: `${section.bgColor}`,
                    }}
                    key={section.id}
                >
                    {section.widgets.map((widget) => (
                        <div
                            className={`w-${widget.width} ${widget.position === "center" && "mx-auto"} ${widget.position === "right" && "ml-auto"}`}
                            key={widget.code}
                        >
                            {widget.type === "text" && <p className={`w-full text-${widget.position}`}>{widget.textValue}</p>}

                            {widget.type === "navigation" && (
                                <div className="w-full flex space-x-3">
                                    {widget.navigationItems?.map((navigation, i) => (
                                        <a key={i} href={navigation.url}>
                                            {navigation.name}
                                        </a>
                                    ))}
                                </div>
                            )}

                            {widget.type === "image" && <img src={widget.imageUrl} alt="image" className="w-full" />}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default PageLanding;
