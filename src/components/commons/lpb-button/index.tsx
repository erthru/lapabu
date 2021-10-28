import { ButtonHTMLAttributes } from "react";

interface IProps extends React.DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    mode: "primary" | "success" | "warning" | "error";
    isOutlined?: boolean;
}

const LPBButton = (props: IProps) => (
    <button
        {...props}
        className={`px-4 h-10 font-semibold ${props.isOutlined ? `text-${props.mode} border border-${props.mode}` : `text-white bg-${props.mode}`} ${
            props.className
        }`}
    >
        {props.children}
    </button>
);

export default LPBButton;
