import { AiOutlineLoading } from "react-icons/ai";

interface IProps extends React.HTMLProps<HTMLDivElement> {
    mode: "primary" | "success" | "warning" | "error" | "white";
}

const LPBSpinner = (props: IProps) => (
    <div {...props} className={`text-${props.mode} ${props.className}`}>
        <AiOutlineLoading className="animate-spin" />
    </div>
);

export default LPBSpinner;
