import { Helmet } from "react-helmet";

interface IProps extends React.HTMLProps<HTMLDivElement> {
    title: string;
    isAuthNeeded?: boolean;
}

const Hoc = (props: IProps) => (
    <div {...props}>
        <Helmet>
            <title>{props.title}</title>
        </Helmet>

        {props.children}
    </div>
);

export default Hoc;
