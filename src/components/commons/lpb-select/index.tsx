import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

interface IProps extends React.HTMLProps<HTMLSelectElement> {
    items: LPBSelectItem[];
    label: string;
    selectedValue?: (value: string) => void;
}

export type LPBSelectItem = {
    text: string;
    value: string;
};

const LPBSelect = (props: IProps) => {
    const [isPreparingForSelect, setIsPreparingForSelect] = useState(false);

    const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setIsPreparingForSelect(false);
        if (props.selectedValue !== undefined) props.selectedValue(e.target.value);
    };

    return (
        <div className="w-full">
            <p className={`${isPreparingForSelect ? "text-gray-800" : "text-gray-600"}`} style={{ fontSize: "15px" }}>
                {props.label}
            </p>

            <div
                className={`bg-white flex items-center border ${
                    isPreparingForSelect ? "border-gray-400" : "border-gray-200"
                }  px-2 h-10 w-full mt-1 ${props.className}`}
            >
                <select
                    {...props}
                    className="w-full h-full focus:outline-none"
                    onClick={() => setIsPreparingForSelect(true)}
                    onChange={onChange}
                    style={{
                        MozAppearance: "none",
                        WebkitAppearance: "none",
                    }}
                >
                    {props.items.map((item, i) => (
                        <option value={item.value} key={i}>
                            {item.text}
                        </option>
                    ))}
                </select>

                {isPreparingForSelect ? <AiOutlineUp className="text-sm" /> : <AiOutlineDown className="text-sm" />}
            </div>
        </div>
    );
};

export default LPBSelect;
