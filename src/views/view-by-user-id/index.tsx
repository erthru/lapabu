import { useParams } from "react-router";
import { APP_NAME } from "../../helpers/constants";
import Hoc from "../../hoc";

type Params = {
    userId: string;
};

const ViewByUserId = () => {
    const { userId } = useParams<Params>();

    return (
        <Hoc title={`${userId} - ${APP_NAME}`} authType="none" className="flex flex-col w-full">
            review will here
        </Hoc>
    );
};

export default ViewByUserId;
