import styles from "./LeaderboardTopbar.module.scss"
import { Box, useStyleConfig } from "@chakra-ui/react";
import { StyledComponents } from "../../../../common/enums/StyledComponents";


export const LeaderboardTopbar = () => {
    const primaryComponent = useStyleConfig(StyledComponents.PrimaryComponent);

    return (
        <Box className={styles.topbar} __css={primaryComponent}>
            <p></p>
            <p>Place</p>
            <p>Name</p>
            <p>Score</p>
        </Box>
    );
};