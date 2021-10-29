import { FormEvent, useState } from "react";
import LPBButton from "../../commons/lpb-button";
import LPBInput from "../../commons/lpb-input";
import LPBSpinner from "../../commons/lpb-spinner";
import * as userService from "../../../services/user-service";
import { useHistory } from "react-router-dom";
import LPBAlert from "../../commons/lpb-alert";

const FormRegister = (props: React.HTMLProps<HTMLFormElement>) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [isPasswordNotMatch, setIsPasswordNotMatch] = useState(false);
    const [isPasswordLengthInvalid, setIsPasswordLengthInvalid] = useState(false);
    const [isEmailAlreadyInUse, setIsEmailAlreadyInUse] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const submit = async (e: FormEvent) => {
        try {
            e.preventDefault();
            setIsPasswordNotMatch(false);
            setIsPasswordLengthInvalid(false);
            setIsEmailAlreadyInUse(false);

            if (password !== passwordConfirmation) setIsPasswordNotMatch(true);
            else {
                setIsLoading(true);
                await userService.register(fullName, email, password);
                history.push("/build");
            }
        } catch (error: any) {
            setIsPasswordLengthInvalid(error.message.includes("weak-password"));
            setIsEmailAlreadyInUse(error.message.includes("email-already-in-use"));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form {...props} onSubmit={submit} className={`space-y-3 ${props.className}`}>
            <LPBInput
                type="text"
                label="Full Name"
                placeholder="Input Your Full Name"
                onChange={(e) => setFullName(e.currentTarget.value)}
                disabled={isLoading}
                required
            />

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

            <LPBInput
                type="password"
                label="Confirmation Password"
                placeholder="Input Again Your Password"
                onChange={(e) => setPasswordConfirmation(e.currentTarget.value)}
                disabled={isLoading}
                required
            />

            {isPasswordNotMatch && (
                <LPBAlert mode="error" className="mt-4">
                    Password not match!
                </LPBAlert>
            )}

            {isPasswordLengthInvalid && (
                <LPBAlert mode="error" className="mt-4">
                    Password at least 6 characters!
                </LPBAlert>
            )}

            {isEmailAlreadyInUse && (
                <LPBAlert mode="error" className="mt-4">
                    Email already in use!
                </LPBAlert>
            )}

            <LPBButton type="submit" mode="primary" disabled={isLoading}>
                {isLoading ? <LPBSpinner mode="white" className="text-2xl" /> : <p>Register</p>}
            </LPBButton>
        </form>
    );
};

export default FormRegister;
