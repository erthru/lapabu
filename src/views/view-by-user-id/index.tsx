import { APP_NAME } from "../../helpers/constants";
import Hoc from "../../hoc";

const ViewByUserId = () => (
    <Hoc title={`Contoh - ${APP_NAME}`} authType="none" className="flex flex-col w-full">
        review will here
    </Hoc>
);

export default ViewByUserId;
