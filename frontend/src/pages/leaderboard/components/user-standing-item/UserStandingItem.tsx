import styles from "./UserStandingItem.module.scss"
import { Box, Tooltip, useStyleConfig } from "@chakra-ui/react";
import { IUserStandingItemProps } from "./UserStandingItemProps";
import { StyledComponents } from "../../../../common/enums/StyledComponents";
import { TrophyIcon } from "../../../../assets/icons/TrophyIcon";


export const UserStandingItem = (props: IUserStandingItemProps) => {
    const secondaryComponent = useStyleConfig(StyledComponents.SecondaryComponent);

    const userStanding = props.userStanding;

    const winIcon = userStanding.place === 1 ? (<TrophyIcon />) : (<></>);

    const userLabel = `Mail: ${userStanding.userEmail} \n Teams: ${userStanding.teams.join(', ')}`;

    return (
        <Tooltip hasArrow whiteSpace="pre-line" label={userLabel}>
            <Box className={styles.container} __css={secondaryComponent}>
                <div className={styles.iconContainer}>{winIcon}</div>
                <div>{userStanding.place}</div>
                <div>{userStanding.displayName}</div>
                <div>{userStanding.score}</div>
            </Box>
        </Tooltip>
    );
};