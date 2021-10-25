import { Switch, Route } from "react-router-dom";
import Build from "../../views/build";

const LayoutBuilder = () => (
    <Switch>
        <Route path="/build" component={Build} />
    </Switch>
);

export default LayoutBuilder;
