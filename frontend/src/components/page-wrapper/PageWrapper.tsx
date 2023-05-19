import React, { useContext, useEffect } from "react";
import styles from "./PageWrapper.module.scss";
import { IPageWrapperProps } from "./IPageWrapperProps";
import { joinClasses } from "../../common/utils/joinClasses";
import agent from "../../common/api/agent";
import { NotificationsActions } from "../../common/enums/NotificationsActions";
import { UserActions } from "../../common/enums/UserActions";
import { INotification } from "../../common/interfaces/INotification";
import { NotificationContext } from "../../common/providers/NotificationsProvider";
import { UserContext } from "../../common/providers/UserProvider";

export const PageWrapper = (props: IPageWrapperProps) => {
  const { state: user, dispatch: dispatchUser } = useContext(UserContext);
  const { dispatch: dispatchNotifications } = useContext(NotificationContext);

  useEffect(() => {
    dispatchUser({ type: UserActions.RefreshUser });
  }, [dispatchUser]);

  useEffect(() => {
    if (user) {
      agent.Notifications.getMine().then((response: INotification[]) => {
        dispatchNotifications({
          type: NotificationsActions.SetNotifications,
          payload: response,
        });
      });
    }
  }, [dispatchNotifications, user]);

  return (
    <div className={styles.container}>
      <div
        className={joinClasses(
          styles.componentContainer,
          props.smallGap && styles.smallGap
        )}
      >
        {props.children}
      </div>
    </div>
  );
};
