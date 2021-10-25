import { FormEvent, useState } from "react";
import LPBButton from "../../commons/lpb-button";
import LPBInput from "../../commons/lpb-input";

export type FormRegisterData = {
    fullName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
};

interface IProps extends React.HTMLAttributes<HTMLFormElement> {
    onSubmited: (data: FormRegisterData) => void;
    isLoading?: Boolean;
}

const FormRegister = (props: IProps) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        props.onSubmited({ fullName, email, password, passwordConfirmation });
    };

    return (
        <form {...props} onSubmit={handleSubmit} className={`space-y-3 ${props.className}`}>
            <LPBInput
                type="text"
                label="Full Name"
                placeholder="Input Your Full Name"
                onChange={(e) => setFullName(e.currentTarget.value)}
                required
            />

            <LPBInput type="email" label="Email" placeholder="Input Your Email" onChange={(e) => setEmail(e.currentTarget.value)} required />

            <LPBInput
                type="password"
                label="Password"
                placeholder="Input Your Password"
                onChange={(e) => setPassword(e.currentTarget.value)}
                required
            />

            <LPBInput
                type="password"
                label="Confirmation Password"
                placeholder="Input Again Your Password"
                onChange={(e) => setPasswordConfirmation(e.currentTarget.value)}
                required
            />

            <LPBButton type="submit" mode="primary">
                Register
            </LPBButton>
        </form>
    );
};

export default FormRegister;
