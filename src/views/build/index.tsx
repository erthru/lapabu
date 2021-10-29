import PageLanding from "../../components/pages/page-landing";
import { APP_NAME } from "../../helpers/constants";
import Hoc from "../../hoc";

const Build = () => (
    <Hoc title={`Build Lading Page - ${APP_NAME}`} authType="registered" className="flex flex-col w-full">
        <PageLanding />
    </Hoc>
);

export default Build;
