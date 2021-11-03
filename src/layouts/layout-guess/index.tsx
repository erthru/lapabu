import { Switch, Route } from "react-router-dom";
import Home from "../../views/home";
import ViewByUserId from "../../views/view-by-user-id";

const LayoutGuess = () => (
    <Switch>
        <Route path="/v/:userId" component={ViewByUserId} />
        <Route path="/" component={Home} />
    </Switch>
);

export default LayoutGuess;
