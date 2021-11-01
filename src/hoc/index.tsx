import { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useHistory } from "react-router";
import * as userService from "../services/user-service";

interface IProps extends React.HTMLProps<HTMLDivElement> {
    title: string;
    authType: "none" | "guess" | "registered";
}

const Hoc = (props: IProps) => {
    const history = useHistory();

    useEffect(() => {
        checkUserLoggedIn();
    }, [props.authType]);

    const checkUserLoggedIn = async () => {
        if (props.authType === "guess") {
            if (await userService.isLoggedIn()) history.push("/build");
        } else if (props.authType === "registered") {
            if (!(await userService.isLoggedIn())) history.push("/");
        }
    };

    return (
        <HelmetProvider>
            <div {...props}>
                <Helmet>
                    <title>{props.title}</title>
                </Helmet>

                {props.children}
            </div>
        </HelmetProvider>
    );
};

export default Hoc;
