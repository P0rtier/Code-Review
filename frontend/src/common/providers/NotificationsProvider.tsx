import { Dispatch, PropsWithChildren, createContext, useReducer } from "react";
import { INotification } from "../interfaces/INotification";
import { NotificationsAction, NotificationsReducer } from "../reducers/NotificationsReducer";


interface InitialNotificationsState {
    state?: INotification[],
    dispatch: Dispatch<NotificationsAction>
}

export const NotificationContext = createContext<InitialNotificationsState>({
    dispatch: () => null
});

export const NotificationProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(NotificationsReducer, undefined);

    return (
        <NotificationContext.Provider value={{ state, dispatch }}>
            {children}
        </NotificationContext.Provider>
    );
}