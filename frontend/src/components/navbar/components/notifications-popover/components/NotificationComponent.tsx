import React from "react";
import styles from "./NotificationComponent.module.scss";
import { Box, useStyleConfig } from "@chakra-ui/react";
import { INotificationComponentProps } from "./INotificationComponentProps";
import { TrophyIcon } from "../../../../../assets/icons/TrophyIcon";
import { TrashIcon } from "../../../../../assets/icons/TrashIcon";
import { ClockIcon } from "../../../../../assets/icons/ClockIcon";
import { NotificationsIcon } from "../../../../../assets/icons/NotificationsIcon";
import { NotificationType } from "../../../../../common/enums/NotificationType";
import { StyledComponents } from "../../../../../common/enums/StyledComponents";

export const NotificationComponent = (props: INotificationComponentProps) => {

    const secondaryStyles = useStyleConfig(StyledComponents.SecondaryComponent);

    const getIcon = () => {
        switch (props.type) {
            case NotificationType.CodeReview:
                return <ClockIcon />;
            case NotificationType.Leaderboard:
                return <TrophyIcon />;
            default:
                return <NotificationsIcon />;

        }
    };
    return (

        <Box className={styles.container} _hover={secondaryStyles}>
            <a href={props.link}>
                <div className={styles.leftContainer}>
                    <div className={styles.icon}>{getIcon()}</div>

                    <div className={styles.textContainer}>
                        <p>{props.description}</p>
                    </div>
                </div>
            </a>
            <button className={`${styles.columnTwo} ${styles.icon}`} onClick={() => props.onDelete(props.id)}>
                <TrashIcon />
            </button>
        </Box >
    );
};
