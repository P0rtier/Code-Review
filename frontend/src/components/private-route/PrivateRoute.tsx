import { useContext } from "react";
import { UserContext } from "../../common/providers/UserProvider";
import { Navigate } from "react-router";
import { IPrivateRouteProps } from "./IPrivateRouteProps";
import { isDev } from "../../common/utils/constants";


const PrivateRoute = ({ Component }: IPrivateRouteProps) => {
    const { state: user } = useContext(UserContext);

    if (!user && !isDev) {
        return <Navigate to="/login" />;
    }

    return (
        <Component />
    );
}

export default PrivateRoute;