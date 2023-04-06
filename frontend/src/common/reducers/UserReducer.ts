import { Reducer } from "react";
import { UserActions } from "../enums/UserActions";
import { IUser } from "../interfaces/IUser";

export interface UserAction {
    type: UserActions;
    payload: any;
}

export const UserReducer: Reducer<IUser | undefined, UserAction> = (state, action) => {
    switch (action.type) {
        case UserActions.SetUser:
            const user = JSON.stringify(action.payload);
            window.localStorage.setItem("user", user);
            return action.payload;
        case UserActions.ClearUser:
            window.localStorage.removeItem("user");
            return null;
        default:
            return state;
    }
}