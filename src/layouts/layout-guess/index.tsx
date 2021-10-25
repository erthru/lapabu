import { Switch, Route } from "react-router-dom";
import Home from "../../views/home";
import ViewByUsername from "../../views/view-by-username";

const LayoutGuess = () => (
    <Switch>
        <Route path="/v/:email" component={ViewByUsername} />
        <Route path="/" component={Home} />
    </Switch>
);

export default LayoutGuess;
