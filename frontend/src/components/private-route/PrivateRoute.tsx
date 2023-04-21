import { PropsWithChildren, useContext } from "react";
import { UserContext } from "../../common/providers/UserProvider";
import { Navigate } from "react-router";
import { IPrivateRouteProps } from "./IPrivateRouteProps";
import { EnviromentProfiles } from "../../common/enums/EnviromentProfiles";


const PrivateRoute = ({ Component }: IPrivateRouteProps) => {
    const { state: user } = useContext(UserContext);

    const isDev = process.env.REACT_APP_ENV === EnviromentProfiles.Development;

    if (!user && !isDev) {
        return <Navigate to="/login" />;
    }

    return (
        <Component />
    );
}

export default PrivateRoute;