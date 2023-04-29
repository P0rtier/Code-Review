import React, { useState } from "react";
import styles from "./NotificationsPopover.module.scss";
import { NotificationsIcon } from "../../../../assets/icons/NotificationsIcon";
import { INotification } from "../../../../common/interfaces/INotification";
import { NotificationComponent } from "./components/NotificationComponent";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";

export const NotificationsPopover = () => {
  const [mockData, setMockData] = useState<INotification[]>([
    {
      id: "1",
      type: "codeReview",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: "https://dev.azure.com/KPZ-CodeReview/Code-Review/_workitems/edit/10/",
    },
    {
      id: "2",
      type: "stats",
      title: "You are #1 on the leaderboard. Click here to see weekly statistics.",
      link: "/stats",
    },
    {
      id: "3",
      type: "codeReview",
      title: "You are late on your code review submission.",
      link: "https://dev.azure.com/KPZ-CodeReview/Code-Review/_workitems/edit/10/",
    },
    {
      id: "4",
      type: "diff",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: "/home",
    }
  ]);


  const deleteNotification = (id: string) => {
    const updatedList = mockData.filter((item) => item.id !== id);
    setMockData(updatedList);
  };

  const getData = () => {
    return mockData.map((notification) => (
      <NotificationComponent
        {...notification}
        key={notification.id}
        onDelete={deleteNotification}
      />
    ));
  };

  return (
    <>
      <Popover isLazy>
        <PopoverTrigger>
          <button>
            <NotificationsIcon />
          </button>
        </PopoverTrigger>
        <PopoverContent w={'30vw'}>
          <PopoverHeader><div className={styles.header}>Notifications</div></PopoverHeader>
          <PopoverBody>
            <div className={styles.container}>{getData()}</div>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};
