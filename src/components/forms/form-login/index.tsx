import { FormEvent, useState } from "react";
import LPBButton from "../../commons/lpb-button";
import LPBInput from "../../commons/lpb-input";

export type FormLoginData = {
    email: string;
    password: string;
};

interface IProps extends React.HTMLAttributes<HTMLFormElement> {
    onSubmited: (data: FormLoginData) => void;
    isLoading?: Boolean;
}

const FormLogin = (props: IProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        props.onSubmited({ email, password });
    };

    return (
        <form {...props} onSubmit={handleSubmit} className={`space-y-3 ${props.className}`}>
            <LPBInput type="email" label="Email" placeholder="Input Your Email" onChange={(e) => setEmail(e.currentTarget.value)} required />

            <LPBInput
                type="password"
                label="Password"
                placeholder="Input Your Password"
                onChange={(e) => setPassword(e.currentTarget.value)}
                required
            />

            <LPBButton type="submit" mode="primary">
                Login
            </LPBButton>
        </form>
    );
};

export default FormLogin;
