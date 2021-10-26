import { useEffect } from "react";
import { APP_NAME } from "../../helpers/constants";
import Hoc from "../../hoc";

const Build = () => {
    return (
        <Hoc title={`Build Lading Page - ${APP_NAME}`} authType="registered" className="flex flex-col w-full">
            builder will goes here
        </Hoc>
    );
};

export default Build;
