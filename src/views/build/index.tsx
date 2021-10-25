import { APP_NAME } from "../../helpers/environments";
import Hoc from "../../hoc";

const Build = () => (
    <Hoc title={`Build Lading Page - ${APP_NAME}`} isAuthNeeded className="flex flex-col w-full">
        builder will goes here
    </Hoc>
);

export default Build;
