import { useEffect, useState } from "react";
import { AiFillInfoCircle } from "react-icons/ai";

interface IProps extends React.HTMLProps<HTMLDivElement> {
    mode: "success" | "warning" | "error";
}

const LPBAkert = (props: IProps) => {
    const [bgColor, setBgColor] = useState("");

    useEffect(() => {
        switch (props.mode) {
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
        <div {...props} className={`${bgColor} flex text-white items-center w-full p-3 ${props.className}`}>
            <AiFillInfoCircle className="text-xl" />
            <p className="ml-2">{props.children}</p>
        </div>
    );
};

export default LPBAkert;
