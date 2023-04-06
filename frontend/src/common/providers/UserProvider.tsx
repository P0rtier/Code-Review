import { Dispatch, PropsWithChildren, createContext, useReducer } from "react";
import { IUser } from "../interfaces/IUser";
import { UserAction, UserReducer } from "../reducers/UserReducer";


interface InitialState {
    state?: IUser,
    dispatch: Dispatch<UserAction>
}

export const UserContext = createContext<InitialState>({
    dispatch: () => null
});

export const UserProvider = ({ children }: PropsWithChildren) => {
    const user = window.localStorage.getItem("user");
    const [state, dispatch] = useReducer(UserReducer, user ? JSON.parse(user) : null);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
}