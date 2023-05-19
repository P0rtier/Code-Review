import React, { useContext } from "react";
import agent from "../../../../common/api/agent";
import styles from "./NotificationsPopover.module.scss";
import { NotificationsIcon } from "../../../../assets/icons/NotificationsIcon";
import { NotificationComponent } from "./components/NotificationComponent";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";
import { NotificationContext } from "../../../../common/providers/NotificationsProvider";
import { NotificationsActions } from "../../../../common/enums/NotificationsActions";
import { NotificationsActiveIcon } from "../../../../assets/icons/NotificationsActiveIcon";
import { NoDataComponent } from "../../../no-data-component/NoDataComponent";

export const NotificationsPopover = () => {

  const { state: notifications, dispatch: dispatchNotifications } = useContext(NotificationContext);

  const deleteNotification = (id: string) => {
    agent.Notifications.delete(id).then(() => {
      let updatedList = notifications?.filter((item) => item.id !== id);
      dispatchNotifications({ type: NotificationsActions.SetNotifications, payload: updatedList });
    });
  };

  const getData = () => {
    if (notifications) {
      return notifications.map((notification) => (
        <NotificationComponent
          {...notification}
          key={notification.id}
          onDelete={deleteNotification}
        />
      ));
    };
  };

  const notificationsExist = (): boolean => {
    return ((notifications && notifications.length > 0) ?? false);
  }
  const notificationsIcon = notificationsExist() ? (<NotificationsActiveIcon />) : (<NotificationsIcon />);

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <button>
            {notificationsIcon}
          </button>
        </PopoverTrigger>
        <PopoverContent w={'30vw'}>
          <PopoverHeader><div className={styles.header}>Notifications</div></PopoverHeader>
          <PopoverBody>
            <div className={styles.container}>
              {notificationsExist() ? getData() : <NoDataComponent header="You have no new notifications" />}
            </div>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};
