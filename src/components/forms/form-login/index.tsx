import { FormEvent, useState } from "react";
import LPBSpinner from "../../commons/lpb-spinner";
import LPBButton from "../../commons/lpb-button";
import LPBInput from "../../commons/lpb-input";

export type FormLoginData = {
    email: string;
    password: string;
};

interface IProps extends React.HTMLProps<HTMLFormElement> {
    onSubmited: (data: FormLoginData) => void;
    isLoading?: boolean;
}

const FormLogin = (props: IProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submit = (e: FormEvent) => {
        e.preventDefault();
        props.onSubmited({ email, password });
    };

    return (
        <form {...props} onSubmit={submit} className={`space-y-3 ${props.className}`}>
            <LPBInput
                type="email"
                label="Email"
                placeholder="Input Your Email"
                onChange={(e) => setEmail(e.currentTarget.value)}
                disabled={props.isLoading}
                required
            />

            <LPBInput
                type="password"
                label="Password"
                placeholder="Input Your Password"
                onChange={(e) => setPassword(e.currentTarget.value)}
                disabled={props.isLoading}
                required
            />

            <LPBButton type="submit" mode="primary" disabled={props.isLoading}>
                {props.isLoading ? <LPBSpinner mode="white" className="text-2xl" /> : <p>Login</p>}
            </LPBButton>
        </form>
    );
};

export default FormLogin;
