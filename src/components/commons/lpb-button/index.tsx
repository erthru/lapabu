import { ButtonHTMLAttributes } from "react";

interface IProps extends React.DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    mode: "primary" | "success" | "warning" | "error";
}

const LPBButton = (props: IProps) => (
    <button {...props} className={`px-4 py-2 font-semibold text-white bg-${props.mode} ${props.className}`}>
        {props.children}
    </button>
);

export default LPBButton;
