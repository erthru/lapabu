import { Switch, Route } from "react-router-dom";
import Build from "../../views/build";
import SidebarBuilder from "../../components/sidebars/sidebar-builder";
import { useEffect, useState } from "react";
import Section from "../../models/section";
import * as userService from "../../services/user-service";
import * as sectionService from "../../services/section-service";

const LayoutBuilder = () => {
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
        <div className="w-full flex">
            {sections !== undefined && <SidebarBuilder sections={sections} />}

            <div className="w-full">
                <Switch>
                    <Route path="/build" component={Build} />
                </Switch>
            </div>
        </div>
    );
};

export default LayoutBuilder;
