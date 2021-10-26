import Section from "../../../models/section";

type Props = {
    sections: [Section];
};

const PageLanding = (props: Props) => (
    <div className="w-full flex flex-col">
        {props.sections.map((section) => (
            <span>{section.name}</span>
        ))}
    </div>
);

export default PageLanding;
