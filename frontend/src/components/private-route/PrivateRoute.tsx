import { useContext, useEffect } from "react";
import { UserContext } from "../../common/providers/UserProvider";
import { Navigate } from "react-router";
import { IPrivateRouteProps } from "./IPrivateRouteProps";
import { isTestEnv } from "../../common/utils/constants";
import { UserActions } from "../../common/enums/UserActions";


const PrivateRoute = ({ Component }: IPrivateRouteProps) => {
    const { state: user, dispatch } = useContext(UserContext);

    useEffect(() => {
        dispatch({ type: UserActions.RefreshUser });
    }, [dispatch]);


    if (!user && !isTestEnv) {
        return <Navigate to="/login" />;
    }

    return (
        <Component />
    );
}

export default PrivateRoute;