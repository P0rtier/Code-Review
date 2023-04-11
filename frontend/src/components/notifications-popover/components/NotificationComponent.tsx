import React from "react";
import styles from "./NotificationComponent.module.scss";
import { BoldRegularText } from "../../bold-regular-text/BoldRegularText";
import { Box, useStyleConfig } from "@chakra-ui/react";
import { INotificationComponentProps } from "./INotificationComponentProps";
import { Link } from "react-router-dom";
import { TrophyIcon } from "../../../assets/icons/TrophyIcon";
import { TrashIcon } from "../../../assets/icons/TrashIcon";
import { ClockIcon } from "../../../assets/icons/ClockIcon";
import { NotificationsIcon } from "../../../assets/icons/NotificationsIcon";
import { NotificationType } from "../../../common/enums/NotificationType";
import { StyledComponents } from "../../../common/enums/StyledComponents";

export const NotificationComponent = (props: INotificationComponentProps) => {
    
  const secondaryStyles = useStyleConfig(StyledComponents.SecondaryComponent);

    const getIcon = () => {
        switch(props.type) {
            case NotificationType.CodeReview:
                return <ClockIcon/>;
            case NotificationType.Stats:
                return <TrophyIcon/>;
            default:
                return <NotificationsIcon/>;
            
        }
    };
    return (

    <Box className={styles.container} _hover={secondaryStyles}>
        <Link to={props.route}>
            <div className={styles.container}>
                <div className={styles.icon}>{getIcon()}</div>
                
                <p >{props.title}</p>

            </div>
        </Link>
        <a className={styles.icon} onClick={() => props.onDelete(props.id)}>
            <TrashIcon/>
        </a>
    </Box>
  );
};
