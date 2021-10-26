import { AiOutlineLoading } from "react-icons/ai";

const LPBSpinner = (props: React.HTMLProps<HTMLDivElement>) => (
    <div {...props} className={`text-primary ${props.className}`}>
        <AiOutlineLoading className="animate-spin" />
    </div>
);

export default LPBSpinner;
