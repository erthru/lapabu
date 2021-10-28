import { Switch, Route, useHistory } from "react-router-dom";
import Build from "../../views/build";
import SidebarBuilder, { FormAddSectionData } from "../../components/sidebars/sidebar-builder";
import { useEffect, useState } from "react";
import Section from "../../models/section";
import * as userService from "../../services/user-service";
import * as sectionService from "../../services/section-service";

const LayoutBuilder = () => {
    const history = useHistory();

    useEffect(() => {
        getSection();
    }, []);

    const getSection = async () => {
        const user = await userService.getProfile();
        const sections = await sectionService.getByUserId(user?.id!!);
    };

    const addSectionSubmit = async (data: FormAddSectionData) => {};

    const logout = async () => {
        await userService.logout();
        history.push("/");
    };

    return (
        <div className="w-full flex">
            <SidebarBuilder onLogout={logout} onAddSectionSubmited={addSectionSubmit} />

            <div className="w-full">
                <Switch>
                    <Route path="/build" component={Build} />
                </Switch>
            </div>
        </div>
    );
};

export default LayoutBuilder;
