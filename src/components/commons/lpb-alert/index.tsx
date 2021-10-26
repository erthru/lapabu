import { AiFillInfoCircle } from "react-icons/ai";

interface IProps extends React.HTMLProps<HTMLDivElement> {
    mode: "success" | "warning" | "error";
}

const LPBAlert = (props: IProps) => (
    <div {...props} className={`bg-${props.mode} flex text-white items-center w-full p-3 ${props.className}`}>
        <AiFillInfoCircle className="text-xl" />
        <p className="ml-2">{props.children}</p>
    </div>
);

export default LPBAlert;
