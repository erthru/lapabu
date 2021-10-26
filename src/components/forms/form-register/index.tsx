import { FormEvent, useState } from "react";
import LPBButton from "../../commons/lpb-button";
import LPBInput from "../../commons/lpb-input";
import LPBSpinner from "../../commons/lpb-spinner";

export type FormRegisterData = {
    fullName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
};

interface IProps extends React.HTMLAttributes<HTMLFormElement> {
    onSubmited: (data: FormRegisterData) => void;
    isLoading?: boolean;
}

const FormRegister = (props: IProps) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const submit = (e: FormEvent) => {
        e.preventDefault();
        props.onSubmited({ fullName, email, password, passwordConfirmation });
    };

    return (
        <form {...props} onSubmit={submit} className={`space-y-3 ${props.className}`}>
            <LPBInput
                type="text"
                label="Full Name"
                placeholder="Input Your Full Name"
                onChange={(e) => setFullName(e.currentTarget.value)}
                disabled={props.isLoading}
                required
            />

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

            <LPBInput
                type="password"
                label="Confirmation Password"
                placeholder="Input Again Your Password"
                onChange={(e) => setPasswordConfirmation(e.currentTarget.value)}
                disabled={props.isLoading}
                required
            />

            <LPBButton type="submit" mode="primary" disabled={props.isLoading}>
                {props.isLoading ? <LPBSpinner className="text-2xl" /> : <p>Register</p>}
            </LPBButton>
        </form>
    );
};

export default FormRegister;
