import { useState } from "react";

interface IProps extends React.HTMLProps<HTMLInputElement> {
    label?: string;
}

const LPBInput = (props: IProps) => {
    const [isInputFocused, setIsInputFocused] = useState(false);

    return (
        <div className="w-full">
            <p className={`${isInputFocused ? "text-primary-dark" : "text-gray-600"}`} style={{ fontSize: "15px" }}>
                {props.label}
            </p>

            <input
                {...props}
                className={`bg-white border border-gray-200 px-2 h-10 w-full mt-1 focus:outline-none focus:border-primary-dark ${props.className}`}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
            />
        </div>
    );
};

export default LPBInput;
