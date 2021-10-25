import { ButtonHTMLAttributes, useEffect, useState } from "react";

interface IProps extends React.DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    mode: "primary" | "success" | "warning" | "error";
}

const LPBButton = (props: IProps) => {
    const [bgColor, setBgColor] = useState("");

    useEffect(() => {
        switch (props.mode) {
            case "primary":
                setBgColor("bg-primary");
                break;

            case "success":
                setBgColor("bg-green-500");
                break;

            case "warning":
                setBgColor("bg-yellow-500");
                break;

            case "error":
                setBgColor("bg-red-500");
                break;
        }
    }, [props.mode]);

    return (
        <button {...props} className={`px-4 py-2 font-semibold text-white ${bgColor} ${props.className}`}>
            {props.children}
        </button>
    );
};

export default LPBButton;
