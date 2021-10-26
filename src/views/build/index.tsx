import { useEffect, useState } from "react";
import PageLanding from "../../components/pages/page-landing";
import { APP_NAME } from "../../helpers/constants";
import Hoc from "../../hoc";
import Section from "../../models/section";
import * as userService from "../../services/user-service";
import * as sectionService from "../../services/section-service";
import LPBSpinner from "../../components/commons/lpb-spinner";

const Build = () => {
    const [sections, setSections] = useState<[Section]>();

    useEffect(() => {
        getSection();
    }, []);

    const getSection = async () => {
        const user = await userService.getProfile();
        const sections = await sectionService.getByUserId(user?.id!!);
        setSections(sections);
    };

    return (
        <Hoc title={`Build Lading Page - ${APP_NAME}`} authType="registered" className="flex flex-col w-full">
            {sections === undefined ? (
                <div className="w-full flex mt-6">
                    <LPBSpinner className="text-3xl mx-auto" />
                </div>
            ) : (
                <PageLanding sections={sections} />
            )}
        </Hoc>
    );
};

export default Build;
