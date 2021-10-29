import { useEffect, useState } from "react";
import Section from "../../../models/section";
import * as userService from "../../../services/user-service";
import * as sectionService from "../../../services/section-service";
import LPBSpinner from "../../commons/lpb-spinner";

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
        <div>hehe</div>
    );
};

export default PageLanding;
