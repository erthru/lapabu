import { Switch, Route, useHistory } from "react-router-dom";
import Build from "../../views/build";
import SidebarBuilder from "../../components/sidebars/sidebar-builder";
import { useEffect, useState } from "react";
import Section from "../../models/section";
import * as userService from "../../services/user-service";
import * as sectionService from "../../services/section-service";

const LayoutBuilder = () => {
    const [sections, setSections] = useState<[Section]>();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const history = useHistory();

    useEffect(() => {
        getSection();
    }, []);

    const getSection = async () => {
        const user = await userService.getProfile();
        const sections = await sectionService.getByUserId(user?.id!!);
        setSections(sections);
    };

    const logout = async () => {
        setIsLoggingOut(true);
        await userService.logout();
        setIsLoggingOut(false);
        history.push("/");
    };

    return (
        <div className="w-full flex">
            {sections !== undefined && <SidebarBuilder onLogout={logout} isLoggingOut={isLoggingOut} sections={sections} />}

            <div className="w-full">
                <Switch>
                    <Route path="/build" component={Build} />
                </Switch>
            </div>
        </div>
    );
};

export default LayoutBuilder;
