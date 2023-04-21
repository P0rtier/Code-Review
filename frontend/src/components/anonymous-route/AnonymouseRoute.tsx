import { useContext } from "react";
import { IAnonymouseRouteProps } from "./IAnonymouseRouteProps";
import { UserContext } from "../../common/providers/UserProvider";
import { Navigate } from "react-router";
import { EnviromentProfiles } from "../../common/enums/EnviromentProfiles";


const AnonymouseRoute = ({ Component }: IAnonymouseRouteProps) => {
    const { state: user } = useContext(UserContext);

    const isDev = process.env.REACT_APP_ENV === EnviromentProfiles.Development;

    if (user && !isDev) {
        return <Navigate to="/" />;
    }

    return (
        <Component />
    );
}

export default AnonymouseRoute;