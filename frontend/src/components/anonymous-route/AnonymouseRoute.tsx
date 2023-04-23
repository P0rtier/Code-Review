import { useContext, useEffect } from "react";
import { IAnonymouseRouteProps } from "./IAnonymouseRouteProps";
import { UserContext } from "../../common/providers/UserProvider";
import { Navigate } from "react-router";
import { isDev } from "../../common/utils/constants";
import { UserActions } from "../../common/enums/UserActions";


const AnonymouseRoute = ({ Component }: IAnonymouseRouteProps) => {
    const { state: user, dispatch } = useContext(UserContext);

    useEffect(() => {
        dispatch({ type: UserActions.RefreshUser });
    }, [dispatch]);

    if (user && !isDev) {
        return <Navigate to="/" />;
    }

    return (
        <Component />
    );
}

export default AnonymouseRoute;