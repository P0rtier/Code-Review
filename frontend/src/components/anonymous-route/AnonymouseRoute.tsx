import { useContext, useEffect } from "react";
import { IAnonymouseRouteProps } from "./IAnonymouseRouteProps";
import { UserContext } from "../../common/providers/UserProvider";
import { Navigate } from "react-router";
import { isTestEnv } from "../../common/utils/constants";
import { UserActions } from "../../common/enums/UserActions";


const AnonymouseRoute = ({ Component }: IAnonymouseRouteProps) => {
    const { state: user, dispatch } = useContext(UserContext);

    useEffect(() => {
        dispatch({ type: UserActions.RefreshUser });
    }, [dispatch]);

    if (user && !isTestEnv) {
        return <Navigate to="/" />;
    }

    return (
        <Component />
    );
}

export default AnonymouseRoute;