import { useContext } from "react";
import { IAnonymouseRouteProps } from "./IAnonymouseRouteProps";
import { UserContext } from "../../common/providers/UserProvider";
import { Navigate } from "react-router";
import { isDev } from "../../common/utils/constants";


const AnonymouseRoute = ({ Component }: IAnonymouseRouteProps) => {
    const { state: user } = useContext(UserContext);

    if (user && !isDev) {
        return <Navigate to="/" />;
    }

    return (
        <Component />
    );
}

export default AnonymouseRoute;