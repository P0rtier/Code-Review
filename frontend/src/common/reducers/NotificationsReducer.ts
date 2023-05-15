import { Reducer } from "react";
import { NotificationsActions } from "../enums/NotificationsActions";
import { INotification } from "../interfaces/INotification";

export interface NotificationsAction {
    type: NotificationsActions;
    payload?: any;
}

export const NotificationsReducer: Reducer<INotification[] | undefined, NotificationsAction> = (state, action) => {
    switch (action.type) {
        case NotificationsActions.SetNotifications: {
            return action.payload;
        }
        case NotificationsActions.ClearNotifications: {
            return null;
        }
        default:
            return state;
    }
}