import { APP_NAME } from "../../helpers/environments";
import Hoc from "../../hoc";

const ViewBySlug = () => (
    <Hoc title={`Contoh - ${APP_NAME}`} authType="none" className="flex flex-col w-full">
        review will here
    </Hoc>
);

export default ViewBySlug;
