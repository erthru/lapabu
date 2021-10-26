import { Switch, Route } from "react-router-dom";
import Build from "../../views/build";
import SidebarBuilder from "../../components/sidebars/sidebar-builder";

const LayoutBuilder = () => (
    <div className="w-full flex">
        <SidebarBuilder />

        <div className="w-full">
            <Switch>
                <Route path="/build" component={Build} />
            </Switch>
        </div>
    </div>
);

export default LayoutBuilder;
