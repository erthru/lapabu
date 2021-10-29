import { FormEvent, useState } from "react";
import LPBSpinner from "../../commons/lpb-spinner";
import LPBButton from "../../commons/lpb-button";
import LPBInput from "../../commons/lpb-input";
import { useHistory } from "react-router-dom";
import * as userService from "../../../services/user-service";
import LPBAlert from "../../../components/commons/lpb-alert";

const FormLogin = (props: React.HTMLProps<HTMLFormElement>) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isLoginFailed, setIsLoginFailed] = useState(false);
    const history = useHistory();

    const submit = async (e: FormEvent) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            setIsLoginFailed(false);
            await userService.login(email, password);
            history.push("/build");
        } catch (error: any) {
            setIsLoginFailed(error.message.includes("user-not-found") || error.message.includes("wrong-password"));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form {...props} onSubmit={submit} className={`space-y-3 ${props.className}`}>
            <LPBInput
                type="email"
                label="Email"
                placeholder="Input Your Email"
                onChange={(e) => setEmail(e.currentTarget.value)}
                disabled={isLoading}
                required
            />

            <LPBInput
                type="password"
                label="Password"
                placeholder="Input Your Password"
                onChange={(e) => setPassword(e.currentTarget.value)}
                disabled={isLoading}
                required
            />

            {isLoginFailed && (
                <LPBAlert mode="error" className="mt-4">
                    Login Failed!, Check Email or Password
                </LPBAlert>
            )}

            <LPBButton type="submit" mode="primary" disabled={isLoading}>
                {isLoading ? <LPBSpinner mode="white" className="text-2xl" /> : <p>Login</p>}
            </LPBButton>
        </form>
    );
};

export default FormLogin;
